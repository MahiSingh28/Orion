import React, { useState } from 'react';
import { 
  ArrowRight, 
  Gauge, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Code2, 
  Cpu, 
  Clock, 
  TrendingUp,
  FileCode,
  Terminal,
  ExternalLink
} from 'lucide-react';

interface HeroProps {
  onExploreWorks: () => void;
  onOpenEstimator: () => void;
  onOpenContact: () => void;
}
export const Hero: React.FC<HeroProps> = ({
  onExploreWorks,
  onOpenEstimator,
  onOpenContact,
}) => {
  const [copied, setCopied] = useState(false);
  const email = 'startwithorion@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="hero" className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-[#DED5CC]/60">
      {/* Background ambient lighting accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#C97872]/8 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-[#C97872]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Prop & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status & Credibility Pill */}
            <div className="group inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFCF8]/90 border border-[#DED5CC] text-xs font-mono transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C97872]/40 hover:shadow-[0_8px_24px_rgba(201,120,114,0.10)]">
              <span className="flex items-center gap-1.5 text-[#C97872] font-semibold">
                
                Orion • Web Developer
              </span>
              <span className="text-[#706B65]">|</span>
              <span className="text-[#706B65]">Bengaluru, India 🇮🇳</span>
              <span className="text-[#706B65]">|</span>
              <span className="text-[#C97872] font-medium">Fast, search-friendly websites</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1F1D1B] tracking-tight leading-[1.1]">
              Websites & Web Apps <br className="hidden sm:inline" />
              <span className="text-[#C97872]">
                Built to Work for Your Business.
              </span>
            </h1>

            {/* Tech Stack Badges Bar */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs font-mono text-[#706B65] mr-1 font-semibold">we work with:</span>
              {['React', 'TypeScript', 'Node.js', 'Tailwind', 'JavaScript', 'SEO'].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded bg-[#FFFCF8] border border-[#DED5CC] text-[11px] font-mono font-medium text-[#C97872]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#706B65] max-w-2xl leading-relaxed">
              We design and build fast, modern websites and web apps — from business websites and online stores to custom tools and dashboards. We handle the design, development, and launch.
            </p>

            {/* Key Value Guarantee Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="group flex items-center gap-2 text-xs sm:text-sm text-[#706B65] bg-[#FFFCF8]/40 p-2.5 rounded-xl border border-[#DED5CC]/80 transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFFCF8] hover:border-[#C97872]/35 hover:shadow-[0_10px_24px_rgba(201,120,114,0.10)]">
                <CheckCircle2 className="w-4 h-4 text-[#C97872] shrink-0" />
                <span><strong>Responsive</strong> websites that work beautifully on phones and computers</span>
              </div>
              <div className="group flex items-center gap-2 text-xs sm:text-sm text-[#706B65] bg-[#FFFCF8]/40 p-2.5 rounded-xl border border-[#DED5CC]/80 transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFFCF8] hover:border-[#C97872]/35 hover:shadow-[0_10px_24px_rgba(201,120,114,0.10)]">
                <ShieldCheck className="w-4 h-4 text-[#C97872] shrink-0" />
                <span><strong>Custom web apps</strong> built around how your business actually works</span>
              </div>
              <div className="group flex items-center gap-2 text-xs sm:text-sm text-[#706B65] bg-[#FFFCF8]/40 p-2.5 rounded-xl border border-[#DED5CC]/80 transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFFCF8] hover:border-[#C97872]/35 hover:shadow-[0_10px_24px_rgba(201,120,114,0.10)]">
                <Clock className="w-4 h-4 text-[#B76E6A] shrink-0" />
                <span><strong>Fast & search-friendly</strong> pages that are built for a better Google experience</span>
              </div>
              <div className="group flex items-center gap-2 text-xs sm:text-sm text-[#706B65] bg-[#FFFCF8]/40 p-2.5 rounded-xl border border-[#DED5CC]/80 transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFFCF8] hover:border-[#C97872]/35 hover:shadow-[0_10px_24px_rgba(201,120,114,0.10)]">
                <Zap className="w-4 h-4 text-[#9A7650] shrink-0" />
                <span><strong>Regular previews</strong> so you can see and review the work as it develops</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                id="hero-explore-works-btn"
                onClick={onExploreWorks}
                className="group relative overflow-hidden px-6 py-3.5 rounded-xl font-bold text-sm bg-[#C97872] text-white hover:bg-[#B06A64] transition-all duration-300 shadow-md shadow-[#C97872]/15 flex items-center gap-2 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(201,120,114,0.22)] active:translate-y-0"
              >
                <span>See Our Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-estimator-btn"
                onClick={onOpenEstimator}
                className="group px-5 py-3.5 rounded-xl font-semibold text-sm bg-[#FFFCF8] text-[#6F5B52] hover:text-white hover:bg-[#B06A64] border border-[#DED5CC]/80 hover:border-[#B06A64] transition-all duration-300 flex items-center gap-2 hover:-translate-y-1 hover:shadow-[0_12px_26px_rgba(176,106,100,0.16)]"
              >
                <Cpu className="w-4 h-4 text-[#C97872] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
                <span>Get a Project Estimate</span>
              </button>

              {/* Email Copy Pill */}
              <button
                id="hero-copy-email-btn"
                onClick={handleCopyEmail}
                className="group px-4 py-3 rounded-xl font-mono text-xs bg-[#F8F5F0] text-[#706B65] hover:text-[#1F1D1B] border border-[#DED5CC] transition-all duration-300 flex items-center gap-2 hover:-translate-y-1 hover:border-[#C97872]/40 hover:shadow-[0_10px_24px_rgba(201,120,114,0.10)]"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#C97872]" />
                    <span className="text-[#C97872] font-sans font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#706B65]" />
                    <span>{email}</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Proof Stats Bar */}
            <div className="pt-6 border-t border-[#DED5CC]/80 grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#1F1D1B] font-mono tracking-tight">15+</p>
                <p className="text-xs text-[#706B65] mt-0.5">Projects & builds</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#C97872] font-mono tracking-tight">Fast</p>
                <p className="text-xs text-[#706B65] mt-0.5">Performance-focused</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#C97872] font-mono tracking-tight">100%</p>
                <p className="text-xs text-[#706B65] mt-0.5">Attention to detail</p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Developer Terminal / Performance Badge Widget */}
          <div className="lg:col-span-5">
            <div className="group/terminal bg-[#FFFCF8] rounded-2xl border border-[#DED5CC] shadow-lg overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(31,29,27,0.10)] hover:border-[#C97872]/30">
              
              {/* Terminal Header */}
              <div className="bg-[#F8F5F0] px-4 py-3 border-b border-[#DED5CC]/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#D8B2B2]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#C9A77D]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#C97872]/80" />
                  <span className="ml-2 font-mono text-xs text-[#706B65]">orion-developer.ts</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-[#C97872] bg-[#DED5CC]/60 px-2 py-0.5 rounded border border-[#DED5CC]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C97872] animate-ping" />
                  DEVELOPER PROFILE
                </div>
              </div>

              {/* Lighthouse Speed Guarantees */}
              <div className="p-5 space-y-5">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#706B65] mb-2">
                    <span>How We build</span>
                    <span className="text-[#C97872] font-semibold">Performance-first</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="group/feature bg-[#F8F5F0] p-3 rounded-xl border border-[#DED5CC] transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFFCF8] hover:border-[#C97872]/35 hover:shadow-[0_8px_18px_rgba(201,120,114,0.08)]">
                      <p className="text-[11px] font-semibold text-[#1F1D1B]">Fast</p>
                      <p className="text-[10px] text-[#706B65] mt-1">Lightweight, responsive builds</p>
                    </div>
                    <div className="group/feature bg-[#F8F5F0] p-3 rounded-xl border border-[#DED5CC] transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFFCF8] hover:border-[#C97872]/35 hover:shadow-[0_8px_18px_rgba(201,120,114,0.08)]">
                      <p className="text-[11px] font-semibold text-[#1F1D1B]">Search-friendly</p>
                      <p className="text-[10px] text-[#706B65] mt-1">SEO considered from the start</p>
                    </div>
                    <div className="group/feature bg-[#F8F5F0] p-3 rounded-xl border border-[#DED5CC] transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFFCF8] hover:border-[#C97872]/35 hover:shadow-[0_8px_18px_rgba(201,120,114,0.08)]">
                      <p className="text-[11px] font-semibold text-[#1F1D1B]">Responsive</p>
                      <p className="text-[10px] text-[#706B65] mt-1">Designed for every screen</p>
                    </div>
                    <div className="group/feature bg-[#F8F5F0] p-3 rounded-xl border border-[#DED5CC] transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFFCF8] hover:border-[#C97872]/35 hover:shadow-[0_8px_18px_rgba(201,120,114,0.08)]">
                      <p className="text-[11px] font-semibold text-[#1F1D1B]">Maintainable</p>
                      <p className="text-[10px] text-[#706B65] mt-1">Clean code you can build on</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F8F5F0] rounded-xl p-3.5 border border-[#DED5CC] font-mono text-xs text-[#706B65] space-y-1.5 overflow-x-auto">
                  <div className="text-[#706B65]">// What you can expect</div>
                  <div>
                    <span className="text-[#C97872]">const</span> <span className="text-[#B76E6A]">freelanceDeveloper</span> = {'{'}
                  </div>
                  <div className="pl-4 text-[#706B65]">
                    name: <span className="text-[#C97872]">'Orion'</span>,
                  </div>
                  <div className="pl-4 text-[#706B65]">
                    stack: [<span className="text-[#9A7650]">'React'</span>, <span className="text-[#9A7650]">'TypeScript'</span>, <span className="text-[#9A7650]">'Tailwind'</span>],
                  </div>
                  <div className="pl-4 text-[#706B65]">
                    performance: <span className="text-[#C97872]">'Fast by design'</span>,
                  </div>
                  <div className="pl-4 text-[#706B65]">
                    approach: <span className="text-[#C97872]">'Clean, maintainable code'</span>,
                  </div>
                  <div className="pl-4 text-[#706B65]">
                    delivery: <span className="text-[#C97872]">'Clear milestones & communication'</span>
                  </div>
                  <div>{'};'}</div>
                </div>

                {/* Mini Quick Feature Highlights */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs text-[#706B65] bg-[#F8F5F0]/60 px-3 py-2 rounded-lg border border-[#DED5CC]/60">
                    <span className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-[#C97872]" />
                      <span>Clean, maintainable code</span>
                    </span>
                    <span className="text-[#C97872] font-mono font-medium">Included</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#706B65] bg-[#F8F5F0]/60 px-3 py-2 rounded-lg border border-[#DED5CC]/60">
                    <span className="flex items-center gap-2">
                      <Gauge className="w-3.5 h-3.5 text-[#C97872]" />
                      <span>Works across phones & desktops</span>
                    </span>
                    <span className="text-[#C97872] font-mono font-medium">Included</span>
                  </div>
                </div>

                {/* Direct Action */}
                <button
                  onClick={onOpenContact}
                  className="group w-full py-3 rounded-xl font-bold text-xs bg-[#DED5CC] hover:bg-[#1F1D1B] hover:text-[#F8F5F0] text-[#1F1D1B] border border-[#DED5CC]/80 transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(31,29,27,0.12)]"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#C97872] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span>Tell UsAbout Your Project</span>
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
