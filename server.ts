import "dotenv/config";
import express from "express";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import { createServer as createViteServer } from "vite";

const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/auth/google/callback";
const PORT = Number(process.env.PORT) || 3000;
const app = express();
// -------------------------------------------------------------
// Google Calendar OAuth
// -------------------------------------------------------------

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";


function getGoogleOAuthClient() {
  return new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
  );
}

const GOOGLE_CALENDAR_SCOPES = [
  "https://www.googleapis.com/auth/calendar",
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data Structures
interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  budget?: string;
  timeline?: string;
  preferredDate?: string;
  preferredTime?: string;
  callDuration?: string;
  timezone?: string;
  status: 'pending_approval' | 'confirmed' | 'declined';
  createdAt: string;
  proposalSummary?: string;
  meetLink?: string;
  confirmedAt?: string;
}

// -------------------------------------------------------------
// Durable File-Backed Persistence Engine
// -------------------------------------------------------------
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "inquiries.json");

function ensureDataDirectory() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.error("[STORAGE ERROR] Failed to create data directory:", err);
  }
}

function loadPersistedInquiries(): ContactSubmission[] {
  ensureDataDirectory();
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      if (raw.trim()) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    }
  } catch (err) {
    console.warn("[STORAGE WARNING] Could not parse inquiries.json, starting fresh:", err);
  }
  return [];
}

const contactSubmissionsStore: ContactSubmission[] = loadPersistedInquiries();

function savePersistedInquiries() {
  ensureDataDirectory();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(contactSubmissionsStore, null, 2), "utf-8");
  } catch (err) {
    console.error("[STORAGE ERROR] Failed to write inquiries.json:", err);
  }
}

// -------------------------------------------------------------
// Calendar Utilities: RFC 5545 iCalendar (.ics) & Web Link Generators
// -------------------------------------------------------------

type TimeZoneInfo = {
  label: string;
  iana: string;
};

const TIMEZONE_MAP: Record<string, TimeZoneInfo> = {
  IST: { label: "IST", iana: "Asia/Kolkata" },
  EST: { label: "EST", iana: "America/New_York" },
  EDT: { label: "EDT", iana: "America/New_York" },
  PST: { label: "PST", iana: "America/Los_Angeles" },
  PDT: { label: "PDT", iana: "America/Los_Angeles" },
  CST: { label: "CST", iana: "America/Chicago" },
  CDT: { label: "CDT", iana: "America/Chicago" },
  MST: { label: "MST", iana: "America/Denver" },
  MDT: { label: "MDT", iana: "America/Denver" },
  GMT: { label: "GMT", iana: "Etc/GMT" },
  UTC: { label: "UTC", iana: "UTC" },
};

function resolveTimeZone(value?: string): TimeZoneInfo {
  const raw = String(value || "IST").trim();
  if (TIMEZONE_MAP[raw]) return TIMEZONE_MAP[raw];

  // Also accept a real IANA timezone sent by the frontend.
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: raw }).format();
    return { label: raw, iana: raw };
  } catch {
    return TIMEZONE_MAP.IST;
  }
}

function getDatePartsInTimeZone(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const values: Record<string, number> = {};
  for (const part of parts) {
    if (part.type !== "literal") values[part.type] = Number(part.value);
  }
  return values;
}

/**
 * Converts a wall-clock date/time in an IANA timezone into a real UTC Date.
 * This avoids relying on the Render/server machine timezone.
 */
function zonedDateTimeToUtc(
  year: number,
  month: number,
  day: number,
  hours: number,
  minutes: number,
  timeZone: string
): Date {
  let utcGuess = Date.UTC(year, month - 1, day, hours, minutes, 0);

  // Two passes are enough to converge for normal DST transitions.
  for (let i = 0; i < 3; i++) {
    const actual = getDatePartsInTimeZone(new Date(utcGuess), timeZone);
    const actualAsUtc = Date.UTC(
      actual.year,
      actual.month - 1,
      actual.day,
      actual.hour,
      actual.minute,
      actual.second
    );
    const desiredAsUtc = Date.UTC(year, month - 1, day, hours, minutes, 0);
    utcGuess += desiredAsUtc - actualAsUtc;
  }

  return new Date(utcGuess);
}

function parseTimeString(timeStr: string): { hours: number; minutes: number } {
  const match = String(timeStr || "").trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!match) return { hours: 14, minutes: 0 };

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3]?.toLowerCase();

  if (period === "pm" && hours < 12) hours += 12;
  if (period === "am" && hours === 12) hours = 0;

  if (hours > 23 || minutes > 59) return { hours: 14, minutes: 0 };
  return { hours, minutes };
}

