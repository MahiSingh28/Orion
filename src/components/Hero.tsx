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
    <section id="hero" className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-slate-800/60">
      {/* Background ambient lighting accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Prop & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status & Credibility Pill */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Orion • Freelance Full-Stack Developer
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300">Bengaluru, India 🇮🇳</span>
              <span className="text-slate-600">|</span>
              <span className="text-indigo-400 font-medium">100/100 Lighthouse SEO & Speed</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-100 tracking-tight leading-[1.1]">
              High-Performance <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                Web Apps & SEO Platforms
              </span> <br className="hidden sm:inline" />
              Built for Growth.
            </h1>

            {/* Tech Stack Badges Bar */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs font-mono text-slate-400 mr-1 font-semibold">Tech Stack:</span>
              {['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'React', 'Tailwind CSS', 'SEO', 'TypeScript'].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono font-medium text-emerald-400"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              I build custom React, Node.js, and TypeScript web applications with clean HTML/CSS architecture, Tailwind styling, and top-tier SEO optimizations that load under <strong className="text-emerald-400 font-semibold">0.8 seconds</strong>.
            </p>

            {/* Key Value Guarantee Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>HTML5 / CSS3 / Tailwind CSS</strong> Layouts</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/80">
                <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                <span><strong>Node.js + React + TypeScript</strong> Stack</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/80">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span><strong>Core Web Vitals & Technical SEO</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/80">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Interactive Sandbox Demos</strong></span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                id="hero-explore-works-btn"
                onClick={onExploreWorks}
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 hover:translate-x-0.5 active:translate-x-0"
              >
                <span>View Selected Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-estimator-btn"
                onClick={onOpenEstimator}
                className="px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-900 text-slate-200 hover:text-white border border-slate-700/80 hover:border-slate-600 transition-all flex items-center gap-2"
              >
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span>Calculate Scope & Cost</span>
              </button>

              {/* Email Copy Pill */}
              <button
                id="hero-copy-email-btn"
                onClick={handleCopyEmail}
                className="px-4 py-3 rounded-xl font-mono text-xs bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800 transition-all flex items-center gap-2"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-sans font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>{email}</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Proof Stats Bar */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-slate-100 font-mono tracking-tight">15+</p>
                <p className="text-xs text-slate-400 mt-0.5">Demo & Internship Builds</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight">100/100</p>
                <p className="text-xs text-slate-400 mt-0.5">Core Web Vitals Target</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-indigo-400 font-mono tracking-tight">100%</p>
                <p className="text-xs text-slate-400 mt-0.5">Code Dedication</p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Developer Terminal / Performance Badge Widget */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
              
              {/* Terminal Header */}
              <div className="bg-slate-950 px-4 py-3 border-b border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-xs text-slate-400">developer-profile.ts</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  LIVE BENCHMARK
                </div>
              </div>

              {/* Lighthouse Speed Guarantees */}
              <div className="p-5 space-y-5">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                    <span>Google Lighthouse Audit Target</span>
                    <span className="text-emerald-400 font-bold">100 / 100 PASS</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
                      <div className="w-9 h-9 mx-auto rounded-full border-2 border-emerald-400 flex items-center justify-center text-emerald-400 font-bold font-mono text-xs mb-1">
                        100
                      </div>
                      <span className="text-[10px] text-slate-400 block font-medium">Performance</span>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
                      <div className="w-9 h-9 mx-auto rounded-full border-2 border-emerald-400 flex items-center justify-center text-emerald-400 font-bold font-mono text-xs mb-1">
                        100
                      </div>
                      <span className="text-[10px] text-slate-400 block font-medium">Accessibility</span>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
                      <div className="w-9 h-9 mx-auto rounded-full border-2 border-emerald-400 flex items-center justify-center text-emerald-400 font-bold font-mono text-xs mb-1">
                        100
                      </div>
                      <span className="text-[10px] text-slate-400 block font-medium">Best Practices</span>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
                      <div className="w-9 h-9 mx-auto rounded-full border-2 border-emerald-400 flex items-center justify-center text-emerald-400 font-bold font-mono text-xs mb-1">
                        100
                      </div>
                      <span className="text-[10px] text-slate-400 block font-medium">SEO Score</span>
                    </div>
                  </div>
                </div>

                {/* Code Snippet */}
                <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5 overflow-x-auto">
                  <div className="text-slate-500">// Client Engineering Contract Specification</div>
                  <div>
                    <span className="text-indigo-400">const</span> <span className="text-teal-300">freelanceDeveloper</span> = {'{'}
                  </div>
                  <div className="pl-4 text-slate-300">
                    name: <span className="text-emerald-300">'Orion'</span>,
                  </div>
                  <div className="pl-4 text-slate-300">
                    coreStack: [<span className="text-amber-300">'React 19'</span>, <span className="text-amber-300">'TypeScript'</span>, <span className="text-amber-300">'Tailwind'</span>],
                  </div>
                  <div className="pl-4 text-slate-300">
                    maxLCP: <span className="text-indigo-300">'0.65s'</span>,
                  </div>
                  <div className="pl-4 text-slate-300">
                    codeQuality: <span className="text-emerald-300">'100% Type-Safe / Non-AI Slop'</span>,
                  </div>
                  <div className="pl-4 text-slate-300">
                    guarantee: <span className="text-emerald-300">'On-Time Delivery or 20% Rebate'</span>
                  </div>
                  <div>{'};'}</div>
                </div>

                {/* Mini Quick Feature Highlights */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs text-slate-300 bg-slate-950/60 px-3 py-2 rounded-lg border border-slate-800/60">
                    <span className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Clean Architecture & Modular Code</span>
                    </span>
                    <span className="text-emerald-400 font-mono font-medium">Included</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-300 bg-slate-950/60 px-3 py-2 rounded-lg border border-slate-800/60">
                    <span className="flex items-center gap-2">
                      <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Mobile First Touch Responsive</span>
                    </span>
                    <span className="text-emerald-400 font-mono font-medium">Included</span>
                  </div>
                </div>

                {/* Direct Action */}
                <button
                  onClick={onOpenContact}
                  className="w-full py-3 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700/80 transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Request Full Tech Architecture Review</span>
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
