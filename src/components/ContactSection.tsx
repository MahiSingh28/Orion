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
  ExternalLink,
  DollarSign
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
  const [isCalendarLoading, setIsCalendarLoading] = useState(true);
  const [calendarError, setCalendarError] = useState<string>('');
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
    let cancelled = false;

    const loadAvailableSlots = async () => {
      setIsCalendarLoading(true);
      setCalendarError('');

      try {
        const response = await fetch('/api/calendar/available-slots', {
          cache: 'no-store',
          headers: { Accept: 'application/json' },
        });

        const data = await response.json();

        if (!response.ok || !data.success || !Array.isArray(data.days)) {
          throw new Error(data?.message || `Calendar request failed: ${response.status}`);
        }

        const days: AvailableDay[] = data.days.filter(
          (day: AvailableDay) => day && day.isoDate && Array.isArray(day.slots)
        );

        if (cancelled) return;

        setAvailableSchedule(days);

        if (days.length > 0) {
          const firstDay = days[0];
          setSelectedDate(firstDay.isoDate);
          setSelectedTime(firstDay.slots?.[0] || '');
          setCustomDateInput(firstDay.isoDate);
        } else {
          setSelectedDate('');
          setSelectedTime('');
          setCalendarError('No appointment slots are currently available.');
        }
      } catch (error) {
        if (cancelled) return;
        console.error('Failed to load live calendar slots:', error);
        setAvailableSchedule([]);
        setSelectedDate('');
        setSelectedTime('');
        setCalendarError('Calendar availability could not be loaded. Please try again.');
      } finally {
        if (!cancelled) setIsCalendarLoading(false);
      }
    };

    loadAvailableSlots();

    return () => {
      cancelled = true;
    };
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'New Website or Web App Project',
    company: '',
    budget: '₹8,000 - ₹28,000',
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
        aiProposal: data.aiProposal || 'Initial project assessment ready. We’ll review the scope, timeline, and technical approach together.',
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
  const currentDaySlots = availableSchedule.find((d) => d.isoDate === selectedDate)?.slots || [];
  const minCustomDate = new Date().toISOString().split('T')[0];

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden bg-[#F8F5F0]">
      
      {/* Accent glow background */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#C97872]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C97872]/10 text-[#C97872] border border-[#C97872]/30 text-xs font-mono font-semibold">
            <Send className="w-3.5 h-3.5" />
            <span>START A PROJECT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1F1D1B] tracking-tight">
            Let's Build Your Website or Web App
          </h2>
          <p className="text-[#706B65] text-sm sm:text-base">
            Tell Us what you want to build, choose a convenient time, and We’ll get back to you with the next steps.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Info & Calendar Booking Selector */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="group bg-[#FFFCF8] rounded-2xl p-6 border border-[#DED5CC] space-y-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#C97872]/40">
              <div className="flex items-center justify-between border-b border-[#DED5CC] pb-4">
                <div>
                  <h3 className="font-bold text-[#1F1D1B] text-base">Talk Directly with Us</h3>
                  <p className="text-xs text-[#706B65]">Usually reply within 2 hours, Mon–Sat</p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-[#C97872] transition-transform duration-300 group-hover:scale-125" />
              </div>

              {/* Direct Email Card */}
              <div className="group/email p-4 bg-[#F8F5F0] rounded-2xl border border-[#DED5CC]/80 space-y-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C97872]/50">
                <span className="text-[10px] text-[#706B65] font-mono uppercase tracking-wider">Primary Email</span>
                <div className="flex items-center justify-between">
                  <span className="text-[#1F1D1B] font-mono text-sm font-semibold">startwithorion@gmail.com</span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg bg-[#FFFCF8] hover:bg-[#DED5CC] text-[#706B65] hover:text-[#1F1D1B] border border-[#DED5CC] text-xs flex items-center gap-1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C97872]/20"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#C97872]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="space-y-3 pt-2 text-xs text-[#706B65]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C97872] shrink-0" />
                  <span>Your project details stay private</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C97872] shrink-0" />
                  <span>You receive the complete source code</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C97872] shrink-0" />
                  <span>Regular previews so you can see progress</span>
                </div>
              </div>

              {/* Preferred Meeting Scheduler & Customizer */}
              <div className="pt-4 border-t border-[#DED5CC] space-y-4">
                
                {/* Header & Mode Switcher */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#706B65] uppercase font-mono flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#C97872]" />
                    <span>Preferred Meeting</span>
                  </span>
                  {/* Scheduling timezone — backend slots are served in IST */}
                   <div className="flex items-center gap-1.5 bg-[#F8F5F0] px-2.5 py-1.5 rounded-lg border border-[#DED5CC] text-[10px] font-mono text-[#706B65]">
                     <Globe className="w-3 h-3 text-[#C97872]" />
                     <span className="font-semibold text-[#1F1D1B]">IST</span>
                     <span>(UTC+5:30)</span>
                   </div>
                 </div>

                 <p className="text-[10px] text-[#9B857B] -mt-2">Available times are shown in India Standard Time.</p>

                 {/* Mode Selector: Suggested Times vs Custom Pick */}
                 <div className="grid grid-cols-2 p-1 bg-[#F8F5F0] rounded-xl border border-[#DED5CC] text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setScheduleMode('preset')}
                    className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      scheduleMode === 'preset'
                        ? 'bg-[#C97872] text-white font-bold shadow'
                        : 'text-[#706B65] hover:text-[#1F1D1B]'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Suggested Times</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setScheduleMode('custom')}
                    className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      scheduleMode === 'custom'
                        ? 'bg-[#C97872] text-white font-bold shadow'
                        : 'text-[#706B65] hover:text-[#1F1D1B]'
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Choose Date & Time</span>
                  </button>
                </div>

                {/* MODE 1: Preset Slots View */}
                {scheduleMode === 'preset' ? (
                  <div className="space-y-3">
                    {/* Live calendar state */}
                    {isCalendarLoading ? (
                      <div className="flex items-center justify-center gap-2 rounded-xl border border-[#DED5CC] bg-[#F8F5F0] px-4 py-5 text-xs font-mono text-[#706B65]">
                        <RefreshCw className="w-4 h-4 animate-spin text-[#C97872]" />
                        <span>Loading live availability…</span>
                      </div>
                    ) : calendarError ? (
                      <div className="rounded-xl border border-[#B76E6A]/30 bg-[#FFFCF8] px-4 py-4 text-xs text-[#B06A64]">
                        <div className="flex items-center gap-2 font-semibold">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{calendarError}</span>
                        </div>
                      </div>
                    ) : null}

                    {/* Day Selection Tabs */}
                    {!isCalendarLoading && !calendarError && availableSchedule.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      {availableSchedule.map((day) => (
                        <button
                          key={day.isoDate}
                          type="button"
                          onClick={() => {
                            setSelectedDate(day.isoDate);
                            setSelectedTime(day.slots[0] || '');
                          }}
                          className={`p-2 rounded-xl text-xs font-mono transition-all text-center border cursor-pointer ${
                            selectedDate === day.isoDate
                              ? 'bg-[#DED5CC] text-[#B06A64] border-[#C97872] font-bold shadow-sm'
                              : 'bg-[#F8F5F0]/60 text-[#706B65] border-[#DED5CC]/80 hover:text-[#1F1D1B]'
                          }`}
                        >
                          {day.date}
                        </button>
                      ))}
                    </div>
                    )}

                    {/* Time Slots Grid for Selected Day */}
                    <div>
                      <label className="text-[11px] text-[#706B65] font-mono block mb-2">Available times ({selectedTimezone}):</label>
                      <div className="grid grid-cols-2 gap-2">
                        {currentDaySlots.length === 0 ? (
                          <div className="col-span-2 rounded-xl border border-[#DED5CC] bg-[#F8F5F0] px-3 py-3 text-xs text-[#706B65]">
                            No available times for this date.
                          </div>
                        ) : currentDaySlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTime(slot)}
                            className={`p-2.5 rounded-xl text-xs font-mono transition-all flex items-center justify-between border cursor-pointer ${
                              selectedTime === slot
                                ? 'bg-[#FFFCF8] text-[#C97872] border-[#C97872] font-bold'
                                : 'bg-[#F8F5F0]/60 text-[#706B65] border-[#DED5CC]/80 hover:text-[#1F1D1B]'
                            }`}
                          >
                            <span>{slot}</span>
                            {selectedTime === slot && <Check className="w-3.5 h-3.5 text-[#C97872]" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* MODE 2: Choose Date & Time Picker */
                  <div className="space-y-3 p-3.5 bg-[#F8F5F0]/90 rounded-2xl border border-[#DED5CC]">
                    
                    {/* Custom Date Input */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] text-[#706B65] font-mono font-bold flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5 text-[#C97872]" />
                        <span>Choose a date:</span>
                      </label>
                      <input
                        type="date"
                        min={minCustomDate}
                        value={customDateInput}
                        onChange={(e) => handleCustomDateChange(e.target.value)}
                        className="w-full bg-[#FFFCF8] text-[#1F1D1B] text-xs px-3 py-2.5 rounded-xl border border-[#DED5CC] focus:outline-none focus:border-[#C97872] font-mono cursor-pointer"
                      />
                    </div>

                    {/* Custom Time Input & Quick Presets */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] text-[#706B65] font-mono font-bold flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#C97872]" />
                          <span>Choose a time ({selectedTimezone}):</span>
                        </label>
                        <input
                          type="time"
                          value={customTimeInput}
                          onChange={(e) => handleCustomTimeChange(e.target.value)}
                          className="bg-[#FFFCF8] text-[#C97872] text-xs px-2 py-1 rounded-lg border border-[#DED5CC] focus:outline-none font-mono font-bold cursor-pointer"
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
                                ? 'bg-[#FFFCF8] text-[#C97872] border-[#C97872] font-bold'
                                : 'bg-[#FFFCF8]/80 text-[#706B65] border-[#DED5CC] hover:text-[#1F1D1B]'
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
                  <label className="text-[11px] text-[#706B65] font-mono block">Call length:</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['15 Mins', '30 Mins', '45 Mins'].map((dur) => (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => setCallDuration(dur)}
                        className={`py-1.5 rounded-lg text-xs font-mono transition-all text-center border cursor-pointer ${
                          callDuration === dur
                            ? 'bg-[#DED5CC] text-[#B06A64] border-[#C97872] font-bold'
                            : 'bg-[#F8F5F0]/60 text-[#706B65] border-[#DED5CC] hover:text-[#1F1D1B]'
                        }`}
                      >
                        {dur}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Preference Live Badge */}
                <div className="p-3 bg-[#F8F5F0] rounded-xl border border-[#DED5CC]/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#706B65]">Your selected time:</span>
                  <span className="text-[#C97872] font-bold text-right">
                    {selectedDate}, {selectedTime} {selectedTimezone} ({callDuration})
                  </span>
                </div>

              </div>

              {/* Approval Notice Note */}
              <div className="p-3 bg-[#FFFCF8] border border-[#C97872]/30 rounded-xl flex items-center gap-2.5 text-xs text-[#B06A64]">
                <Clock className="w-4 h-4 text-[#C97872] shrink-0" />
                <span>Your requested time is held for review. I’ll confirm it before sending the calendar invite.</span>
              </div>

            </div>

          </div>

          {/* Right Column: Project Inquiry Form or Pending Confirmation Receipt */}
          <div className="lg:col-span-7">
            
            {submitted ? (
              <div className="bg-[#FFFCF8] rounded-2xl p-8 border border-[#C97872]/40 shadow-lg space-y-6 transition-all duration-300 hover:shadow-xl">
                
                {/* Header Status Badge */}
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#C97872]/10 text-[#C97872] border border-[#C97872]/40 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-[#1F1D1B]">Project Details Received</h3>
                    <p className="text-xs sm:text-sm text-[#706B65]">
                      Thanks, <strong className="text-[#C97872]">{formData.name}</strong>. Wereceived your project details.
                    </p>
                  </div>

                  {/* Status Indicator */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-[#9A7650] border border-amber-500/30 text-xs font-mono font-bold">
                    <Clock className="w-3.5 h-3.5 text-[#9A7650]" />
                    <span>
                      {submissionReceipt?.status === 'pending_approval' 
                        ? 'STATUS: AWAITING CONFIRMATION' 
                        : 'STATUS: CONFIRMED'}
                    </span>
                  </div>
                </div>

                {/* Requested Call Slot & Details Summary */}
                <div className="bg-[#F8F5F0] p-5 rounded-2xl border border-[#DED5CC] space-y-3 text-xs font-mono text-[#706B65]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#DED5CC] pb-3 gap-2">
                    <span className="text-[#706B65]">Requested call:</span>
                    <span className="text-[#B06A64] font-bold text-sm bg-[#DED5CC] px-2.5 py-1 rounded border border-[#DED5CC]">
                      {selectedDate} at {selectedTime} {selectedTimezone} ({callDuration})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <div className="flex justify-between">
                      <span className="text-[#706B65]">Budget:</span>
                      <span className="text-[#1F1D1B] font-semibold">{formData.budget}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#706B65]">Timeline:</span>
                      <span className="text-[#1F1D1B] font-semibold">{formData.timeline}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between border-t border-[#DED5CC] pt-2 gap-1">
                    <span className="text-[#706B65]">Email:</span>
                    <span className="text-[#1F1D1B]">{formData.email}</span>
                  </div>
                </div>

                {/* Informative Explanation */}
                <div className="p-4 bg-[#F8F5F0]/80 rounded-2xl border border-[#DED5CC] text-xs text-[#706B65] space-y-2 leading-relaxed text-left">
                  <p className="text-[#1F1D1B] font-semibold">What happens next?</p>
                  <p>
                    1. <strong>Time review</strong>: We review your requested slot (<span className="text-[#C97872] font-mono">{selectedDate} at {selectedTime} {selectedTimezone}</span>) against the live calendar.
                  </p>
                  <p>
                    2. <strong>Calendar invite</strong>: Once confirmed, an official Google Calendar invite with a Google Meet video link will be sent directly to <strong className="text-[#1F1D1B]">{formData.email}</strong>.
                  </p>
                  <p>
                    3. <strong>Project plan</strong>: A preliminary architecture sprint plan will be attached for review before the call.
                  </p>
                </div>

                {/* Instant Server AI Proposal Breakdown */}
                {submissionReceipt && (
                  <div className="bg-[#F8F5F0] p-5 rounded-2xl border border-[#DED5CC] text-left space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-[#C97872] border-b border-[#DED5CC] pb-2">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Cpu className="w-4 h-4" />
                        INITIAL PROJECT ASSESSMENT
                      </span>
                      <span className="text-[#706B65]">ID: {submissionReceipt.submissionId}</span>
                    </div>
                    <p className="text-xs text-[#706B65] leading-relaxed font-sans">
                      {submissionReceipt.aiProposal}
                    </p>
                  </div>
                )}

                {/* Confirmed Call View - shown only after real developer approval */}
                {submissionReceipt?.status === 'confirmed' && (
                  <div className="p-5 bg-[#FFFCF8] border border-[#C97872]/50 rounded-2xl space-y-4 text-left text-xs">
                    <div className="flex items-center justify-between border-b border-[#DED5CC] pb-3">
                      <div className="flex items-center gap-2 text-[#C97872] font-bold font-mono">
                        <Video className="w-4 h-4" />
                        <span>Your Google Meet is ready</span>
                      </div>
                      <span className="text-[11px] font-mono text-[#C97872] bg-[#DED5CC] px-2 py-0.5 rounded border border-emerald-700/60">
                        CONFIRMED
                      </span>
                    </div>

                    {/* Google Meet Action Button */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <a
                        href={submissionReceipt?.meetLink || 'https://meet.google.com/new'}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 bg-[#C97872] hover:bg-[#B06A64] text-white font-bold px-4 py-3 rounded-xl text-center flex items-center justify-center gap-2 text-xs transition-all shadow-lg shadow-[#C97872]/20"
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
                        className="px-3.5 py-3 bg-[#FFFCF8] hover:bg-[#DED5CC] border border-[#DED5CC] text-[#1F1D1B] rounded-xl text-xs font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        title="Copy Meet Link"
                      >
                        {copiedMeetLink ? <Check className="w-3.5 h-3.5 text-[#C97872]" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedMeetLink ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    {/* Calendar Synchronization Row */}
                    <div className="pt-2 space-y-2">
                      <p className="text-[11px] font-mono font-bold text-[#706B65] flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#C97872]" />
                        <span>Add to your calendar:</span>
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {/* 1-Click Google Calendar */}
                        {submissionReceipt?.googleCalendarUrl && (
                          <a
                            href={submissionReceipt.googleCalendarUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#FFFCF8] hover:bg-[#DED5CC] border border-[#DED5CC] hover:border-[#C97872]/60 text-[#1F1D1B] hover:text-[#B06A64] px-3 py-2 rounded-xl text-[11px] font-mono flex items-center justify-center gap-1.5 transition-all text-center"
                          >
                            <Calendar className="w-3 h-3 text-[#C97872]" />
                            <span>Google Calendar</span>
                          </a>
                        )}

                        {/* 1-Click Outlook */}
                        {submissionReceipt?.outlookCalendarUrl && (
                          <a
                            href={submissionReceipt.outlookCalendarUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#FFFCF8] hover:bg-[#FFFCF8] border border-[#DED5CC] hover:border-[#C97872]/50 text-[#1F1D1B] hover:text-[#706B65] px-3 py-2 rounded-xl text-[11px] font-mono flex items-center justify-center gap-1.5 transition-all text-center"
                          >
                            <CalendarDays className="w-3 h-3 text-[#C97872]" />
                            <span>Outlook / 365</span>
                          </a>
                        )}

                        {/* Download RFC-5545 .ics file */}
                        <a
                          href={`/api/inquiries/${submissionReceipt?.submissionId}/calendar.ics`}
                          download={`discovery-call-${submissionReceipt?.submissionId}.ics`}
                          className="bg-[#FFFCF8] hover:bg-[#FFFCF8] border border-[#DED5CC] hover:border-[#C97872]/60 text-[#1F1D1B] hover:text-[#C97872] px-3 py-2 rounded-xl text-[11px] font-mono flex items-center justify-center gap-1.5 transition-all text-center"
                        >
                          <Download className="w-3 h-3 text-[#C97872]" />
                          <span>Download .ics</span>
                        </a>
                      </div>
                    </div>

                    <p className="text-[#706B65] text-[11px] pt-1">
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
                        subject: 'New Website or Web App Project',
                        company: '',
                        budget: '₹8,000 - ₹28,000',
                        timeline: '3 - 4 Weeks',
                        message: '',
                        website_hp: '',
                        hp_company_url: '',
                        captchaAnswer: '7',
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#DED5CC] text-[#1F1D1B] text-xs font-bold hover:bg-[#DED5CC] transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>

              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="group/form bg-[#FFFCF8] rounded-2xl p-6 sm:p-8 border border-[#DED5CC] shadow-lg space-y-5 transition-all duration-300 hover:border-[#C97872]/35 hover:shadow-xl"
              >
                
                {/* Header Badge */}
                <div className="flex items-center justify-between border-b border-[#DED5CC] pb-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#706B65] uppercase">
                    <FileText className="w-4 h-4 text-[#C97872]" />
                    <span>Tell Us About Your Project</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#C97872] bg-[#FFFCF8] px-2.5 py-1 rounded-full border border-[#DED5CC]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C97872]" />
                    <span>Secure inquiry form</span>
                  </div>
                </div>

                {initialBrief && (
                  <div className="bg-[#FFFCF8] p-3.5 rounded-2xl border border-[#DED5CC] flex items-center justify-between text-xs font-mono text-[#C97872]">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#C97872]" />
                      <span>Details added from the project estimator</span>
                    </span>
                    <span className="font-bold">{initialBrief.priceRange}</span>
                  </div>
                )}

                {/* Server-level Error Alert */}
                {formErrors.server && (
                  <div className="p-3.5 bg-[#FFFCF8] border border-[#B76E6A]/50 rounded-xl flex items-center gap-2 text-xs text-[#C97872] font-medium">
                    <AlertCircle className="w-4 h-4 text-[#C97872] shrink-0" />
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
                    <label className="text-xs font-mono font-bold text-[#706B65] flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#706B65]" />
                      <span>Your Name *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Connor"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full bg-[#F8F5F0] text-[#1F1D1B] placeholder-[#9B857B] text-xs px-3.5 py-3 rounded-xl border transition-all ${
                        formErrors.name ? 'border-[#B76E6A] focus:border-[#C97872]' : 'border-[#DED5CC] focus:border-[#C97872]'
                      }`}
                    />
                    {formErrors.name && (
                      <p className="text-[11px] text-[#C97872] flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-[#706B65] flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#706B65]" />
                      <span>Your Email *</span>
                    </label>
                    <input
                      type="email"
                      placeholder="sarah@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full bg-[#F8F5F0] text-[#1F1D1B] placeholder-[#9B857B] text-xs px-3.5 py-3 rounded-xl border transition-all ${
                        formErrors.email ? 'border-[#B76E6A] focus:border-[#C97872]' : 'border-[#DED5CC] focus:border-[#C97872]'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-[#C97872] flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Field with Requirement Refiner */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono font-bold text-[#706B65] flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#706B65]" />
                      <span>What are you building? *</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => handleAiInstantAssist('subject')}
                      disabled={isAiSuggesting}
                      className="text-[10px] font-mono font-semibold text-[#C97872] hover:text-[#C97872] flex items-center gap-1 bg-[#FFFCF8] px-2 py-0.5 rounded border border-[#DED5CC] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C97872]/50 hover:shadow-sm disabled:opacity-50"
                      title="Refine subject header"
                    >
                      <Zap className="w-3 h-3 text-[#C97872]" />
                      <span>Help me phrase this</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Restaurant Website, Online Store, Booking App"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`w-full bg-[#F8F5F0] text-[#1F1D1B] placeholder-[#9B857B] text-xs px-3.5 py-3 rounded-xl border transition-all ${
                      formErrors.subject ? 'border-[#B76E6A] focus:border-[#C97872]' : 'border-[#DED5CC] focus:border-[#C97872]'
                    }`}
                  />
                  {formErrors.subject && (
                    <p className="text-[11px] text-[#C97872] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{formErrors.subject}</span>
                    </p>
                  )}
                </div>

                {/* Company & Budget Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Company */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-[#706B65] flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#706B65]" />
                      <span>Business / Website (optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. acme.com"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-[#F8F5F0] text-[#1F1D1B] placeholder-[#9B857B] text-xs px-3.5 py-3 rounded-xl border border-[#DED5CC] focus:outline-none focus:border-[#C97872] focus:ring-2 focus:ring-[#C97872]/10 transition-all hover:border-[#C97872]/40"
                    />
                  </div>

                  {/* Target Budget */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-[#706B65] flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-[#706B65]" />
                      <span>Approximate Budget</span>
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#F8F5F0] text-[#1F1D1B] text-xs px-3.5 py-3 rounded-xl border border-[#DED5CC] focus:outline-none focus:border-[#C97872] focus:ring-2 focus:ring-[#C97872]/10 transition-all hover:border-[#C97872]/40"
                    >
                      <option value="₹8,000 - ₹15,000">₹8,000 - ₹15,000 (Landing / Small Website)</option>
                      <option value="₹15,000 - ₹28,000">₹15,000 - ₹28,000 (Full Website / MVP)</option>
                      <option value="₹28,000+">₹28,000+ (Custom Web App)</option>
                    </select>
                  </div>
                </div>

                {/* Message / Requirements Field with Instant Refiner */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono font-bold text-[#706B65] flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#706B65]" />
                      <span>Tell Us About the project *</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleAiInstantAssist('message')}
                        disabled={isAiSuggesting}
                        className="text-[10px] font-mono font-semibold text-[#C97872] hover:text-[#C97872] flex items-center gap-1 bg-[#FFFCF8] px-2 py-0.5 rounded border border-[#DED5CC] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C97872]/50 hover:shadow-sm disabled:opacity-50"
                        title="Auto-format project brief"
                      >
                        <Zap className="w-3 h-3 text-[#C97872]" />
                        <span>Improve Our description</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleAiScopeReview}
                        disabled={isAiSuggesting}
                        className="text-[10px] font-mono font-semibold text-[#C97872] hover:text-[#B06A64] flex items-center gap-1 bg-[#DED5CC] px-2 py-0.5 rounded border border-[#DED5CC] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C97872]/50 hover:shadow-sm disabled:opacity-50"
                        title="Get live technical scope assessment"
                      >
                        <Cpu className="w-3 h-3 text-[#C97872]" />
                        <span>Quick scope check</span>
                      </button>
                    </div>
                  </div>
                  <textarea
                    rows={4}
                    placeholder="Tell Us what you want to build, what it should do, and any deadline or budget you have..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full bg-[#F8F5F0] text-[#1F1D1B] placeholder-[#9B857B] text-xs p-3.5 rounded-xl border transition-all resize-none ${
                      formErrors.message ? 'border-[#B76E6A] focus:border-[#C97872]' : 'border-[#DED5CC] focus:border-[#C97872]'
                    }`}
                  />
                  {formErrors.message && (
                    <p className="text-[11px] text-[#C97872] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{formErrors.message}</span>
                    </p>
                  )}
                </div>

                {/* Selected Meeting Slot & Inline Change Widget */}
                <div className="p-4 bg-[#F8F5F0] rounded-2xl border border-[#DED5CC] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#706B65]">
                      <Calendar className="w-4 h-4 text-[#C97872]" />
                      <span>Requested Preferred Meeting:</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsEditingMeetingInline(!isEditingMeetingInline)}
                      className="text-[11px] font-mono text-[#C97872] hover:text-[#B06A64] flex items-center gap-1 bg-[#DED5CC] px-2.5 py-1 rounded-lg border border-[#DED5CC] transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>{isEditingMeetingInline ? 'Done' : 'Change date / time'}</span>
                    </button>
                  </div>

                  {/* Summary display */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-[#B06A64] font-bold bg-[#DED5CC] px-3 py-1 rounded-lg border border-[#DED5CC]">
                      {selectedDate.includes('-')
                        ? (availableSchedule.find((d) => d.isoDate === selectedDate)?.date || selectedDate)
                        : selectedDate}, {selectedTime} {selectedTimezone}
                    </span>
                    <span className="text-[#706B65] bg-[#FFFCF8] px-2.5 py-1 rounded-lg border border-[#DED5CC]">
                      Duration: <strong className="text-[#1F1D1B]">{callDuration}</strong>
                    </span>
                  </div>

                  {/* Inline Quick Date/Time modifier */}
                  {isEditingMeetingInline && (
                    <div className="pt-3 border-t border-[#DED5CC] space-y-3 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] text-[#706B65] font-mono block mb-1">Set Custom Date:</label>
                          <input
                            type="date"
                            min={minCustomDate}
                            value={customDateInput}
                            onChange={(e) => handleCustomDateChange(e.target.value)}
                            className="w-full bg-[#FFFCF8] text-[#1F1D1B] text-xs px-3 py-2 rounded-lg border border-[#DED5CC] focus:outline-none font-mono cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-[#706B65] font-mono block mb-1">Set Time ({selectedTimezone}):</label>
                          <input
                            type="time"
                            value={customTimeInput}
                            onChange={(e) => handleCustomTimeChange(e.target.value)}
                            className="w-full bg-[#FFFCF8] text-[#C97872] text-xs px-3 py-2 rounded-lg border border-[#DED5CC] focus:outline-none font-mono font-bold cursor-pointer"
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center justify-between text-[11px] text-[#706B65] font-mono pt-1 gap-2">
                        <span>Select call duration:</span>
                        <div className="flex gap-1.5">
                          {['15 Mins', '30 Mins', '45 Mins'].map((d) => (
                            <button
                              key={d}
                              type="button"
                              onClick={() => setCallDuration(d)}
                              className={`px-2 py-0.5 rounded border text-[10px] cursor-pointer ${
                                callDuration === d
                                  ? 'bg-[#1F1D1B] border-[#C97872] text-[#B06A64] font-bold'
                                  : 'bg-[#FFFCF8] border-[#DED5CC] text-[#706B65]'
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
                  <div className="p-3.5 bg-[#FFFCF8] border border-[#DED5CC] rounded-xl space-y-1 text-xs text-[#706B65]">
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#C97872] font-bold">
                      <Zap className="w-3.5 h-3.5 text-[#C97872]" />
                      <span>Quick project assessment</span>
                    </div>
                    <p className="text-[#706B65] text-xs leading-relaxed">{aiScopePreview}</p>
                  </div>
                )}

                {/* Submit Action Button */}
                <button
                  type="submit"
                  id="contact-form-submit-btn"
                  disabled={isSubmitting}
                  className="group/submit relative overflow-hidden w-full py-4 rounded-2xl bg-[#C97872] text-white font-black text-sm hover:bg-[#B06A64] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#C97872]/20 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                >
                  <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/15 transition-transform duration-700 group-hover/submit:translate-x-[430%]" />
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-[#1F1D1B]" />
                      <span>Submitting Inquiry for Time review...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Project Details & Request a Call</span>
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