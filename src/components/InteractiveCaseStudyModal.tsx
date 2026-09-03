import React, { useState } from 'react';
import { Project } from '../types';
import { 
  X, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  Gauge, 
  BarChart3, 
  ShoppingBag, 
  Zap, 
  ArrowRight, 
  Star, 
  Layers, 
  Play, 
  Check, 
  RefreshCw,
  Code2,
  ShieldCheck,
  CreditCard
} from 'lucide-react';

interface ModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectForEstimator: (projectCategory: string) => void;
}

export const InteractiveCaseStudyModal: React.FC<ModalProps> = ({
  project,
  onClose,
  onSelectForEstimator,
}) => {
  if (!project) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'interactive-demo' | 'tech-lighthouse' | 'review'>('overview');

  // Interactive Live Demo State variables for the simulated mini-apps
  // 1. SaaS Dashboard state
  const [streamSpeed, setStreamSpeed] = useState<number>(1000);
  const [liveEventCount, setLiveEventCount] = useState<number>(128490);
  const [eventsPerSec, setEventsPerSec] = useState<number>(2450);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);

  // 2. E-Commerce Cart State
  const [cartCount, setCartCount] = useState<number>(1);
  const [cartSuccess, setCartSuccess] = useState<boolean>(false);

  // 3. Speed Simulator State
  const [speedTestRunning, setSpeedTestRunning] = useState<boolean>(false);
  const [speedResult, setSpeedResult] = useState<number | null>(0.62);

  const handleRunSpeedTest = () => {
    setSpeedTestRunning(true);
    setTimeout(() => {
      setSpeedResult(0.58 + Math.random() * 0.1);
      setSpeedTestRunning(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div 
        className="bg-slate-900 border border-slate-800 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {project.categoryLabel}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-100 truncate max-w-md">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close case study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="bg-slate-950/60 px-6 py-2 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs sm:text-sm font-medium shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-slate-800 text-slate-100 font-semibold border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Case Study & ROI Impact</span>
          </button>

          <button
            onClick={() => setActiveTab('interactive-demo')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'interactive-demo'
                ? 'bg-slate-800 text-slate-100 font-semibold border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Play className="w-4 h-4 text-emerald-400" />
            <span>Try Live Interactive Prototype</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 uppercase font-mono">
              Live Demo
            </span>
          </button>

          <button
            onClick={() => setActiveTab('tech-lighthouse')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'tech-lighthouse'
                ? 'bg-slate-800 text-slate-100 font-semibold border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Gauge className="w-4 h-4 text-amber-400" />
            <span>Lighthouse & Tech Stack</span>
          </button>

          {project.testimonial && (
            <button
              onClick={() => setActiveTab('review')}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'review'
                  ? 'bg-slate-800 text-slate-100 font-semibold border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Star className="w-4 h-4 text-amber-300" />
              <span>Client Verified Review</span>
            </button>
          )}
        </div>

        {/* Modal Scrollable Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Project Hero Banner Image & Key Metrics */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 sm:h-72 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-800">
                      <p className="text-[11px] text-slate-400 font-medium">{m.label}</p>
                      <p className="text-lg sm:text-xl font-bold font-mono text-emerald-400">{m.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenge vs Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-950/70 p-5 rounded-2xl border border-rose-900/30 space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>The Client's Technical Challenge</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                <div className="bg-slate-950/70 p-5 rounded-2xl border border-emerald-900/30 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Engineered Solution</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">
                  Engineered Deliverables List
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: INTERACTIVE LIVE PROTOTYPE DEMO */}
          {activeTab === 'interactive-demo' && (
            <div className="space-y-6">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                    <Play className="w-4 h-4 text-emerald-400" />
                    <span>Interactive Prototype Component</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Interact directly with the simulated core module engineered for this client project.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-emerald-400">
                  Sub-50ms React Render Loop
                </span>
              </div>

              {/* Interactive SaaS Analytics Dashboard Prototype */}
              {project.interactiveSnippetType === 'saas-dashboard' && (
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                    <div>
                      <span className="text-xs text-slate-500 font-mono">LIVE TELEMETRY FEED</span>
                      <h4 className="text-lg font-bold text-slate-100">Nexus Flow Event Streamer</h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsStreaming(!isStreaming)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 ${
                          isStreaming ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
                        {isStreaming ? 'Streaming Active' : 'Paused'}
                      </button>

                      <button
                        onClick={() => {
                          setLiveEventCount(liveEventCount + 1000);
                          setEventsPerSec(eventsPerSec + 150);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 text-xs font-semibold"
                      >
                        Simulate Traffic Spike (+1K Events)
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Processed Events (Today)</p>
                      <p className="text-2xl font-bold font-mono text-slate-100 mt-1">
                        {liveEventCount.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Ingestion Velocity</p>
                      <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                        {eventsPerSec.toLocaleString()} / sec
                      </p>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Render Frame Rate</p>
                      <p className="text-2xl font-bold font-mono text-indigo-400 mt-1">
                        60 FPS (1.2ms render)
                      </p>
                    </div>
                  </div>

                  {/* Simulated Chart Bars */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Live WebSocket Event Distribution (Web Workers Thread)</span>
                      <span className="font-mono text-emerald-400">0% CPU Blocking</span>
                    </div>
                    <div className="h-32 bg-slate-900/80 rounded-xl p-4 border border-slate-800 flex items-end justify-between gap-2">
                      {[65, 40, 85, 95, 70, 50, 90, 100, 75, 80, 92, 88, 96].map((h, i) => (
                        <div key={i} className="flex-1 bg-slate-800 rounded-t overflow-hidden relative group">
                          <div 
                            className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 transition-all duration-500 rounded-t" 
                            style={{ height: `${isStreaming ? Math.min(100, h + (i % 3 === 0 ? 10 : -5)) : h}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Interactive E-Commerce Checkout Prototype */}
              {project.interactiveSnippetType === 'ecommerce-checkout' && (
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                    <div>
                      <span className="text-xs text-slate-500 font-mono">HEADLESS CHECKOUT FLOW</span>
                      <h4 className="text-lg font-bold text-slate-100">Aurora Atelier Instant Cart</h4>
                    </div>
                    <span className="text-xs text-emerald-400 font-mono bg-emerald-950 px-3 py-1 rounded border border-emerald-800">
                      Stripe 1-Click Ready
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-3">
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-slate-200">Silk Cashmere Sweater</p>
                          <p className="text-xs text-slate-400">Size: M | Color: Midnight Black</p>
                        </div>
                        <p className="font-mono font-bold text-slate-100">$285.00</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400">Quantity:</span>
                        <button 
                          onClick={() => setCartCount(Math.max(1, cartCount - 1))}
                          className="w-8 h-8 bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700"
                        >
                          -
                        </button>
                        <span className="font-mono text-slate-100 font-bold px-2">{cartCount}</span>
                        <button 
                          onClick={() => setCartCount(cartCount + 1)}
                          className="w-8 h-8 bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Subtotal ({cartCount} items)</span>
                        <span className="font-mono text-slate-200">${(285 * cartCount).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Express Shipping</span>
                        <span className="text-emerald-400 font-mono">FREE</span>
                      </div>
                      <div className="border-t border-slate-800 pt-3 flex justify-between font-bold text-slate-100">
                        <span>Total Due</span>
                        <span className="font-mono text-emerald-400">${(285 * cartCount).toFixed(2)}</span>
                      </div>

                      <button
                        onClick={() => {
                          setCartSuccess(true);
                          setTimeout(() => setCartSuccess(false), 3000);
                        }}
                        className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
                      >
                        {cartSuccess ? (
                          <>
                            <Check className="w-4 h-4 text-slate-950" />
                            <span>Simulated Order Placed in 0.4s!</span>
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-4 h-4" />
                            <span>Test 1-Click Stripe Checkout</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Speed Audit Simulator */}
              {(project.interactiveSnippetType === 'speed-audit' || project.interactiveSnippetType === 'analytics-widget') && (
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                    <div>
                      <span className="text-xs text-slate-500 font-mono">PERFORMANCE BENCHMARK TEST</span>
                      <h4 className="text-lg font-bold text-slate-100">Live PageSpeed Diagnostic Simulator</h4>
                    </div>
                    <button
                      onClick={handleRunSpeedTest}
                      disabled={speedTestRunning}
                      className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${speedTestRunning ? 'animate-spin' : ''}`} />
                      <span>{speedTestRunning ? 'Running Audit...' : 'Re-Run Performance Audit'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center">
                      <p className="text-xs text-slate-400">Largest Contentful Paint (LCP)</p>
                      <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                        {speedResult ? `${speedResult.toFixed(2)}s` : '0.62s'}
                      </p>
                      <span className="text-[10px] text-emerald-400">✓ Passes Core Web Vitals</span>
                    </div>

                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center">
                      <p className="text-xs text-slate-400">Cumulative Layout Shift (CLS)</p>
                      <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">0.000</p>
                      <span className="text-[10px] text-emerald-400">✓ Zero Visual Shift</span>
                    </div>

                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center">
                      <p className="text-xs text-slate-400">Total Blocking Time (TBT)</p>
                      <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">0 ms</p>
                      <span className="text-[10px] text-emerald-400">✓ Instant Interaction</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 3: LIGHTHOUSE & TECH STACK */}
          {activeTab === 'tech-lighthouse' && (
            <div className="space-y-6">
              
              {/* Lighthouse Score Dials */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">
                  Verified Google Lighthouse Audit Results
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center space-y-1">
                    <div className="text-3xl font-black font-mono text-emerald-400">
                      {project.lighthouseScores.performance}
                    </div>
                    <span className="text-xs text-slate-300 font-semibold block">Performance</span>
                    <span className="text-[10px] text-slate-500">Sub-0.8s LCP</span>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center space-y-1">
                    <div className="text-3xl font-black font-mono text-emerald-400">
                      {project.lighthouseScores.accessibility}
                    </div>
                    <span className="text-xs text-slate-300 font-semibold block">Accessibility</span>
                    <span className="text-[10px] text-slate-500">WCAG 2.1 AA Compliant</span>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center space-y-1">
                    <div className="text-3xl font-black font-mono text-emerald-400">
                      {project.lighthouseScores.bestPractices}
                    </div>
                    <span className="text-xs text-slate-300 font-semibold block">Best Practices</span>
                    <span className="text-[10px] text-slate-500">HTTPS & Security Audited</span>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center space-y-1">
                    <div className="text-3xl font-black font-mono text-emerald-400">
                      {project.lighthouseScores.seo}
                    </div>
                    <span className="text-xs text-slate-300 font-semibold block">SEO Optimization</span>
                    <span className="text-[10px] text-slate-500">Rich OpenGraph Cards</span>
                  </div>
                </div>
              </div>

              {/* Technologies Tag Cloud */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">
                  Tech Stack & Libraries Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: CLIENT TESTIMONIAL */}
          {activeTab === 'review' && project.testimonial && (
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(project.testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
                <span className="ml-2 text-xs font-mono font-bold text-slate-300">
                  5.0 / 5.0 VERIFIED RATING
                </span>
              </div>

              <blockquote className="text-base sm:text-lg text-slate-200 italic leading-relaxed">
                "{project.testimonial.quote}"
              </blockquote>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                <img
                  src={project.testimonial.avatar}
                  alt={project.testimonial.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/40"
                />
                <div>
                  <h4 className="font-bold text-slate-100 text-sm">{project.testimonial.author}</h4>
                  <p className="text-xs text-slate-400">{project.testimonial.role}, {project.testimonial.company}</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Action */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-400">
            Project Duration: <strong className="text-slate-200 font-mono">{project.duration}</strong>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onSelectForEstimator(project.category);
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <span>Build A Similar Project for My Business</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