function parseSubmissionDateTime(submission: ContactSubmission): {
  start: Date;
  end: Date;
  timeZone: string;
} {
  const now = new Date();
  const timeZone = resolveTimeZone(submission.timezone).iana;
  const dateStr = String(submission.preferredDate || "").trim();
  const timeStr = String(submission.preferredTime || "02:00 PM").trim();
  const durationStr = String(submission.callDuration || "30 Mins");

  let durationMinutes = 30;
  if (durationStr.includes("15")) durationMinutes = 15;
  else if (durationStr.includes("45")) durationMinutes = 45;
  else if (durationStr.includes("60") || durationStr.includes("1 Hour")) durationMinutes = 60;

  let year: number;
  let month: number;
  let day: number;

  const isoMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (isoMatch) {
    year = Number(isoMatch[1]);
    month = Number(isoMatch[2]);
    day = Number(isoMatch[3]);
  } else {
    const months: Record<string, number> = {
      jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
      jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
    };

    const monthMatch = dateStr.toLowerCase().match(
      /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/
    );
    const dayMatch = dateStr.match(/\b([0-2]?[0-9]|3[01])\b/);

    if (monthMatch && dayMatch) {
      year = now.getFullYear();
      month = months[monthMatch[1]];
      day = Number(dayMatch[1]);

      // Interpret human-readable dates in the requested timezone.
      const candidate = zonedDateTimeToUtc(year, month, day, 23, 59, timeZone);
      if (candidate.getTime() < now.getTime()) year += 1;
    } else {
      // Safe fallback: two days ahead in the requested timezone.
      const future = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
      const parts = getDatePartsInTimeZone(future, timeZone);
      year = parts.year;
      month = parts.month;
      day = parts.day;
    }
  }

  const { hours, minutes } = parseTimeString(timeStr);
  const start = zonedDateTimeToUtc(year, month, day, hours, minutes, timeZone);
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

  return { start, end, timeZone };
}

function formatIcsTimestamp(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function getCalendarMeetUrl(submission: ContactSubmission): string {
  return submission.meetLink || "Google Meet link will be provided after confirmation.";
}

// Generate RFC 5545 compliant .ics string
function generateIcsCalendar(submission: ContactSubmission): string {
  const { start, end } = parseSubmissionDateTime(submission);
  const dtStamp = formatIcsTimestamp(new Date());
  const dtStart = formatIcsTimestamp(start);
  const dtEnd = formatIcsTimestamp(end);
  const meetUrl = getCalendarMeetUrl(submission);
  const adminEmail = process.env.GMAIL_USER || "startwithorion@gmail.com";

  const summary = `Orion Discovery Call: ${submission.name} × Orion Tech`;
  const description = [
    `Technical Sprint Discovery & Architecture Call with ${submission.name} (${submission.email}).`,
    `Project: ${submission.subject}`,
    `Target Budget: ${submission.budget || "$2,500 - $5,000"}`,
    `Timeline: ${submission.timeline || "3 - 4 Weeks"}`,
    `Video Meeting Room: ${meetUrl}`,
    `Inquiry ID: ${submission.id}`,
    `Requested timezone: ${resolveTimeZone(submission.timezone).label}`,
  ].join("\\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Orion Architecture//Discovery Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${submission.id}@startwithorion.com`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${meetUrl}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    `ORGANIZER;CN=Orion Architecture:mailto:${adminEmail}`,
    `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=${submission.name}:mailto:${submission.email}`,
    "TRANSP:OPAQUE",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function generateGoogleCalendarUrl(submission: ContactSubmission): string {
  const { start, end } = parseSubmissionDateTime(submission);
  const dtStart = formatIcsTimestamp(start).replace(/Z$/, "");
  const dtEnd = formatIcsTimestamp(end).replace(/Z$/, "");
  const meetUrl = getCalendarMeetUrl(submission);
  const title = encodeURIComponent(`Orion Discovery Call: ${submission.name} × Orion Tech`);
  const details = encodeURIComponent(
    `Technical Discovery Call with ${submission.name} (${submission.email}).\n` +
    `Project: ${submission.subject}\n` +
    `Budget: ${submission.budget || "Not specified"}\n` +
    `Timeline: ${submission.timeline || "Not specified"}\n` +
    `Google Meet: ${meetUrl}\n` +
    `Inquiry ID: ${submission.id}`
  );
  const location = encodeURIComponent(meetUrl);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dtStart}/${dtEnd}&ctz=${encodeURIComponent(
    resolveTimeZone(submission.timezone).iana
  )}&details=${details}&location=${location}&add=startwithorion@gmail.com`;
}

function generateOutlookCalendarUrl(submission: ContactSubmission): string {
  const { start, end } = parseSubmissionDateTime(submission);
  const meetUrl = getCalendarMeetUrl(submission);
  const title = encodeURIComponent(`Orion Discovery Call: ${submission.name} × Orion Tech`);
  const body = encodeURIComponent(
    `Technical Discovery Call with ${submission.name} (${submission.email}).\n` +
    `Project: ${submission.subject}\n` +
    `Budget: ${submission.budget || "Not specified"}\n` +
    `Timeline: ${submission.timeline || "Not specified"}\n` +
    `Google Meet: ${meetUrl}`
  );
  const location = encodeURIComponent(meetUrl);

  return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&body=${body}&location=${location}&startdt=${start.toISOString()}&enddt=${end.toISOString()}`;
}

// -------------------------------------------------------------
// Nodemailer Transporter Helper
// -------------------------------------------------------------
function getMailTransporter() {
  const user = process.env.GMAIL_USER || "startwithorion@gmail.com";
  const pass = process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_PASS;

  if (!pass) {
    console.log(`[MAILER SIMULATION] GMAIL_APP_PASSWORD is not set. Real emails simulated in sandbox.`);
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass: pass.replace(/\s+/g, ""),
    },
  });
}

