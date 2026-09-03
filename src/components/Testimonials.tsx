import React from 'react';
import { TESTIMONIALS_DATA } from '../data/portfolioData';
import { Star, Quote, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 border-b border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>VERIFIED CLIENT REVIEWS & SATISFACTION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
            Trusted by Founders & Product Leads
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Read unfiltered feedback from technical executives, startup founders, and e-commerce directors who hired me for their core web products.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800/90 space-y-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl relative"
            >
              <div className="space-y-4">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-slate-950 text-indigo-400 border border-indigo-800/60">
                    {t.platform}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed">
                  "{t.quote}"
                </p>

              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500/40"
                  />
                  <div>
                    <h4 className="font-bold text-slate-100 text-sm">{t.author}</h4>
                    <p className="text-xs text-slate-400">{t.role}, <span className="text-slate-200 font-medium">{t.company}</span></p>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="text-[10px] font-mono text-slate-500 block">{t.date}</span>
                  <span className="text-[11px] font-mono text-emerald-400">{t.projectType}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
