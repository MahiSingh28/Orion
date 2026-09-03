import React from 'react';
import { SERVICE_PACKAGES } from '../data/portfolioData';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  Send 
} from 'lucide-react';

interface ServicesProps {
  onSelectPackage: (packageName: string, startingPrice: number) => void;
}

export const ServicesAndPricing: React.FC<ServicesProps> = ({
  onSelectPackage,
}) => {
  return (
    <section id="services" className="py-16 md:py-24 border-b border-slate-800/80 bg-slate-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold">
            <DollarSign className="w-3.5 h-3.5" />
            <span>TRANSPARENT SERVICES & FIXED RATES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
            Fixed-Price Engineering Packages
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            No hourly padding or hidden scope creep. Every project is scoped with fixed pricing, clear weekly milestones, and 30 days of post-launch maintenance.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {SERVICE_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-8 border flex flex-col justify-between transition-all relative ${
                pkg.popular
                  ? 'bg-gradient-to-b from-slate-900 via-indigo-950/30 to-slate-900 border-emerald-500 shadow-2xl shadow-emerald-500/10 scale-102 lg:-translate-y-2'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-black uppercase font-mono tracking-wider shadow-md">
                  Most Requested Sprint
                </div>
              )}

              <div className="space-y-6">
                
                {/* Header */}
                <div>
                  <h3 className="text-xl font-bold text-slate-100">{pkg.name}</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{pkg.tagline}</p>
                </div>

                {/* Price Display */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-slate-400 text-xs font-mono">From</span>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
                      ₹{pkg.startingPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      (~${Math.round(pkg.startingPrice / 83).toLocaleString()})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Timeline: {pkg.timeline}</span>
                  </div>
                </div>

                {/* Ideal For Pill */}
                <div className="text-xs text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60">
                  <strong className="text-slate-400 block text-[10px] uppercase font-mono">Ideal For:</strong>
                  <span>{pkg.idealFor}</span>
                </div>

                {/* Feature Checklist */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Included Features
                  </span>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectPackage(pkg.name, pkg.startingPrice)}
                className={`w-full mt-8 py-3.5 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                  pkg.popular
                    ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700/80'
                }`}
              >
                <span>Book This Sprint Package</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