// Send Real Email Notification to Admin
async function sendAdminNotificationEmail(submission: ContactSubmission, hostUrl: string) {
  const transporter = getMailTransporter();
  const adminEmail = process.env.GMAIL_USER || "startwithorion@gmail.com";
  const confirmUrl = `${hostUrl}/api/inquiries/${submission.id}/confirm`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0B0F19; color: #E2E8F0; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #111827; border: 1px solid #1F2937; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
          .header { background: linear-gradient(135deg, #4338CA 0%, #312E81 100%); padding: 24px 32px; border-bottom: 1px solid #374151; }
          .header h1 { margin: 0 0 6px 0; color: #FFFFFF; font-size: 20px; font-weight: 700; }
          .header p { margin: 0; color: #C7D2FE; font-size: 13px; font-family: monospace; }
          .content { padding: 32px; }
          .badge { display: inline-block; background-color: #FEF3C7; color: #92400E; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: bold; text-transform: uppercase; margin-bottom: 20px; }
          .card { background-color: #0D1322; border: 1px solid #1E293B; border-radius: 12px; padding: 20px; margin-bottom: 20px; }
          .row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 13px; }
          .row:last-child { margin-bottom: 0; }
          .label { color: #94A3B8; font-weight: 500; }
          .value { color: #F8FAFC; font-weight: 600; text-align: right; }
          .highlight { color: #38BDF8; font-weight: bold; }
          .message-box { background-color: #1E293B; border-left: 4px solid #6366F1; padding: 14px 18px; border-radius: 6px; font-size: 14px; line-height: 1.5; color: #CBD5E1; margin: 16px 0; }
          .btn-confirm { display: block; width: 100%; box-sizing: border-box; text-align: center; background-color: #10B981; color: #FFFFFF !important; padding: 14px 20px; border-radius: 10px; font-weight: 700; font-size: 14px; text-decoration: none; margin-top: 24px; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4); }
          .btn-reply { display: block; width: 100%; box-sizing: border-box; text-align: center; background-color: #1F2937; color: #E5E7EB !important; border: 1px solid #374151; padding: 12px 20px; border-radius: 10px; font-weight: 600; font-size: 13px; text-decoration: none; margin-top: 10px; }
          .footer { background-color: #090D16; padding: 18px 32px; text-align: center; font-size: 11px; color: #64748B; border-top: 1px solid #1F2937; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📅 New Discovery Call Request</h1>
            <p>ID: ${submission.id} • ${new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p>
          </div>
          <div class="content">
            <span class="badge">⏳ Action Required: Approval Pending</span>

            <div class="card">
              <div class="row">
                <span class="label">Client Name:</span>
                <span class="value">${submission.name}</span>
              </div>
              <div class="row">
                <span class="label">Client Email:</span>
                <span class="value"><a href="mailto:${submission.email}" style="color: #60A5FA;">${submission.email}</a></span>
              </div>
              ${submission.company ? `
              <div class="row">
                <span class="label">Company / Brand:</span>
                <span class="value">${submission.company}</span>
              </div>` : ''}
              <div class="row" style="border-top: 1px solid #1E293B; padding-top: 12px; margin-top: 12px;">
                <span class="label">Requested Meeting:</span>
                <span class="value highlight">${submission.preferredDate} at ${submission.preferredTime} ${submission.timezone} (${submission.callDuration})</span>
              </div>
              <div class="row">
                <span class="label">Target Budget:</span>
                <span class="value" style="color: #34D399;">${submission.budget}</span>
              </div>
              <div class="row">
                <span class="label">Target Timeline:</span>
                <span class="value">${submission.timeline}</span>
              </div>
            </div>

            <p style="font-size: 12px; color: #94A3B8; margin-bottom: 6px; font-weight: bold; text-transform: uppercase;">Project Subject & Brief:</p>
            <div class="message-box">
              <strong style="color: #FFFFFF; display: block; margin-bottom: 6px;">${submission.subject}</strong>
              ${submission.message.replace(/\n/g, '<br/>')}
            </div>

            <a href="${confirmUrl}" class="btn-confirm">
              ✅ 1-CLICK CONFIRM CALL & DISPATCH CALENDAR INVITE
            </a>

            <a href="mailto:${submission.email}?subject=Re: Technical Discovery Call - ${encodeURIComponent(submission.subject)}" class="btn-reply">
              ✉️ Reply Directly to Client (${submission.email})
            </a>
          </div>
          <div class="footer">
            Automated notification sent to ${adminEmail} from your Portfolio Contact & Booking System.
          </div>
        </div>
      </body>
    </html>
  `;

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Orion Discovery Requests" <${adminEmail}>`,
        to: adminEmail,
        replyTo: submission.email,
        subject: `🚨 Discovery Call Request: ${submission.name} (${submission.preferredDate} at ${submission.preferredTime}) [${submission.budget}]`,
        html: htmlContent,
      });
      console.log(`[EMAIL DISPATCHED] Real notification sent to ${adminEmail} for inquiry ${submission.id}`);
      return true;
    } catch (mailError) {
      console.error("[EMAIL DISPATCH ERROR]", mailError);
      return false;
    }
  } else {
    console.log(`[EMAIL SIMULATED] Notification generated for ${adminEmail}. Confirm URL: ${confirmUrl}`);
    return false;
  }
}

// Send Real Confirmation Email to Client with Attached .ics and Google Calendar Link
async function sendClientConfirmationEmail(submission: ContactSubmission) {
  const transporter = getMailTransporter();
  const adminEmail = process.env.GMAIL_USER || "startwithorion@gmail.com";
  const meetUrl = submission.meetLink || `https://meet.google.com/orion-${submission.id.toLowerCase()}`;
  const gcalUrl = generateGoogleCalendarUrl(submission);
  const outlookUrl = generateOutlookCalendarUrl(submission);
  const icsContent = generateIcsCalendar(submission);

  const clientHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0B0F19; color: #E2E8F0; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #111827; border: 1px solid #10B981; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
          .header { background: linear-gradient(135deg, #059669 0%, #064E3B 100%); padding: 24px 32px; color: #FFFFFF; }
          .header h1 { margin: 0 0 6px 0; font-size: 20px; }
          .content { padding: 32px; }
          .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; background: rgba(16, 185, 129, 0.15); color: #34D399; font-weight: bold; font-size: 12px; border: 1px solid rgba(16, 185, 129, 0.3); margin-bottom: 16px; }
          .card { background-color: #0D1322; border: 1px solid #1E293B; border-radius: 12px; padding: 20px; margin-bottom: 20px; }
          .meet-box { background: #064E3B; border: 1px solid #059669; border-radius: 12px; padding: 18px; margin: 20px 0; text-align: center; }
          .meet-link { display: inline-block; padding: 12px 24px; background: #10B981; color: #064E3B; font-weight: bold; font-size: 14px; text-decoration: none; border-radius: 8px; margin-top: 8px; }
          .btn-cal { display: inline-block; padding: 10px 18px; background: #1F2937; color: #F3F4F6 !important; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 12px; margin: 4px; border: 1px solid #374151; }
          .footer { background-color: #090D16; padding: 16px 32px; text-align: center; font-size: 11px; color: #64748B; border-top: 1px solid #1F2937; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✓ Your Discovery Call is Confirmed!</h1>
            <p style="margin: 0; opacity: 0.9; font-size: 13px;">Orion Architecture • Technical Discovery Sprint</p>
          </div>
          <div class="content">
            <span class="badge">MEETING CONFIRMED</span>
            <p>Hi <strong>${submission.name}</strong>,</p>
            <p>Your technical discovery call has been confirmed. Attached to this email is your official <strong>.ics calendar invite</strong>.</p>
            
            <div class="card">
              <p style="margin: 0 0 8px 0; color: #94A3B8; font-size: 12px; font-weight: bold;">MEETING SUMMARY</p>
              <p style="margin: 0 0 6px 0; font-size: 16px; color: #34D399; font-weight: bold;">📅 ${submission.preferredDate} at ${submission.preferredTime} ${submission.timezone}</p>
              <p style="margin: 0 0 4px 0; font-size: 13px; color: #94A3B8;">Duration: ${submission.callDuration || "30 Mins"}</p>
              <p style="margin: 0; font-size: 13px; color: #CBD5E1;">Project Focus: <strong>${submission.subject}</strong></p>
            </div>

            <div class="meet-box">
              <div style="font-size: 12px; color: #A7F3D0; font-weight: bold; margin-bottom: 4px;">OFFICIAL GOOGLE MEET ROOM</div>
              <a href="${meetUrl}" class="meet-link" target="_blank">📹 JOIN GOOGLE MEET VIDEO ROOM</a>
              <div style="font-size: 11px; color: #D1FAE5; margin-top: 6px; word-break: break-all;">${meetUrl}</div>
            </div>

            <div style="text-align: center; margin: 18px 0;">
              <a href="${gcalUrl}" class="btn-cal" target="_blank">📅 Add to Google Calendar</a>
              <a href="${outlookUrl}" class="btn-cal" target="_blank">🗓️ Add to Outlook / Office 365</a>
            </div>

            <p style="font-size: 12px; color: #64748B; margin-top: 24px; text-align: center;">
              Need to reschedule or add colleagues? Simply reply to this email or contact <a href="mailto:${adminEmail}" style="color: #60A5FA;">${adminEmail}</a>.
            </p>
          </div>
          <div class="footer">
            Orion Architecture • High-Performance Web Applications & Distributed Systems
          </div>
        </div>
      </body>
    </html>
  `;

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Orion Architecture" <${adminEmail}>`,
        to: submission.email,
        replyTo: adminEmail,
        subject: `✓ Confirmed: Technical Discovery Call with Orion Architecture (${submission.preferredDate})`,
        html: clientHtml,
        icalEvent: {
          filename: `discovery-call-${submission.id}.ics`,
          method: "REQUEST",
          content: icsContent,
        },
      });
      console.log(`[CLIENT EMAIL DISPATCHED] Confirmation + .ics invite sent to ${submission.email}`);
      return true;
    } catch (err) {
      console.error("[CLIENT EMAIL ERROR]", err);
      return false;
    }
  } else {
    console.log(`[CLIENT EMAIL SIMULATED] Confirmation prepared for ${submission.email} with Meet link ${meetUrl}`);
    return false;
  }
}
// -------------------------------------------------------------
// Create Real Google Calendar Event + Google Meet
// -------------------------------------------------------------

async function createGoogleCalendarEvent(
  submission: ContactSubmission
): Promise<{ eventId: string; meetLink: string; calendarUrl: string }> {

  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!refreshToken) {
    throw new Error("GOOGLE_REFRESH_TOKEN is not configured.");
  }

  const oauth2Client = getGoogleOAuthClient();
  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  const calendar = google.calendar({
    version: "v3",
    auth: oauth2Client,
  });

  const { start, end, timeZone } = parseSubmissionDateTime(submission);

  const response = await calendar.events.insert({
    calendarId: "primary",

    conferenceDataVersion: 1,

    sendUpdates: "all",

    requestBody: {
      summary: `Orion Discovery Call: ${submission.name} × Orion Tech`,

      description: [
        `Technical Discovery Call with ${submission.name}`,
        `Client Email: ${submission.email}`,
        `Project: ${submission.subject}`,
        `Budget: ${submission.budget || "Not specified"}`,
        `Timeline: ${submission.timeline || "Not specified"}`,
        `Inquiry ID: ${submission.id}`,
      ].join("\n"),

      start: {
        dateTime: start.toISOString(),
        timeZone,
      },

      end: {
        dateTime: end.toISOString(),
        timeZone,
      },

      attendees: [
        {
          email: submission.email,
          displayName: submission.name,
        },
      ],

      conferenceData: {
        createRequest: {
          requestId: `orion-${submission.id}-${Date.now()}`,
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
        },
      },
    },
  });

  const event = response.data;

  const meetLink =
    event.hangoutLink ||
    event.conferenceData?.entryPoints?.find(
      (entry) => entry.entryPointType === "video"
    )?.uri;

  if (!meetLink) {
    throw new Error("Google Calendar event created but Meet link was not returned.");
  }

  const calendarUrl =
    event.htmlLink ||
    `https://calendar.google.com/calendar/u/0/r/eventedit/${event.id}`;

  return {
    eventId: event.id || "",
    meetLink,
    calendarUrl,
  };
}
// -------------------------------------------------------------
// Google Calendar OAuth Routes
// -------------------------------------------------------------

app.get("/auth/google", (_req, res) => {
  const oauth2Client = getGoogleOAuthClient();

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
    return res.status(500).send("Google OAuth is not configured yet.");
  }

  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: GOOGLE_CALENDAR_SCOPES,
  });
  console.log("[GOOGLE OAUTH URL]", authorizationUrl);

  return res.redirect(authorizationUrl);
});

app.get("/auth/google/callback", async (req, res) => {
  try {
    const code = String(req.query.code || "");

    if (!code) {
      return res.status(400).send("Google authorization code is missing.");
    }

    const oauth2Client = getGoogleOAuthClient();

    const { tokens } = await oauth2Client.getToken(code);

    console.log("[GOOGLE OAUTH] Authorization successful.");
    console.log(
      "[GOOGLE OAUTH] Refresh token received:",
      tokens.refresh_token ? "YES" : "NO"
    );

    if (!tokens.refresh_token) {
      return res.status(400).send(
        "No refresh token received. Please revoke the previous Orion authorization and authorize again."
      );
    }

    // TEMPORARY: for initial setup/testing only.
    // We will move this to secure persistent storage for production.
    process.env.GOOGLE_REFRESH_TOKEN = tokens.refresh_token;


    return res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Google Calendar Connected</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body style="
          font-family: sans-serif;
          background: #0B0F19;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          text-align: center;
        ">
          <div>
            <h1>✓ Google Calendar Connected</h1>
            <p>Orion is now authorized to create Calendar events.</p>
            <p>You can close this window.</p>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("[GOOGLE OAUTH ERROR]", error);
    return res.status(500).send("Google authorization failed.");
  }
});
// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    inquiriesCount: contactSubmissionsStore.length,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Available Calendar Slots
app.get("/api/calendar/available-slots", (req, res) => {
  const requested = String(req.query.timezone || "IST");
  const zone = resolveTimeZone(requested);
  const now = new Date();

  const slotsByDay = [
    ["10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"],
    ["09:30 AM", "01:00 PM", "03:30 PM", "05:00 PM"],
    ["10:00 AM", "12:00 PM", "02:30 PM", "04:00 PM"],
    ["11:00 AM", "02:00 PM", "03:30 PM", "06:00 PM"],
  ];

  const dateFormatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: zone.iana,
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const todayParts = getDatePartsInTimeZone(now, zone.iana);
  const days: Array<{
    date: string;
    isoDate: string;
    slots: string[];
  }> = [];

  for (let i = 0; i < 14; i++) {
    // Build the calendar date in the requested timezone, never in Render's local timezone.
    const midnightUtc = zonedDateTimeToUtc(
      todayParts.year,
      todayParts.month,
      todayParts.day + i,
      0,
      0,
      zone.iana
    );

    const parts = getDatePartsInTimeZone(midnightUtc, zone.iana);
    const isoDate = [
      String(parts.year).padStart(4, "0"),
      String(parts.month).padStart(2, "0"),
      String(parts.day).padStart(2, "0"),
    ].join("-");

    let slots = [...slotsByDay[i % slotsByDay.length]];

    // Remove already-passed slots for today in the user's selected timezone.
    if (i === 0) {
      const current = getDatePartsInTimeZone(now, zone.iana);
      const currentMinutes = current.hour * 60 + current.minute;

      slots = slots.filter((slot) => {
        const { hours, minutes } = parseTimeString(slot);
        return hours * 60 + minutes > currentMinutes;
      });
    }

    days.push({
      date: dateFormatter.format(midnightUtc),
      isoDate,
      slots,
    });
  }

  res.json({
    success: true,
    timezone: zone.label,
    timeZone: zone.iana,
    days,
  });
});

// Confirm Call (GET for 1-click email confirmation link from Gmail)
app.get("/api/inquiries/:id/confirm", async (req, res) => {
  try {
    const { id } = req.params;
    const inquiry = contactSubmissionsStore.find((item) => item.id === id);

    if (!inquiry) {
      return res.status(404).send(`
        <!DOCTYPE html>
        <html>
          <head><title>Inquiry Not Found</title></head>
          <body style="font-family:sans-serif;background:#0B0F19;color:#fff;padding:40px;text-align:center;">
            <h2>Inquiry Not Found</h2>
            <p>This inquiry (${id}) was not found.</p>
          </body>
        </html>
      `);
    }

    // Prevent accidentally creating duplicate meetings
    if (inquiry.status === "confirmed" && inquiry.meetLink) {
      return res.send(`
        <!DOCTYPE html>
        <html>
          <head><title>Already Confirmed</title></head>
          <body style="font-family:sans-serif;background:#0B0F19;color:#fff;padding:40px;text-align:center;">
            <h2>✓ Already Confirmed</h2>
            <p>This discovery call has already been confirmed.</p>
            <p>
              <a href="${inquiry.meetLink}" style="color:#34D399;">
                Join Google Meet
              </a>
            </p>
          </body>
        </html>
      `);
    }

    // Create REAL Google Calendar event + REAL Google Meet
    const meeting = await createGoogleCalendarEvent(inquiry);

    inquiry.meetLink = meeting.meetLink;
    inquiry.status = "confirmed";
    inquiry.confirmedAt = new Date().toISOString();

    savePersistedInquiries();

    // Send confirmation email to client
    await sendClientConfirmationEmail(inquiry);

    console.log(
      `[MEETING CONFIRMED] ${inquiry.email} | Meet: ${meeting.meetLink}`
    );

    return res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Discovery Call Confirmed</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>

        <body style="
          font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
          background:#0B0F19;
          color:#E2E8F0;
          padding:40px 20px;
          text-align:center;
        ">

          <div style="
            max-width:520px;
            margin:auto;
            background:#111827;
            border:1px solid #10B981;
            border-radius:20px;
            padding:36px;
          ">

            <div style="font-size:48px;">✓</div>

            <h1 style="color:#fff;">
              Discovery Call Confirmed!
            </h1>

            <p style="color:#94A3B8;line-height:1.6;">
              The meeting with <strong>${inquiry.name}</strong> has been
              successfully added to Google Calendar.
            </p>

            <p style="color:#94A3B8;">
              A real Google Meet room has been created and the client has
              been sent the calendar invitation.
            </p>

            <a
              href="${meeting.meetLink}"
              target="_blank"
              style="
                display:block;
                background:#10B981;
                color:#064E3B;
                text-decoration:none;
                padding:14px 20px;
                border-radius:10px;
                font-weight:bold;
                margin-top:24px;
              "
            >
              🎥 Join Google Meet
            </a>

            <a
              href="${meeting.calendarUrl}"
              target="_blank"
              style="
                display:block;
                background:#1F2937;
                color:#CBD5E1;
                text-decoration:none;
                padding:12px 20px;
                border-radius:10px;
                margin-top:12px;
              "
            >
              📅 Open Google Calendar Event
            </a>

          </div>

        </body>
      </html>
    `);

  } catch (error) {
    console.error("[CONFIRMATION ERROR]", error);

    return res.status(500).send(`
      <!DOCTYPE html>
      <html>
        <head><title>Confirmation Failed</title></head>
        <body style="font-family:sans-serif;background:#0B0F19;color:#fff;padding:40px;text-align:center;">
          <h2>⚠️ Meeting Could Not Be Created</h2>
          <p>Please try again or check the Google Calendar connection.</p>
        </body>
      </html>
    `);
  }
});

// Submit Contact / Meeting Inquiry
app.post("/api/contact", async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message,
      company,
      budget,
      timeline,
      preferredDate,
      preferredTime,
      callDuration,
      timezone,
      website_hp,
      hp_company_url,
      captchaAnswer,
    } = req.body;

    const errors: Record<string, string> = {};

    // 1. Honeypot Anti-Spam Security Traps
    if ((website_hp && String(website_hp).trim() !== "") || (hp_company_url && String(hp_company_url).trim() !== "")) {
      return res.status(400).json({
        success: false,
        message: "Bot trap triggered.",
        errors: { website_hp: "Submission rejected." },
      });
    }

    // 2. Anti-spam CAPTCHA check
    if (captchaAnswer !== undefined && String(captchaAnswer).trim() !== "7") {
      errors.captcha = "Anti-spam math answer is incorrect (3 + 4 = 7).";
    }

    // 3. Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      errors.name = "Please enter your full name (min 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      errors.email = "Please enter a valid work email address.";
    }

    if (!subject || typeof subject !== "string" || subject.trim().length < 3) {
      errors.subject = "Please enter a project title (min 3 characters).";
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      errors.message = "Please provide project requirements (min 10 characters).";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors,
      });
    }

    const submissionId = `INQ-${Date.now().toString().slice(-6)}`;
    const meetLink = "";
    const proposalSummary = `Technical Sprint Evaluation for ${subject.trim()}. Architecture: React 19 + Node.js Express + Tailwind CSS with targeted 100/100 Core Web Vitals performance benchmarks.`;

    const newSubmission: ContactSubmission = {
      id: submissionId,
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      company: company ? String(company).trim() : "",
      budget: budget ? String(budget).trim() : "$2,500 - $5,000",
      timeline: timeline ? String(timeline).trim() : "3 - 4 Weeks",
      preferredDate: preferredDate || "",
      preferredTime: preferredTime || "02:00 PM",
      callDuration: callDuration || "30 Mins",
      timezone: timezone || "IST",
      status: "pending_approval",
      createdAt: new Date().toISOString(),
      proposalSummary,
      meetLink,
    };

    contactSubmissionsStore.unshift(newSubmission);
    savePersistedInquiries();

    // Determine host URL for 1-click confirm link
    const protocol = req.headers["x-forwarded-proto"] || req.protocol || "http";
    const host = req.headers["x-forwarded-host"] || req.get("host") || `localhost:${PORT}`;
    const hostUrl = process.env.APP_URL || `${protocol}://${host}`;

    // Dispatch real email to developer
    await sendAdminNotificationEmail(newSubmission, hostUrl);

    console.log(`[INQUIRY RECORDED] ID: ${submissionId} from ${newSubmission.name} (${newSubmission.email}) - Saved to data/inquiries.json`);

    return res.status(200).json({
      success: true,
      status: "pending_approval",
      message: "Request Received — Pending Confirmation. Notification dispatched to developer.",
      submissionId,
      submission: newSubmission,
      aiProposal: proposalSummary,
      googleCalendarUrl: generateGoogleCalendarUrl(newSubmission),
      outlookCalendarUrl: generateOutlookCalendarUrl(newSubmission),
    });
  } catch (err: any) {
    console.error("Contact submission error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error processing contact submission.",
    });
  }
});


// Confirm Call (POST for frontend approval & real Google Calendar + Meet)
app.post("/api/inquiries/:id/confirm", async (req, res) => {
  try {
    const { id } = req.params;
    const inquiry = contactSubmissionsStore.find((item) => item.id === id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found.",
      });
    }

    // Already confirmed — don't create a duplicate Google Calendar event
    if (inquiry.status === "confirmed" && inquiry.meetLink) {
      return res.json({
        success: true,
        message: "Meeting is already confirmed.",
        inquiry,
        googleCalendarUrl: generateGoogleCalendarUrl(inquiry),
        outlookCalendarUrl: generateOutlookCalendarUrl(inquiry),
        icsDownloadUrl: `/api/inquiries/${inquiry.id}/calendar.ics`,
      });
    }

    // Create REAL Google Calendar event + REAL Google Meet room
    const googleEvent = await createGoogleCalendarEvent(inquiry);

    // Save meeting details
    inquiry.meetLink = googleEvent.meetLink;
    inquiry.status = "confirmed";
    inquiry.confirmedAt = new Date().toISOString();

    savePersistedInquiries();

    // Send confirmation email to client
    await sendClientConfirmationEmail(inquiry);

    console.log(
      `[MEETING DISPATCHED] Confirmed call for ${inquiry.email} with Meet Link ${inquiry.meetLink}`
    );

    return res.json({
      success: true,
      message:
        "Meeting confirmed! Google Calendar invite and Google Meet link dispatched.",
      inquiry,
      googleCalendarUrl: googleEvent.calendarUrl,
      outlookCalendarUrl: generateOutlookCalendarUrl(inquiry),
      icsDownloadUrl: `/api/inquiries/${inquiry.id}/calendar.ics`,
    });
  } catch (error: any) {
    console.error("[MEETING CONFIRMATION ERROR]", error);

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Failed to create Google Calendar event and Google Meet room.",
    });
  }
});

// AI Requirement Refiner
app.post("/api/ai/instant-assist", async (req, res) => {
  try {
    const { prompt, taskType } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ success: false, message: "Prompt is required." });
    }

    let result = prompt.trim();
    if (taskType === "autocomplete") {
      result = `${prompt.trim()} built with React 19, Node.js, Tailwind CSS, and 100/100 Core Web Vitals SEO optimization.`;
    } else if (taskType === "scope-review") {
      result = `Technical Scope: High-performance React & Node.js application. Estimated sprint duration: 2 - 3 weeks with 100/100 Lighthouse benchmark targets.`;
    }

    return res.json({
      success: true,
      result,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Error refining prompt.",
      fallback: req.body.prompt || "",
    });
  }
});

