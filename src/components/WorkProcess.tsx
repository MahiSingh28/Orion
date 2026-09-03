import React from 'react';
import { WORK_PROCESS_STEPS } from '../data/portfolioData';
import { Compass, Code, ShieldCheck, Rocket, CheckCircle2 } from 'lucide-react';

export const WorkProcess: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass': return <Compass className="w-5 h-5 text-indigo-400" />;
      case 'Code': return <Code className="w-5 h-5 text-emerald-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-amber-400" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-teal-400" />;
      default: return <Compass className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <section id="process" className="py-16 md:py-24 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-mono font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>PREDICTABLE WORKING METHODOLOGY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
            How We Work Together
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Structured, transparent engineering workflows. You receive daily staging preview links and loom video updates so you never have to wonder about progress.
          </p>
        </div>

        {/* 4 Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORK_PROCESS_STEPS.map((step) => (
            <div
              key={step.stepNumber}
              className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800/90 space-y-4 hover:border-slate-700 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-slate-700 group-hover:text-emerald-400 transition-colors">
                    {step.stepNumber}
                  </span>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    {getIcon(step.icon)}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-1">
                    <span>{step.duration}</span>
                  </div>
                  <h3 className="font-bold text-slate-100 text-base">{step.title}</h3>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                  Step Deliverables
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {step.deliverables.map((del, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};