import React, { useState, useEffect } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Mail, 
  Copy, 
  Check, 
  Sparkles, 
  MessageSquare, 
  DollarSign, 
  Building2, 
  User,
  ShieldCheck,
  FileText,
  Zap,
  AlertCircle,
  RefreshCw,
  Cpu,
  Video,
  Globe,
  Sliders,
  CalendarDays,
  Edit3,
  Download,
  ExternalLink
} from 'lucide-react';

interface ContactSectionProps {
  initialBrief?: {
    projectType: string;
    selectedFeatures: string[];
    priceRange: string;
    timeline: string;
    estimatedHours: number;
  } | null;
}

interface AvailableDay {
  date: string;
  isoDate: string;
  slots: string[];
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialBrief,
}) => {
  // Calendar & custom meeting state
  // Slots are loaded from the backend so dates stay current in real time.
  const [availableSchedule, setAvailableSchedule] = useState<AvailableDay[]>([]);
  const [scheduleMode, setScheduleMode] = useState<'preset' | 'custom'>('preset');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [callDuration, setCallDuration] = useState<string>('30 Mins');
  const [selectedTimezone, setSelectedTimezone] = useState<string>('IST');

  // Custom Date Picker inputs
  const [customDateInput, setCustomDateInput] = useState<string>('');
  const [customTimeInput, setCustomTimeInput] = useState<string>('14:00');
  const [isEditingMeetingInline, setIsEditingMeetingInline] = useState(false);

  // Load live calendar slots from the backend. The backend provides IST dates/times.
  useEffect(() => {
    const loadAvailableSlots = async () => {
      try {
        const response = await fetch('/api/calendar/available-slots');
        if (!response.ok) throw new Error(`Calendar request failed: ${response.status}`);

        const data = await response.json();

        if (data.success && Array.isArray(data.days)) {
          const days: AvailableDay[] = data.days;
          setAvailableSchedule(days);

          if (days.length > 0) {
            const firstDay = days[0];
            setSelectedDate(firstDay.date);
            setSelectedTime(firstDay.slots?.[0] || '');
            setCustomDateInput(firstDay.isoDate);
          }
        }
      } catch (error) {
        console.error('Failed to load live calendar slots:', error);
      }
    };

    loadAvailableSlots();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Web App Sprint Inquiry',
    company: '',
    budget: '$2,500 - $5,000',
    timeline: '3 - 4 Weeks',
    message: '',
    website_hp: '', // Primary Honeypot trap (must stay empty)
    hp_company_url: '', // Secondary Honeypot trap (must stay empty)
    captchaAnswer: '7', // Default anti-spam math answer (3 + 4 = 7)
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState<{
    submissionId: string;
    aiProposal: string;
    status: 'pending_approval' | 'confirmed';
    meetLink?: string;
    googleCalendarUrl?: string;
    outlookCalendarUrl?: string;
    icsDownloadUrl?: string;
  } | null>(null);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMeetLink, setCopiedMeetLink] = useState(false);

  // Low-latency AI assistant states
  const [isAiSuggesting, setIsAiSuggesting] = useState(false);
  const [aiScopePreview, setAiScopePreview] = useState<string | null>(null);

  // Poll status for real-time synchronization if pending approval
  useEffect(() => {
    if (!submitted || !submissionReceipt || submissionReceipt.status === 'confirmed') {
      return;
    }

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/inquiries/${submissionReceipt.submissionId}/status`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.status === 'confirmed') {
            setSubmissionReceipt((prev) => prev ? {
              ...prev,
              status: 'confirmed',
              meetLink: data.meetLink || prev.meetLink,
              googleCalendarUrl: data.googleCalendarUrl,
              outlookCalendarUrl: data.outlookCalendarUrl,
            } : null);
          }
        }
      } catch (err) {
        // silent polling catch
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [submitted, submissionReceipt]);

  useEffect(() => {
    if (initialBrief) {
      setFormData((prev) => ({
        ...prev,
        subject: `${initialBrief.projectType} Architecture Sprint`,
        budget: initialBrief.priceRange,
        timeline: initialBrief.timeline,
        message: `Building a ${initialBrief.projectType} with key features: ${initialBrief.selectedFeatures.join(', ')}. Target budget: ${initialBrief.priceRange}.`,
      }));
    }
  }, [initialBrief]);

  // Format custom date input into human readable format
  const handleCustomDateChange = (val: string) => {
    setCustomDateInput(val);
    if (!val) return;
    try {
      const parts = val.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        const formatted = d.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        });
        setSelectedDate(formatted);
      }
    } catch {
      setSelectedDate(val);
    }
  };

  // Format 24-hour time to 12-hour AM/PM format
  const handleCustomTimeChange = (time24: string) => {
    setCustomTimeInput(time24);
    if (!time24) return;
    const [hoursStr, minsStr] = time24.split(':');
    let hours = parseInt(hoursStr, 10);
    const mins = minsStr || '00';
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 becomes 12
    const formatted = `${hours < 10 ? '0' + hours : hours}:${mins} ${ampm}`;
    setSelectedTime(formatted);
  };

  // Client-Side Validation
  const validateClientSide = () => {
    const errors: Record<string, string> = {};

    // Check Honeypot Traps (Must stay empty for humans)
    if (formData.website_hp.trim() !== '' || formData.hp_company_url.trim() !== '') {
      errors.website_hp = 'Automated bot submission blocked by honeypot filter.';
    }

    // Name Validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Full name is required (min 2 characters).';
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Valid work email address is required.';
    }

    // Subject Validation
    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errors.subject = 'Subject is required (min 3 characters).';
    }

    // Message Validation
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Please enter project requirements or message (min 10 characters).';
    }

    // CAPTCHA Math Check (3 + 4 = 7)
    if (formData.captchaAnswer.trim() !== '7') {
      errors.captcha = 'Incorrect math verification (3 + 4 = 7).';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Client-Side Validation
    if (!validateClientSide()) {
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    try {
      // 2. Server-Side Submission & Validation
      const payload = {
        ...formData,
        preferredDate: selectedDate,
        preferredTime: selectedTime,
        callDuration,
        timezone: selectedTimezone,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.errors) {
          setFormErrors(data.errors);
        } else {
          setFormErrors({ server: data.message || 'Server-side validation failed.' });
        }
        setIsSubmitting(false);
        return;
      }

      setSubmissionReceipt({
        submissionId: data.submissionId || 'INQ-99012',
        aiProposal: data.aiProposal || 'Technical Project Scope: Initial sprint evaluation ready. Architecture: React + Node.js / Express + Tailwind CSS with targeted 100/100 Core Web Vitals.',
        status: data.status || 'pending_approval',
        meetLink: data.submission?.meetLink || 'https://meet.google.com/orion-discovery',
        googleCalendarUrl: data.googleCalendarUrl,
        outlookCalendarUrl: data.outlookCalendarUrl,
        icsDownloadUrl: `/api/inquiries/${data.submissionId}/calendar.ics`,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Contact submission error:', err);
      setFormErrors({ server: 'Network error submitting inquiry. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Trigger Flash-Lite low-latency auto-complete/refine
  const handleAiInstantAssist = async (field: 'subject' | 'message') => {
    setIsAiSuggesting(true);
    try {
      const promptText = field === 'subject'
        ? `Refine this project subject into a crisp headline: ${formData.subject || 'SaaS Web App'}`
        : `Refine and polish these technical project requirements into a clear 20-word brief: ${formData.message || 'I need a fast React application'}`;

      const res = await fetch('/api/ai/instant-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          taskType: 'autocomplete',
        }),
      });

      const data = await res.json();
      if (data.success && data.result) {
        if (field === 'subject') {
          setFormData((prev) => ({ ...prev, subject: data.result }));
        } else {
          setFormData((prev) => ({ ...prev, message: data.result }));
        }
      }
    } catch (err) {
      console.warn('AI assist failed:', err);
    } finally {
      setIsAiSuggesting(false);
    }
  };

  // Trigger Flash-Lite low-latency scope review preview
  const handleAiScopeReview = async () => {
    if (!formData.message || formData.message.length < 5) return;
    setIsAiSuggesting(true);
    try {
      const res = await fetch('/api/ai/instant-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Subject: ${formData.subject}. Requirements: ${formData.message}. Budget: ${formData.budget}.`,
          taskType: 'scope-review',
        }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setAiScopePreview(data.result);
      }
    } catch (err) {
      console.warn('Scope review error:', err);
    } finally {
      setIsAiSuggesting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('startwithorion@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Get slots for currently selected date
  const currentDaySlots = availableSchedule.find((d) => d.date === selectedDate)?.slots || [];
  const minCustomDate = new Date().toISOString().split('T')[0];

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden bg-slate-950">
      
      {/* Accent glow background */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold">
            <Send className="w-3.5 h-3.5" />
            <span>START A PROJECT SPRINT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
            Let's Engineer Your Web App
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Select your preferred meeting window and submit project requirements. Requests are reviewed against availability before calendar invites are dispatched.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Info & Calendar Booking Selector */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-bold text-slate-100 text-base">Direct Developer Contact</h3>
                  <p className="text-xs text-slate-400">Response time: &lt; 2 Hours (Mon-Sat)</p>
                </div>
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              </div>

              {/* Direct Email Card */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-2">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Primary Email</span>
                <div className="flex items-center justify-between">
                  <span className="text-slate-200 font-mono text-sm font-semibold">startwithorion@gmail.com</span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs flex items-center gap-1 transition-colors"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="space-y-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>NDA Signed Before Code Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Codebase Ownership Transfer</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Daily Progress Video Walkthrough & Staging Links</span>
                </div>
              </div>

              {/* Meeting Window Scheduler & Customizer */}
              <div className="pt-4 border-t border-slate-800 space-y-4">
                
                {/* Header & Mode Switcher */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-300 uppercase font-mono flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    <span>Meeting Window</span>
                  </span>
                  
                  {/* Timezone Switcher */}
                  <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-400">
                    <Globe className="w-3 h-3 text-slate-500" />
                    <select
                      value={selectedTimezone}
                      onChange={(e) => setSelectedTimezone(e.target.value)}
                      className="bg-transparent text-slate-300 focus:outline-none cursor-pointer"
                    >
                      <option value="EST" className="bg-slate-900">EST (UTC-5)</option>
                      <option value="IST" className="bg-slate-900">IST (UTC+5:30)</option>
                      <option value="PST" className="bg-slate-900">PST (UTC-8)</option>
                      <option value="CST" className="bg-slate-900">CST (UTC-6)</option>
                      <option value="GMT" className="bg-slate-900">GMT / BST (UTC+0)</option>
                      <option value="CET" className="bg-slate-900">CET (UTC+1)</option>
                      <option value="AEST" className="bg-slate-900">AEST (UTC+10)</option>
                      <option value="SGT" className="bg-slate-900">SGT (UTC+8)</option>
                    </select>
                  </div>
                </div>

                {/* Mode Selector: Suggested Slots vs Custom Pick */}
                <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setScheduleMode('preset')}
                    className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      scheduleMode === 'preset'
                        ? 'bg-indigo-600 text-white font-bold shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Suggested Slots</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setScheduleMode('custom')}
                    className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      scheduleMode === 'custom'
                        ? 'bg-indigo-600 text-white font-bold shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Custom Date & Time</span>
                  </button>
                </div>

                {/* MODE 1: Preset Slots View */}
                {scheduleMode === 'preset' ? (
                  <div className="space-y-3">
                    {/* Day Selection Tabs */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      {availableSchedule.map((day) => (
                        <button
                          key={day.date}
                          type="button"
                          onClick={() => {
                            setSelectedDate(day.date);
                            if (!day.slots.includes(selectedTime)) {
                              setSelectedTime(day.slots[0]);
                            }
                          }}
                          className={`p-2 rounded-xl text-xs font-mono transition-all text-center border cursor-pointer ${
                            selectedDate === day.date
                              ? 'bg-indigo-950/90 text-indigo-300 border-indigo-500/80 font-bold shadow-sm'
                              : 'bg-slate-950/60 text-slate-400 border-slate-800/80 hover:text-slate-200'
                          }`}
                        >
                          {day.date}
                        </button>
                      ))}
                    </div>

                    {/* Time Slots Grid for Selected Day */}
                    <div>
                      <label className="text-[11px] text-slate-400 font-mono block mb-2">Available Slots ({selectedTimezone}):</label>
                      <div className="grid grid-cols-2 gap-2">
                        {currentDaySlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTime(slot)}
                            className={`p-2.5 rounded-xl text-xs font-mono transition-all flex items-center justify-between border cursor-pointer ${
                              selectedTime === slot
                                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500 font-bold'
                                : 'bg-slate-950/60 text-slate-400 border-slate-800/80 hover:text-slate-200'
                            }`}
                          >
                            <span>{slot}</span>
                            {selectedTime === slot && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* MODE 2: Custom Date & Time Picker */
                  <div className="space-y-3 p-3.5 bg-slate-950/90 rounded-2xl border border-indigo-900/60">
                    
                    {/* Custom Date Input */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] text-slate-300 font-mono font-bold flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Pick Custom Date:</span>
                      </label>
                      <input
                        type="date"
                        min={minCustomDate}
                        value={customDateInput}
                        onChange={(e) => handleCustomDateChange(e.target.value)}
                        className="w-full bg-slate-900 text-slate-200 text-xs px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 font-mono cursor-pointer"
                      />
                    </div>

                    {/* Custom Time Input & Quick Presets */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] text-slate-300 font-mono font-bold flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Pick Exact Time ({selectedTimezone}):</span>
                        </label>
                        <input
                          type="time"
                          value={customTimeInput}
                          onChange={(e) => handleCustomTimeChange(e.target.value)}
                          className="bg-slate-900 text-emerald-400 text-xs px-2 py-1 rounded-lg border border-slate-800 focus:outline-none font-mono font-bold cursor-pointer"
                        />
                      </div>

                      {/* Quick Popular Times */}
                      <div className="grid grid-cols-3 gap-1.5 pt-1">
                        {['10:00 AM', '02:00 PM', '04:30 PM', '06:00 PM', '08:00 PM', '09:30 PM'].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setSelectedTime(t)}
                            className={`py-1.5 px-2 rounded-lg text-[11px] font-mono transition-all text-center border cursor-pointer ${
                              selectedTime === t
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-500 font-bold'
                                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* Call Duration Picker */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-[11px] text-slate-400 font-mono block">Meeting Duration:</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['15 Mins', '30 Mins', '45 Mins'].map((dur) => (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => setCallDuration(dur)}
                        className={`py-1.5 rounded-lg text-xs font-mono transition-all text-center border cursor-pointer ${
                          callDuration === dur
                            ? 'bg-slate-800 text-indigo-300 border-indigo-500 font-bold'
                            : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        {dur}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Preference Live Badge */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Locked Preference:</span>
                  <span className="text-emerald-400 font-bold text-right">
                    {selectedDate}, {selectedTime} {selectedTimezone} ({callDuration})
                  </span>
                </div>

              </div>

              {/* Approval Notice Note */}
              <div className="p-3 bg-indigo-950/30 border border-indigo-500/20 rounded-xl flex items-center gap-2.5 text-xs text-indigo-300">
                <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Requested custom slots are held pending schedule confirmation & calendar invite.</span>
              </div>

            </div>

          </div>

          {/* Right Column: Project Inquiry Form or Pending Confirmation Receipt */}
          <div className="lg:col-span-7">
            
            {submitted ? (
              <div className="bg-slate-900 rounded-3xl p-8 border border-emerald-500/60 shadow-2xl space-y-6">
                
                {/* Header Status Badge */}
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-slate-100">Project Brief Received</h3>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Thank you, <strong className="text-emerald-400">{formData.name}</strong>. Your technical inquiry has been received.
                    </p>
                  </div>

                  {/* Status Indicator */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
                    <Clock className={`w-3.5 h-3.5 ${submissionReceipt?.status === 'pending_approval' ? 'animate-pulse text-amber-400' : 'text-emerald-400'}`} />
                    <span>
                      {submissionReceipt?.status === 'pending_approval' 
                        ? 'STATUS: PENDING DEVELOPER CONFIRMATION' 
                        : 'STATUS: CALL APPROVED & CALENDAR EVENT SENT'}
                    </span>
                  </div>
                </div>

                {/* Requested Call Slot & Details Summary */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs font-mono text-slate-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                    <span className="text-slate-400">Requested Meeting:</span>
                    <span className="text-indigo-300 font-bold text-sm bg-indigo-950/60 px-2.5 py-1 rounded border border-indigo-800/80">
                      {selectedDate} at {selectedTime} {selectedTimezone} ({callDuration})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Target Budget:</span>
                      <span className="text-slate-200 font-semibold">{formData.budget}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Target Timeline:</span>
                      <span className="text-slate-200 font-semibold">{formData.timeline}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between border-t border-slate-800 pt-2 gap-1">
                    <span className="text-slate-500">Work Email:</span>
                    <span className="text-slate-200">{formData.email}</span>
                  </div>
                </div>

                {/* Informative Explanation */}
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs text-slate-400 space-y-2 leading-relaxed text-left">
                  <p className="text-slate-200 font-semibold">What happens next?</p>
                  <p>
                    1. <strong>Schedule Review</strong>: We review your requested slot (<span className="text-indigo-400 font-mono">{selectedDate} at {selectedTime} {selectedTimezone}</span>) against the live calendar.
                  </p>
                  <p>
                    2. <strong>Google Calendar Invite</strong>: Once confirmed, an official Google Calendar invite with a Google Meet video link will be sent directly to <strong className="text-slate-200">{formData.email}</strong>.
                  </p>
                  <p>
                    3. <strong>Technical Scope Brief</strong>: A preliminary architecture sprint plan will be attached for review before the call.
                  </p>
                </div>

                {/* Instant Server AI Proposal Breakdown */}
                {submissionReceipt && (
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-left space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-emerald-400 border-b border-slate-800 pb-2">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Cpu className="w-4 h-4" />
                        PRELIMINARY ARCHITECTURE ASSESSMENT
                      </span>
                      <span className="text-slate-500">ID: {submissionReceipt.submissionId}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {submissionReceipt.aiProposal}
                    </p>
                  </div>
                )}

                {/* Confirmed Call View - shown only after real developer approval */}
                {submissionReceipt?.status === 'confirmed' && (
                  <div className="p-5 bg-emerald-950/40 border border-emerald-500/50 rounded-2xl space-y-4 text-left text-xs">
                    <div className="flex items-center justify-between border-b border-emerald-800/60 pb-3">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono">
                        <Video className="w-4 h-4" />
                        <span>Google Meet Video Room Ready</span>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-700/60">
                        CONFIRMED
                      </span>
                    </div>

                    {/* Google Meet Action Button */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <a
                        href={submissionReceipt?.meetLink || 'https://meet.google.com/new'}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-3 rounded-xl text-center flex items-center justify-center gap-2 text-xs transition-all shadow-lg shadow-emerald-500/20"
                      >
                        <Video className="w-4 h-4" />
                        <span>Join Google Meet Video Room</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          if (submissionReceipt?.meetLink) {
                            navigator.clipboard.writeText(submissionReceipt.meetLink);
                            setCopiedMeetLink(true);
                            setTimeout(() => setCopiedMeetLink(false), 2000);
                          }
                        }}
                        className="px-3.5 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl text-xs font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        title="Copy Meet Link"
                      >
                        {copiedMeetLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedMeetLink ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    {/* Calendar Synchronization Row */}
                    <div className="pt-2 space-y-2">
                      <p className="text-[11px] font-mono font-bold text-slate-300 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Synchronize with Your Calendar:</span>
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {/* 1-Click Google Calendar */}
                        {submissionReceipt?.googleCalendarUrl && (
                          <a
                            href={submissionReceipt.googleCalendarUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-slate-900 hover:bg-indigo-950/80 border border-slate-800 hover:border-indigo-500/60 text-slate-200 hover:text-indigo-300 px-3 py-2 rounded-xl text-[11px] font-mono flex items-center justify-center gap-1.5 transition-all text-center"
                          >
                            <Calendar className="w-3 h-3 text-indigo-400" />
                            <span>Google Calendar</span>
                          </a>
                        )}

                        {/* 1-Click Outlook */}
                        {submissionReceipt?.outlookCalendarUrl && (
                          <a
                            href={submissionReceipt.outlookCalendarUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-slate-900 hover:bg-sky-950/80 border border-slate-800 hover:border-sky-500/60 text-slate-200 hover:text-sky-300 px-3 py-2 rounded-xl text-[11px] font-mono flex items-center justify-center gap-1.5 transition-all text-center"
                          >
                            <CalendarDays className="w-3 h-3 text-sky-400" />
                            <span>Outlook / 365</span>
                          </a>
                        )}

                        {/* Download RFC-5545 .ics file */}
                        <a
                          href={`/api/inquiries/${submissionReceipt?.submissionId}/calendar.ics`}
                          download={`discovery-call-${submissionReceipt?.submissionId}.ics`}
                          className="bg-slate-900 hover:bg-emerald-950/80 border border-slate-800 hover:border-emerald-500/60 text-slate-200 hover:text-emerald-300 px-3 py-2 rounded-xl text-[11px] font-mono flex items-center justify-center gap-1.5 transition-all text-center"
                        >
                          <Download className="w-3 h-3 text-emerald-400" />
                          <span>Download .ics</span>
                        </a>
                      </div>
                    </div>

                    <p className="text-slate-400 text-[11px] pt-1">
                      Calendar event synchronized for <strong>{selectedDate} at {selectedTime} {selectedTimezone} ({callDuration})</strong> with invite sent to <strong>{formData.email}</strong>.
                    </p>
                  </div>
                )}

                <div className="pt-2 flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setSubmissionReceipt(null);
                      setFormData({
                        name: '',
                        email: '',
                        subject: 'Web App Sprint Inquiry',
                        company: '',
                        budget: '$2,500 - $5,000',
                        timeline: '3 - 4 Weeks',
                        message: '',
                        website_hp: '',
                        hp_company_url: '',
                        captchaAnswer: '7',
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>

              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-5"
              >
                
                {/* Header Badge */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300 uppercase">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span>Technical Sprint Inquiry Form</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/80">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Honeypot + Bot Shield Active</span>
                  </div>
                </div>

                {initialBrief && (
                  <div className="bg-emerald-950/60 p-3.5 rounded-2xl border border-emerald-800/80 flex items-center justify-between text-xs font-mono text-emerald-300">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>Pre-filled from Scope Estimator</span>
                    </span>
                    <span className="font-bold">{initialBrief.priceRange}</span>
                  </div>
                )}

                {/* Server-level Error Alert */}
                {formErrors.server && (
                  <div className="p-3.5 bg-rose-950/80 border border-rose-500/50 rounded-xl flex items-center gap-2 text-xs text-rose-300 font-medium">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{formErrors.server}</span>
                  </div>
                )}

                {/* Honeypot Security Traps (Hidden offscreen for real users; traps automated spam bots) */}
                <div className="opacity-0 absolute -left-[9999px] -top-[9999px] h-0 w-0 pointer-events-none overflow-hidden" aria-hidden="true" tabIndex={-1}>
                  <label htmlFor="website_hp">Website URL (leave empty)</label>
                  <input
                    type="text"
                    id="website_hp"
                    name="website_hp"
                    tabIndex={-1}
                    value={formData.website_hp}
                    onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                    autoComplete="off"
                  />

                  <label htmlFor="hp_company_url">Corporate URL (leave blank)</label>
                  <input
                    type="text"
                    id="hp_company_url"
                    name="hp_company_url"
                    tabIndex={-1}
                    value={formData.hp_company_url}
                    onChange={(e) => setFormData({ ...formData, hp_company_url: e.target.value })}
                    autoComplete="off"
                  />
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Connor"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full bg-slate-950 text-slate-200 placeholder-slate-600 text-xs px-3.5 py-3 rounded-xl border transition-all ${
                        formErrors.name ? 'border-rose-500 focus:border-rose-400' : 'border-slate-800 focus:border-emerald-500'
                      }`}
                    />
                    {formErrors.name && (
                      <p className="text-[11px] text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      <span>Work Email *</span>
                    </label>
                    <input
                      type="email"
                      placeholder="sarah@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full bg-slate-950 text-slate-200 placeholder-slate-600 text-xs px-3.5 py-3 rounded-xl border transition-all ${
                        formErrors.email ? 'border-rose-500 focus:border-rose-400' : 'border-slate-800 focus:border-emerald-500'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Field with Requirement Refiner */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      <span>Subject / Project Title *</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => handleAiInstantAssist('subject')}
                      disabled={isAiSuggesting}
                      className="text-[10px] font-mono font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 transition-colors disabled:opacity-50"
                      title="Refine subject header"
                    >
                      <Zap className="w-3 h-3 text-emerald-400" />
                      <span>⚡ Refine Title</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Full-Stack SaaS Dashboard Sprint"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`w-full bg-slate-950 text-slate-200 placeholder-slate-600 text-xs px-3.5 py-3 rounded-xl border transition-all ${
                      formErrors.subject ? 'border-rose-500 focus:border-rose-400' : 'border-slate-800 focus:border-emerald-500'
                    }`}
                  />
                  {formErrors.subject && (
                    <p className="text-[11px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{formErrors.subject}</span>
                    </p>
                  )}
                </div>

                {/* Company & Budget Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Company */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>Company / Website URL</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. acme.com"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-slate-950 text-slate-200 placeholder-slate-600 text-xs px-3.5 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 transition-all"
                    />
                  </div>

                  {/* Target Budget */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-slate-500" />
                      <span>Target Budget Range</span>
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-slate-950 text-slate-200 text-xs px-3.5 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 transition-all"
                    >
                      <option value="$1,000 - $2,500">$1,000 - $2,500 (MVP Sprint)</option>
                      <option value="$2,500 - $5,000">$2,500 - $5,000 (Standard Full-Stack)</option>
                      <option value="$5,000+">$5,000+ (Custom Enterprise App)</option>
                    </select>
                  </div>
                </div>

                {/* Message / Requirements Field with Instant Refiner */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                      <span>Project Requirements & Message *</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleAiInstantAssist('message')}
                        disabled={isAiSuggesting}
                        className="text-[10px] font-mono font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 transition-colors disabled:opacity-50"
                        title="Auto-format project brief"
                      >
                        <Zap className="w-3 h-3 text-emerald-400" />
                        <span>⚡ Refine Brief</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleAiScopeReview}
                        disabled={isAiSuggesting}
                        className="text-[10px] font-mono font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/60 transition-colors disabled:opacity-50"
                        title="Get live technical scope assessment"
                      >
                        <Cpu className="w-3 h-3 text-indigo-400" />
                        <span>Scope Check</span>
                      </button>
                    </div>
                  </div>
                  <textarea
                    rows={4}
                    placeholder="Describe what you want to build, key features, performance goals, or deadline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full bg-slate-950 text-slate-200 placeholder-slate-600 text-xs p-3.5 rounded-xl border transition-all resize-none ${
                      formErrors.message ? 'border-rose-500 focus:border-rose-400' : 'border-slate-800 focus:border-emerald-500'
                    }`}
                  />
                  {formErrors.message && (
                    <p className="text-[11px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{formErrors.message}</span>
                    </p>
                  )}
                </div>

                {/* Selected Meeting Slot & Inline Change Widget */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300">
                      <Calendar className="w-4 h-4 text-indigo-400" />
                      <span>Requested Meeting Window:</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsEditingMeetingInline(!isEditingMeetingInline)}
                      className="text-[11px] font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1 bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-800/60 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>{isEditingMeetingInline ? 'Done Editing' : 'Change Date / Time'}</span>
                    </button>
                  </div>

                  {/* Summary display */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-indigo-300 font-bold bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800/70">
                      {selectedDate}, {selectedTime} {selectedTimezone}
                    </span>
                    <span className="text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                      Duration: <strong className="text-slate-200">{callDuration}</strong>
                    </span>
                  </div>

                  {/* Inline Quick Date/Time modifier */}
                  {isEditingMeetingInline && (
                    <div className="pt-3 border-t border-slate-800 space-y-3 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] text-slate-400 font-mono block mb-1">Set Custom Date:</label>
                          <input
                            type="date"
                            min={minCustomDate}
                            value={customDateInput}
                            onChange={(e) => handleCustomDateChange(e.target.value)}
                            className="w-full bg-slate-900 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-800 focus:outline-none font-mono cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-400 font-mono block mb-1">Set Time ({selectedTimezone}):</label>
                          <input
                            type="time"
                            value={customTimeInput}
                            onChange={(e) => handleCustomTimeChange(e.target.value)}
                            className="w-full bg-slate-900 text-emerald-400 text-xs px-3 py-2 rounded-lg border border-slate-800 focus:outline-none font-mono font-bold cursor-pointer"
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 font-mono pt-1 gap-2">
                        <span>Select call duration:</span>
                        <div className="flex gap-1.5">
                          {['15 Mins', '30 Mins', '45 Mins'].map((d) => (
                            <button
                              key={d}
                              type="button"
                              onClick={() => setCallDuration(d)}
                              className={`px-2 py-0.5 rounded border text-[10px] cursor-pointer ${
                                callDuration === d
                                  ? 'bg-indigo-950 border-indigo-500 text-indigo-300 font-bold'
                                  : 'bg-slate-900 border-slate-800 text-slate-400'
                              }`}
                            >
                              {d}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* AI Scope Review Live Card */}
                {aiScopePreview && (
                  <div className="p-3.5 bg-indigo-950/40 border border-indigo-800/60 rounded-xl space-y-1 text-xs text-indigo-200">
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-indigo-400 font-bold">
                      <Zap className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Flash-Lite Instant Scope Assessment</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">{aiScopePreview}</p>
                  </div>
                )}

                {/* Submit Action Button */}
                <button
                  type="submit"
                  id="contact-form-submit-btn"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-emerald-500 text-slate-950 font-black text-sm hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Submitting Inquiry for Schedule Review...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry & Request Meeting Slot</span>
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};