// Developer Quick Chat Assistant
app.post("/api/ai/quick-chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ success: false, message: "Message is required." });
    }

    const lower = message.toLowerCase();
    let reply = "Aarav Sharma is a freelance Full-Stack Developer based in Bengaluru, India. He builds fast React 19, Node.js, and TypeScript applications with 100/100 Core Web Vitals!";

    if (lower.includes("stack") || lower.includes("technology") || lower.includes("tech")) {
      reply = "Aarav's core stack includes HTML5, CSS3, JavaScript (ES6+), Node.js & Express APIs, React 19, Tailwind CSS, Technical SEO, and TypeScript.";
    } else if (lower.includes("rate") || lower.includes("price") || lower.includes("cost") || lower.includes("budget")) {
      reply = "Fixed project packages start at ₹8,000 (~$95) for high-converting landing pages up to ₹28,000 (~$335) for complete SaaS / Web App MVPs.";
    } else if (lower.includes("sprint") || lower.includes("available") || lower.includes("time") || lower.includes("slot")) {
      reply = "Aarav is currently accepting new freelance project sprints with typical turnarounds of 3 - 5 days for landing pages and 2 - 3 weeks for full web apps.";
    } else if (lower.includes("experience") || lower.includes("intern")) {
      reply = "Orion is a fresh freelance talent with strong internship experience and 15+ demo builds showcasing clean code, sub-second speed, and 100/100 Lighthouse scores.";
    }

    return res.json({
      success: true,
      reply,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      reply: "Orion is ready to collaborate on your web app sprint. Feel free to use the contact form to discuss requirements!",
    });
  }
});

// Start Express Server
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portfolio server running on http://0.0.0.0:${PORT}`);
  });
}

start();
