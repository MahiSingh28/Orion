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

  const [activeTab, setActiveTab] = useState<
    'overview' | 'interactive-demo' | 'tech-lighthouse' | 'review'
  >('overview');

  // Interactive Interactive State variables for the simulated mini-apps
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#F8F5F0]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div
        className="bg-[#FFFCF8] border border-[#DED5CC] w-full max-w-5xl rounded-3xl shadow-2xl shadow-[#1F1D1B]/10 overflow-hidden my-auto flex flex-col max-h-[90vh] transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div className="bg-[#F8F5F0] px-6 py-4 border-b border-[#DED5CC] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md text-xs font-sans font-semibold bg-[#C97872]/10 text-[#B06A64] border border-[#DED5CC]">
              {project.categoryLabel}
            </span>

            <h2 className="text-lg sm:text-xl font-bold text-[#3B2F2A] truncate max-w-md">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="group p-2 rounded-xl bg-[#FFFCF8] text-[#706B65] hover:text-[#3B2F2A] hover:bg-[#DED5CC] transition-all duration-300 hover:rotate-90"
            aria-label="Close case study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="bg-[#F8F5F0]/60 px-6 py-2 border-b border-[#DED5CC] flex items-center gap-2 overflow-x-auto text-xs sm:text-sm font-medium shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ₹{
              activeTab === 'overview'
                ? 'bg-[#DED5CC] text-[#3B2F2A] font-semibold border border-[#DED5CC]'
                : 'text-[#706B65] hover:text-[#3B2F2A]'
            }`}
          >
            <Layers className="w-4 h-4 text-[#B06A64]" />
            <span>Project Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('interactive-demo')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ₹{
              activeTab === 'interactive-demo'
                ? 'bg-[#DED5CC] text-[#3B2F2A] font-semibold border border-[#DED5CC]'
                : 'text-[#706B65] hover:text-[#3B2F2A]'
            }`}
          >
            <Play className="w-4 h-4 text-[#B06A64]" />

            <span>Try the Interactive Demo</span>

            <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#C97872]/20 text-[#B06A64] uppercase font-sans">
              Interactive
            </span>
          </button>

          <button
            onClick={() => setActiveTab('tech-lighthouse')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ₹{
              activeTab === 'tech-lighthouse'
                ? 'bg-[#DED5CC] text-[#3B2F2A] font-semibold border border-[#DED5CC]'
                : 'text-[#706B65] hover:text-[#3B2F2A]'
            }`}
          >
            <Gauge className="w-4 h-4 text-[#B06A64]" />
            <span>Performance & Tech</span>
          </button>

          {project.testimonial && (
            <button
              onClick={() => setActiveTab('review')}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ₹{
                activeTab === 'review'
                  ? 'bg-[#DED5CC] text-[#3B2F2A] font-semibold border border-[#DED5CC]'
                  : 'text-[#706B65] hover:text-[#3B2F2A]'
              }`}
            >
              <Star className="w-4 h-4 text-[#B06A64]" />
              <span>Client Review</span>
            </button>
          )}
        </div>

        {/* Modal Scrollable Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">

              {/* Project Hero Banner Image & Key Metrics */}
              <div className="relative rounded-2xl overflow-hidden border border-[#DED5CC] group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 sm:h-72 object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#3B2F2A]/90 via-[#3B2F2A]/35 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FFFCF8]/90 backdrop-blur-md p-3 rounded-xl border border-[#DED5CC] transition-all duration-300 hover:-translate-y-1 hover:border-[#C97872]/35 hover:shadow-md"
                    >
                      <p className="text-[11px] text-[#706B65] font-medium">
                        {m.label}
                      </p>

                      <p className="text-lg sm:text-xl font-bold font-sans text-[#B06A64]">
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenge vs Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="group bg-[#F8F5F0]/70 p-5 rounded-2xl border border-[#DED5CC]/60 space-y-2 transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFFCF8] hover:shadow-[0_12px_28px_rgba(31,29,27,0.07)]">
                  <div className="flex items-center gap-2 text-[#B06A64] font-semibold text-sm">
                    <span className="w-2 h-2 rounded-full bg-[#B06A64]" />
                    <span>The Challenge</span>
                  </div>

                  <p className="text-sm text-[#706B65] leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                <div className="group bg-[#F8F5F0]/70 p-5 rounded-2xl border border-[#C97872]/40 space-y-2 transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFFCF8] hover:shadow-[0_12px_28px_rgba(201,120,114,0.10)]">
                  <div className="flex items-center gap-2 text-[#B06A64] font-semibold text-sm">
                    <span className="w-2 h-2 rounded-full bg-[#C97872]" />
                    <span>The Solution</span>
                  </div>

                  <p className="text-sm text-[#706B65] leading-relaxed">
                    {project.solution}
                  </p>
                </div>

              </div>

              {/* Deliverables Checklist */}
              <div className="bg-[#F8F5F0] p-5 rounded-2xl border border-[#DED5CC] space-y-3">
                <h3 className="text-sm font-bold text-[#706B65] uppercase tracking-wider font-sans">
                  What I Delivered
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="group flex items-start gap-2 text-xs sm:text-sm text-[#706B65] transition-transform duration-200 hover:translate-x-1"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#B06A64] shrink-0 mt-0.5" />
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

              <div className="bg-[#F8F5F0] p-4 rounded-xl border border-[#DED5CC] flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-[#3B2F2A] flex items-center gap-2">
                    <Play className="w-4 h-4 text-[#B06A64]" />
                    <span>Interactive Project Demo</span>
                  </h3>

                  <p className="text-xs text-[#706B65]">
                    Try a small interactive version of a key feature from this project.
                  </p>
                </div>

                <span className="px-2.5 py-1 rounded bg-[#FFFCF8] border border-[#DED5CC] text-xs font-sans text-[#B06A64]">
                  Interactive Prototype
                </span>
              </div>

              {/* Interactive SaaS Analytics Dashboard Prototype */}
              {project.interactiveSnippetType === 'saas-dashboard' && (
                <div className="group bg-[#F8F5F0] p-6 rounded-2xl border border-[#DED5CC] space-y-6 transition-all duration-300 hover:border-[#C97872]/25 hover:shadow-[0_14px_32px_rgba(31,29,27,0.07)]">

                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DED5CC]/80 pb-4">
                    <div>
                      <span className="text-xs text-[#706B65] font-sans">
                        INTERACTIVE DASHBOARD
                      </span>

                      <h4 className="text-lg font-bold text-[#3B2F2A]">
                        Live Activity Dashboard
                      </h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsStreaming(!isStreaming)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 ₹{
                          isStreaming
                            ? 'bg-[#C97872]/20 text-[#B06A64] border border-[#DED5CC]'
                            : 'bg-[#DED5CC] text-[#706B65]'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ₹{
                            isStreaming
                              ? 'bg-[#C97872] animate-ping'
                              : 'bg-[#706B65]'
                          }`}
                        />

                        {isStreaming
                          ? 'Live updates'
                          : 'Paused'}
                      </button>

                      <button
                        onClick={() => {
                          setLiveEventCount(liveEventCount + 1000);
                          setEventsPerSec(eventsPerSec + 150);
                        }}
                        className="group px-3 py-1.5 rounded-lg bg-[#C97872] text-white hover:bg-[#B06A64] text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(201,120,114,0.18)]"
                      >
                        Simulate More Activity
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    <div className="group bg-[#FFFCF8] p-4 rounded-xl border border-[#DED5CC] transition-all duration-300 hover:-translate-y-1 hover:border-[#C97872]/30 hover:shadow-[0_10px_22px_rgba(31,29,27,0.06)]">
                      <p className="text-xs text-[#706B65]">
                        Activity Today
                      </p>

                      <p className="text-2xl font-bold font-sans text-[#3B2F2A] mt-1">
                        {liveEventCount.toLocaleString()}
                      </p>
                    </div>

                    <div className="group bg-[#FFFCF8] p-4 rounded-xl border border-[#DED5CC] transition-all duration-300 hover:-translate-y-1 hover:border-[#C97872]/30 hover:shadow-[0_10px_22px_rgba(31,29,27,0.06)]">
                      <p className="text-xs text-[#706B65]">
                        Activity Rate
                      </p>

                      <p className="text-2xl font-bold font-sans text-[#B06A64] mt-1">
                        {eventsPerSec.toLocaleString()} / sec
                      </p>
                    </div>

                    <div className="group bg-[#FFFCF8] p-4 rounded-xl border border-[#DED5CC] transition-all duration-300 hover:-translate-y-1 hover:border-[#C97872]/30 hover:shadow-[0_10px_22px_rgba(31,29,27,0.06)]">
                      <p className="text-xs text-[#706B65]">
                        Interface Responsiveness
                      </p>

                      <p className="text-2xl font-bold font-sans text-[#B06A64] mt-1">
                        Smooth & responsive
                      </p>
                    </div>

                  </div>

                  {/* Simulated Chart Bars */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#706B65]">
                      <span>
                        Live Activity Distribution
                      </span>

                      <span className="font-sans text-[#B06A64]">
                        Smooth interaction
                      </span>
                    </div>

                    <div className="h-32 bg-[#FFFCF8]/80 rounded-xl p-4 border border-[#DED5CC] flex items-end justify-between gap-2">
                      {[65, 40, 85, 95, 70, 50, 90, 100, 75, 80, 92, 88, 96].map(
                        (h, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-[#DED5CC] rounded-t overflow-hidden relative group"
                          >
                            <div
                              className="w-full bg-gradient-to-t from-[#B06A64] to-[#C97872] transition-all duration-500 rounded-t"
                              style={{
                                height: `₹{
                                  isStreaming
                                    ? Math.min(
                                        100,
                                        h + (i % 3 === 0 ? 10 : -5)
                                      )
                                    : h
                                }%`,
                              }}
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>

                </div>
              )}

              {/* Interactive E-Commerce Checkout Prototype */}
              {project.interactiveSnippetType === 'ecommerce-checkout' && (
                <div className="group bg-[#F8F5F0] p-6 rounded-2xl border border-[#DED5CC] space-y-6 transition-all duration-300 hover:border-[#C97872]/25 hover:shadow-[0_14px_32px_rgba(31,29,27,0.07)]">

                  <div className="flex items-center justify-between border-b border-[#DED5CC]/80 pb-4">
                    <div>
                      <span className="text-xs text-[#706B65] font-sans">
                        ONLINE STORE DEMO
                      </span>

                      <h4 className="text-lg font-bold text-[#3B2F2A]">
                        Online Store Cart
                      </h4>
                    </div>

                    <span className="text-xs text-[#B06A64] font-sans bg-[#DED5CC] px-3 py-1 rounded border border-[#DED5CC]">
                      Checkout Demo
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

                    <div className="space-y-3">
                      <div className="p-4 bg-[#FFFCF8] rounded-xl border border-[#DED5CC] flex items-center justify-between">

                        <div>
                          <p className="font-semibold text-[#706B65]">
                            Silk Cashmere Sweater
                          </p>

                          <p className="text-xs text-[#706B65]">
                            Size: M | Color: Midnight Black
                          </p>
                        </div>

                        <p className="font-sans font-bold text-[#3B2F2A]">
                          ₹285.00
                        </p>

                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#706B65]">
                          Quantity:
                        </span>

                        <button
                          onClick={() =>
                            setCartCount(Math.max(1, cartCount - 1))
                          }
                          className="w-8 h-8 bg-[#DED5CC] text-[#706B65] rounded-lg hover:bg-[#C97872] hover:text-white transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                          -
                        </button>

                        <span className="font-sans text-[#3B2F2A] font-bold px-2">
                          {cartCount}
                        </span>

                        <button
                          onClick={() => setCartCount(cartCount + 1)}
                          className="w-8 h-8 bg-[#DED5CC] text-[#706B65] rounded-lg hover:bg-[#C97872] hover:text-white transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#FFFCF8] p-5 rounded-xl border border-[#DED5CC] space-y-4">

                      <div className="flex justify-between text-xs text-[#706B65]">
                        <span>Subtotal ({cartCount} items)</span>

                        <span className="font-sans text-[#706B65]">
                          ₹{(285 * cartCount).toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between text-xs text-[#706B65]">
                        <span>Express Shipping</span>

                        <span className="text-[#B06A64] font-sans">
                          FREE
                        </span>
                      </div>

                      <div className="border-t border-[#DED5CC] pt-3 flex justify-between font-bold text-[#3B2F2A]">
                        <span>Total Due</span>

                        <span className="font-sans text-[#B06A64]">
                          ₹{(285 * cartCount).toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setCartSuccess(true);
                          setTimeout(() => setCartSuccess(false), 3000);
                        }}
                        className="group w-full py-3 rounded-xl bg-[#C97872] text-white font-bold text-xs hover:bg-[#B06A64] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(201,120,114,0.18)] flex items-center justify-center gap-2"
                      >
                        {cartSuccess ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Demo Order Placed</span>
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-4 h-4" />
                            <span>Try Checkout</span>
                          </>
                        )}
                      </button>

                    </div>
                  </div>
                </div>
              )}

              {/* Speed Audit Simulator */}
              {(project.interactiveSnippetType === 'speed-audit' ||
                project.interactiveSnippetType === 'analytics-widget') && (
                <div className="group bg-[#F8F5F0] p-6 rounded-2xl border border-[#DED5CC] space-y-6 transition-all duration-300 hover:border-[#C97872]/25 hover:shadow-[0_14px_32px_rgba(31,29,27,0.07)]">

                  <div className="flex items-center justify-between border-b border-[#DED5CC]/80 pb-4">

                    <div>
                      <span className="text-xs text-[#706B65] font-sans">
                        PERFORMANCE CHECK
                      </span>

                      <h4 className="text-lg font-bold text-[#3B2F2A]">
                        Website Performance Check
                      </h4>
                    </div>

                    <button
                      onClick={handleRunSpeedTest}
                      disabled={speedTestRunning}
                      className="group px-4 py-2 rounded-xl bg-[#C97872] text-white font-bold text-xs hover:bg-[#B06A64] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(201,120,114,0.18)] flex items-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                      <RefreshCw
                        className={`w-3.5 h-3.5 ₹{
                          speedTestRunning ? 'animate-spin' : ''
                        }`}
                      />

                      <span>
                        {speedTestRunning
                          ? 'Checking...'
                          : 'Run Performance Check'}
                      </span>
                    </button>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    <div className="bg-[#FFFCF8] p-4 rounded-xl border border-[#DED5CC] text-center">
                      <p className="text-xs text-[#706B65]">
                        Page Load Speed (LCP)
                      </p>

                      <p className="text-2xl font-bold font-sans text-[#B06A64] mt-1">
                        {speedResult
                          ? `₹{speedResult.toFixed(2)}s`
                          : '0.62s'}
                      </p>

                      <span className="text-[10px] text-[#B06A64]">
                        ✓ Good loading performance
                      </span>
                    </div>

                    <div className="bg-[#FFFCF8] p-4 rounded-xl border border-[#DED5CC] text-center">
                      <p className="text-xs text-[#706B65]">
                        Visual Stability (CLS)
                      </p>

                      <p className="text-2xl font-bold font-sans text-[#B06A64] mt-1">
                        0.000
                      </p>

                      <span className="text-[10px] text-[#B06A64]">
                        ✓ Stable layout
                      </span>
                    </div>

                    <div className="bg-[#FFFCF8] p-4 rounded-xl border border-[#DED5CC] text-center">
                      <p className="text-xs text-[#706B65]">
                        Interaction Delay (TBT)
                      </p>

                      <p className="text-2xl font-bold font-sans text-[#B06A64] mt-1">
                        0 ms
                      </p>

                      <span className="text-[10px] text-[#B06A64]">
                        ✓ Fast interaction
                      </span>
                    </div>

                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 3: LIGHTHOUSE & TECH STACK */}
          {activeTab === 'tech-lighthouse' && (
            <div className="space-y-6">

              {/* performance Score Dials */}
              <div className="bg-[#F8F5F0] p-6 rounded-2xl border border-[#DED5CC] space-y-4">

                <h3 className="text-sm font-bold text-[#706B65] uppercase tracking-wider font-sans">
                  Performance Overview
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

                  <div className="group bg-[#FFFCF8] p-4 rounded-xl border border-[#DED5CC] text-center space-y-1 transition-all duration-300 hover:-translate-y-1 hover:border-[#C97872]/30 hover:shadow-[0_10px_22px_rgba(201,120,114,0.08)]">
                    <div className="text-3xl font-black font-sans text-[#B06A64]">
                      {project.lighthouseScores.performance}
                    </div>

                    <span className="text-xs text-[#706B65] font-semibold block">
                      Performance
                    </span>

                    <span className="text-[10px] text-[#706B65]">
                      Fast loading
                    </span>
                  </div>

                  <div className="group bg-[#FFFCF8] p-4 rounded-xl border border-[#DED5CC] text-center space-y-1 transition-all duration-300 hover:-translate-y-1 hover:border-[#C97872]/30 hover:shadow-[0_10px_22px_rgba(201,120,114,0.08)]">
                    <div className="text-3xl font-black font-sans text-[#B06A64]">
                      {project.lighthouseScores.accessibility}
                    </div>

                    <span className="text-xs text-[#706B65] font-semibold block">
                      Accessibility
                    </span>

                    <span className="text-[10px] text-[#706B65]">
                      Accessibility focused
                    </span>
                  </div>

                  <div className="group bg-[#FFFCF8] p-4 rounded-xl border border-[#DED5CC] text-center space-y-1 transition-all duration-300 hover:-translate-y-1 hover:border-[#C97872]/30 hover:shadow-[0_10px_22px_rgba(201,120,114,0.08)]">
                    <div className="text-3xl font-black font-sans text-[#B06A64]">
                      {project.lighthouseScores.bestPractices}
                    </div>

                    <span className="text-xs text-[#706B65] font-semibold block">
                      Best Practices
                    </span>

                    <span className="text-[10px] text-[#706B65]">
                      Security best practices
                    </span>
                  </div>

                  <div className="group bg-[#FFFCF8] p-4 rounded-xl border border-[#DED5CC] text-center space-y-1 transition-all duration-300 hover:-translate-y-1 hover:border-[#C97872]/30 hover:shadow-[0_10px_22px_rgba(201,120,114,0.08)]">
                    <div className="text-3xl font-black font-sans text-[#B06A64]">
                      {project.lighthouseScores.seo}
                    </div>

                    <span className="text-xs text-[#706B65] font-semibold block">
                      Search-friendly
                    </span>

                    <span className="text-[10px] text-[#706B65]">
                      Social sharing ready
                    </span>
                  </div>

                </div>
              </div>

              {/* Technologies Tag Cloud */}
              <div className="bg-[#F8F5F0] p-6 rounded-2xl border border-[#DED5CC] space-y-3">

                <h3 className="text-sm font-bold text-[#706B65] uppercase tracking-wider font-sans">
                  Tools Used
                </h3>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="group px-3 py-1.5 rounded-lg text-xs font-sans font-medium bg-[#FFFCF8] text-[#706B65] border border-[#DED5CC] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C97872]/40 hover:text-[#1F1D1B] hover:bg-[#F1DFDA]"
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
            <div className="group bg-[#F8F5F0] p-6 rounded-2xl border border-[#DED5CC] space-y-6 transition-all duration-300 hover:border-[#C97872]/25 hover:shadow-[0_14px_32px_rgba(31,29,27,0.07)]">

              <div className="flex items-center gap-1 text-[#B06A64]">
                {[...Array(project.testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#B06A64]"
                  />
                ))}

                <span className="ml-2 text-xs font-sans font-bold text-[#706B65]">
                  5.0 / 5.0 CLIENT RATING
                </span>
              </div>

              <blockquote className="text-base sm:text-lg text-[#706B65] italic leading-relaxed">
                "{project.testimonial.quote}"
              </blockquote>

              <div className="flex items-center gap-4 pt-4 border-t border-[#DED5CC]">
                <img
                  src={project.testimonial.avatar}
                  alt={project.testimonial.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#C97872]/50 transition-transform duration-300 group-hover:scale-105"
                />

                <div>
                  <h4 className="font-bold text-[#3B2F2A] text-sm">
                    {project.testimonial.author}
                  </h4>

                  <p className="text-xs text-[#706B65]">
                    {project.testimonial.role},{' '}
                    {project.testimonial.company}
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Action */}
        <div className="bg-[#F8F5F0] px-6 py-4 border-t border-[#DED5CC] flex flex-wrap items-center justify-between gap-3 shrink-0">

          <div className="text-xs text-[#706B65]">
            Timeline:{' '}
            <strong className="text-[#3B2F2A] font-sans">
              {project.duration}
            </strong>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onSelectForEstimator(project.category);
              }}
              className="group px-5 py-2.5 rounded-xl text-xs font-bold bg-[#C97872] text-white hover:bg-[#B06A64] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(176,106,100,0.22)] flex items-center gap-2 shadow-lg shadow-[#B06A64]/20"
            >
              <span>Build Something Similar</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};