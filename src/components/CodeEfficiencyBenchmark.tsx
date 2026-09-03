import React, { useState } from 'react';
import { BENCHMARK_COMPARISONS } from '../data/portfolioData';
import { 
  Cpu, 
  Zap, 
  CheckCircle2, 
  Code2, 
  Layers, 
  TrendingDown, 
  Gauge, 
  Terminal, 
  Copy, 
  Check, 
  Activity
} from 'lucide-react';

export const CodeEfficiencyBenchmark: React.FC = () => {
  const [selectedBenchmarkId, setSelectedBenchmarkId] = useState<string>('rendering-opt');
  const [codeTab, setCodeTab] = useState<'optimized' | 'unoptimized'>('optimized');
  const [copied, setCopied] = useState<boolean>(false);

  const activeBenchmark = BENCHMARK_COMPARISONS.find(b => b.id === selectedBenchmarkId) || BENCHMARK_COMPARISONS[0];

  const handleCopyCode = () => {
    const codeToCopy = codeTab === 'optimized' ? activeBenchmark.optimizedCode : activeBenchmark.unoptimizedCode;
    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="benchmarks" className="py-16 md:py-24 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>CODE EFFICIENCY & PERFORMANCE BENCHMARKS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
              Zero-Bloat Architecture. <br />
              <span className="text-emerald-400">Sub-50ms React Runtime.</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              I write clean, hand-crafted TypeScript & React code optimized for browser memory, zero layout shifts, and silky 60 FPS interaction rates.
            </p>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs font-mono flex items-center gap-3">
            <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
            <div>
              <span className="text-slate-400 block">Garbage Collection Overhead</span>
              <span className="text-emerald-400 font-bold text-sm">Near Zero (Pure Hooks)</span>
            </div>
          </div>
        </div>

        {/* Benchmark Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BENCHMARK_COMPARISONS.map((bench) => {
            const isSelected = selectedBenchmarkId === bench.id;
            return (
              <div
                key={bench.id}
                onClick={() => setSelectedBenchmarkId(bench.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-emerald-500/80 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
                    {bench.improvement}
                  </span>
                  <Zap className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-600'}`} />
                </div>

                <h3 className="font-bold text-slate-100 text-base">{bench.title}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{bench.description}</p>
              </div>
            );
          })}
        </div>

        {/* Interactive Code Viewer Box */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
          
          {/* Header Bar */}
          <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-indigo-400" />
              <div>
                <h4 className="font-bold text-slate-100 text-sm">{activeBenchmark.title}</h4>
                <p className="text-xs text-slate-400 font-mono">Code Architecture Comparison</p>
              </div>
            </div>

            {/* Code View Toggle */}
            <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-medium">
              <button
                onClick={() => setCodeTab('optimized')}
                className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  codeTab === 'optimized'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Optimized Code (Fast)</span>
              </button>

              <button
                onClick={() => setCodeTab('unoptimized')}
                className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  codeTab === 'unoptimized'
                    ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Standard Unoptimized</span>
              </button>
            </div>

          </div>

          {/* Metric Comparison Banner */}
          <div className="bg-slate-950/60 px-6 py-3 border-b border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Unoptimized Metric:</span>
              <span className="text-rose-400 font-bold">{activeBenchmark.standardMetric}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60">
              <span className="text-slate-400">Optimized Metric:</span>
              <span className="text-emerald-400 font-bold">{activeBenchmark.optimizedMetric}</span>
            </div>
          </div>

          {/* Code Container */}
          <div className="relative bg-slate-950 p-6 overflow-x-auto font-mono text-xs text-slate-200 leading-relaxed">
            <button
              onClick={handleCopyCode}
              className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>

            <pre className="p-2">
              <code>
                {codeTab === 'optimized' ? activeBenchmark.optimizedCode : activeBenchmark.unoptimizedCode}
              </code>
            </pre>
          </div>

        </div>

      </div>
    </section>
  );
};
