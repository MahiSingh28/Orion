import React from 'react';
import { Code2, ArrowUp, Github, Linkedin, Twitter, Mail, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, onNavigate }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Code2 className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="font-bold text-slate-100 text-lg tracking-tight">Orion
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Bengaluru, India 🇮🇳
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              Hand-crafted, sub-second web applications built with HTML, CSS, JavaScript, Node.js, React, Tailwind CSS, SEO & TypeScript.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400">
            <button onClick={() => onNavigate('works')} className="hover:text-slate-100 transition-colors">
              Case Studies
            </button>
            <button onClick={() => onNavigate('estimator')} className="hover:text-slate-100 transition-colors">
              Cost Estimator
            </button>
            <button onClick={() => onNavigate('benchmarks')} className="hover:text-slate-100 transition-colors">
              Code Efficiency
            </button>
            <button onClick={() => onNavigate('services')} className="hover:text-slate-100 transition-colors">
              Services & Rates
            </button>
            <button onClick={() => onNavigate('process')} className="hover:text-slate-100 transition-colors">
              Process
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-100 transition-colors">
              Hire Me
            </button>
          </div>

          {/* Back To Top Button */}
          <button
            onClick={onScrollToTop}
            className="p-3 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition-all text-xs font-mono flex items-center gap-2 shrink-0"
            aria-label="Back to top"
          >
            <span>Back To Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>

        </div>

        {/* Bottom copyright bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© 2026 Orion. Built with HTML, CSS, JS, Node.js, React, Tailwind CSS, SEO & TypeScript.</p>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              100/100 Core Web Vitals
            </span>
            <span>•</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
