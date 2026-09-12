import React, { useEffect, useMemo, useState } from 'react';
import { WORK_PROCESS_STEPS } from '../data/portfolioData';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Code,
  Compass,
  Layers3,
  Rocket,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';


const WORKFLOW_IMAGES = [
  {
    src: 'https://cdn.eversite.com/media/6d2bd9bbb5466605938bccb4fb6e6c05fce5fd43/28309/accounting-software-for-web-designers.jpg',
    alt: 'Web design wireframe being reviewed on a laptop',
    eyebrow: '01 / DISCOVERY',
    caption: 'Ideas become a clear structure before development starts.',
  },
  {
    src: 'https://www.boundlesstech.net/assets/images/wordpress/top-10web.jpg',
    alt: 'Developer coding a website on a laptop',
    eyebrow: '02 / BUILD',
    caption: 'Design and development move together in visible, manageable stages.',
  },
  {
    src: 'https://fiverr-res.cloudinary.com/images/t_main1%2Cq_auto%2Cf_auto%2Cq_auto%2Cf_auto/gigs/100418335/original/3bf27669a4162e958d3976a16e6660d7f682ac5c/test-your-web-application-using-all-major-browsers-and-devices.jpg',
    alt: 'Website displayed across multiple devices for responsive testing',
    eyebrow: '03 / TEST',
    caption: 'The finished interface is checked across screen sizes before launch.',
  },
  {
    src: 'https://miro.medium.com/v2/resize%3Afit%3A1400/1%2AutsxXbWjpBJk1MzkUqmXLQ.png',
    alt: 'Developer working with a cloud deployment dashboard',
    eyebrow: '04 / LAUNCH',
    caption: 'The approved build moves into production and post-launch support.',
  },
];

export const WorkProcess: React.FC = () => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [expandedDeliverables, setExpandedDeliverables] = useState<number | null>(null);

  const getIcon = (iconName: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'Compass':
        return <Compass className={className} />;
      case 'Code':
        return <Code className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'Rocket':
        return <Rocket className={className} />;
      default:
        return <Compass className={className} />;
    }
  };

  const openProcess = (stepIndex = 0) => {
    setActiveStep(Math.max(0, Math.min(stepIndex, WORK_PROCESS_STEPS.length - 1)));
    setIsDetailOpen(true);
    window.history.pushState({ processPage: true }, '', '/process');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeProcess = () => {
    setIsDetailOpen(false);
    if (window.location.pathname === '/process') {
      window.history.back();
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setIsDetailOpen(window.location.pathname === '/process');
    };

    if (window.location.pathname === '/process') {
      setIsDetailOpen(true);
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (!isDetailOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeProcess();
      if (event.key === 'ArrowRight') {
        setActiveStep((current) => Math.min(current + 1, WORK_PROCESS_STEPS.length - 1));
      }
      if (event.key === 'ArrowLeft') {
        setActiveStep((current) => Math.max(current - 1, 0));
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDetailOpen]);

  const currentStep = useMemo(
    () => WORK_PROCESS_STEPS[activeStep] || WORK_PROCESS_STEPS[0],
    [activeStep]
  );

  if (isDetailOpen) {
    return (
      <section
        className="fixed inset-0 z-[100] overflow-y-auto bg-[#F8F5F0] text-[#1F1D1B]"
        aria-label="Detailed project workflow"
      >
        {/* Editorial atmosphere — light, spacious, image-led */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-[#F1DFDA]/70 blur-[130px]" />
          <div className="absolute -left-40 top-[45%] h-[460px] w-[460px] rounded-full bg-[#DED5CC]/45 blur-[120px]" />
        </div>

        <div className="relative min-h-screen">
          <header className="sticky top-0 z-30 border-b border-[#DED5CC]/70 bg-[#F8F5F0]/92 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
              <button
                type="button"
                onClick={closeProcess}
                className="group flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-[#706B65] transition-all hover:bg-[#FFFCF8] hover:text-[#1F1D1B] focus:outline-none focus:ring-2 focus:ring-[#C97872]/40"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                <span>Back to process</span>
              </button>

              <div className="hidden items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#706B65] sm:flex">
                <span>ORION</span>
                <span>/</span>
                <span className="text-[#B06A64]">WORKFLOW</span>
              </div>

              <button
                type="button"
                onClick={closeProcess}
                aria-label="Close workflow"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#DED5CC] bg-[#FFFCF8] text-[#706B65] transition-all hover:-rotate-3 hover:border-[#C97872]/50 hover:text-[#B06A64] focus:outline-none focus:ring-2 focus:ring-[#C97872]/40"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>

          <main className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
            {/* Hero */}
            <section className="grid gap-10 pb-16 pt-14 lg:grid-cols-[1fr_0.82fr] lg:items-end lg:gap-20 lg:pb-24 lg:pt-20">
              <div>
                <div className="mb-6 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-[#B06A64]">
                  <Sparkles className="h-4 w-4" />
                  <span>THE FULL JOURNEY</span>
                </div>

                <h1 className="max-w-5xl text-5xl font-black leading-[0.92] tracking-[-0.055em] text-[#1F1D1B] sm:text-7xl lg:text-[7.5rem]">
                  From idea
                  <span className="block text-[#C97872]">to launch.</span>
                </h1>

                <p className="mt-8 max-w-2xl text-base leading-7 text-[#706B65] sm:text-lg">
                  A simple, visible workflow designed so you always know what is
                  happening, what We're working on, and when you get to review it.
                </p>
              </div>

              <div className="border-l border-[#DED5CC] pl-6 lg:mb-2 lg:pl-8">
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#B06A64]">
                  YOUR ROLE
                </p>
                <p className="mt-3 max-w-sm text-sm leading-7 text-[#706B65]">
                  You bring the goal and feedback. We turn that into the plan,
                  design, build, testing, and launch.
                </p>
                <div className="mt-6 flex items-center gap-3 text-xs font-semibold text-[#B06A64]">
                  <span className="h-px w-8 bg-[#C97872]" />
                  <span>Nothing disappears into a black box.</span>
                </div>
              </div>
            </section>

            {/* Image-led opening spread */}
            <section className="grid gap-4 md:grid-cols-[1.45fr_0.75fr]">
              <figure className="group relative min-h-[360px] overflow-hidden rounded-[2rem] bg-[#DED5CC] sm:min-h-[500px]">
                <img
                  src={WORKFLOW_IMAGES[0].src}
                  alt={WORKFLOW_IMAGES[0].alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent p-6 sm:p-8">
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/75">
                    {WORKFLOW_IMAGES[0].eyebrow}
                  </p>
                  <figcaption className="mt-2 max-w-lg text-lg font-semibold leading-6 text-white sm:text-xl">
                    {WORKFLOW_IMAGES[0].caption}
                  </figcaption>
                </div>
              </figure>

              <div className="flex flex-col justify-between rounded-[2rem] bg-[#1F1D1B] p-7 text-[#F8F5F0] sm:p-9">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#C97872]">
                    01—04 / PROCESS
                  </p>
                  <p className="mt-8 text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl">
                    Clear steps.
                    <span className="block text-[#C97872]">Visible progress.</span>
                  </p>
                </div>
                <p className="mt-10 text-sm leading-6 text-[#DED5CC]">
                  Each stage has a clear outcome and a point where you can review
                  the work before we move forward.
                </p>
              </div>
            </section>

            {/* Interactive navigator */}
            <section className="py-16 sm:py-20">
              <div className="mb-8 flex items-end justify-between gap-6">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#B06A64]">
                    EXPLORE THE STAGES
                  </p>
                  <h2 className="mt-2 text-3xl font-black tracking-[-0.035em] sm:text-5xl">
                    How the work moves.
                  </h2>
                </div>
                <p className="hidden max-w-xs text-right text-xs leading-5 text-[#706B65] md:block">
                  Select a stage to see what happens, what you receive, and where
                  your feedback fits in.
                </p>
              </div>

              <div className="grid border-y border-[#DED5CC] md:grid-cols-4">
                {WORK_PROCESS_STEPS.map((step, index) => {
                  const isActive = index === activeStep;
                  return (
                    <button
                      key={step.stepNumber}
                      type="button"
                      onClick={() => setActiveStep(index)}
                      aria-current={isActive ? 'step' : undefined}
                      className={`group min-h-32 border-b border-[#DED5CC] px-4 py-5 text-left transition-all duration-300 md:border-b-0 md:border-r md:px-5 md:py-6 md:last:border-r-0 ${
                        isActive
                          ? 'bg-[#FFFCF8]'
                          : 'hover:bg-[#F1DFDA]/35'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-3xl font-black tracking-[-0.05em] transition-colors ${
                            isActive ? 'text-[#C97872]' : 'text-[#DED5CC] group-hover:text-[#B06A64]'
                          }`}
                        >
                          {step.stepNumber}
                        </span>
                        <span className={isActive ? 'text-[#B06A64]' : 'text-[#706B65]'}>
                          {getIcon(step.icon, 'h-4 w-4')}
                        </span>
                      </div>
                      <span className="mt-7 block text-sm font-bold text-[#1F1D1B]">
                        {step.title}
                      </span>
                      <span className="mt-1 block text-[11px] text-[#706B65]">
                        {step.duration}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Current stage — image + story */}
            <section className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="text-[9rem] font-black leading-none tracking-[-0.09em] text-[#DED5CC]/65 sm:text-[11rem]">
                  {currentStep.stepNumber}
                </div>
                <div className="-mt-8 sm:-mt-10">
                  <div className="mb-4 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-[#B06A64]">
                    {getIcon(currentStep.icon, 'h-4 w-4')}
                    <span>STEP {activeStep + 1} OF {WORK_PROCESS_STEPS.length}</span>
                  </div>
                  <h2 className="max-w-md text-4xl font-black leading-[0.98] tracking-[-0.04em] sm:text-6xl">
                    {currentStep.title}
                  </h2>
                  <p className="mt-5 max-w-md text-sm leading-7 text-[#706B65] sm:text-base">
                    {currentStep.description}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    <span className="rounded-full border border-[#DED5CC] bg-[#FFFCF8] px-3 py-1.5 text-xs text-[#706B65]">
                      {currentStep.duration}
                    </span>
                    <span className="rounded-full bg-[#F1DFDA] px-3 py-1.5 text-xs font-semibold text-[#B06A64]">
                      Client review included
                    </span>
                  </div>
                </div>
              </aside>

              <div className="space-y-7">
                <figure className="group relative overflow-hidden rounded-[2rem] bg-[#DED5CC]">
                  <img
                    src={WORKFLOW_IMAGES[activeStep].src}
                    alt={WORKFLOW_IMAGES[activeStep].alt}
                    className="h-[340px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:h-[480px]"
                  />
                  <div className="absolute left-5 top-5 rounded-full bg-[#F8F5F0]/90 px-3 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-[#B06A64] backdrop-blur-sm">
                    {WORKFLOW_IMAGES[activeStep].eyebrow}
                  </div>
                  <figcaption className="border border-t-0 border-[#DED5CC] bg-[#FFFCF8] px-5 py-4 text-sm leading-6 text-[#706B65] sm:px-6">
                    {WORKFLOW_IMAGES[activeStep].caption}
                  </figcaption>
                </figure>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="rounded-[1.5rem] bg-[#FFFCF8] p-6 sm:p-7">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[#B06A64]">
                      WHAT HAPPENS
                    </p>
                    <h3 className="mt-3 text-2xl font-black tracking-[-0.025em]">
                      Here’s what you’ll see.
                    </h3>
                    <div className="mt-6 space-y-3">
                      {currentStep.deliverables.map((deliverable, index) => (
                        <div
                          key={`${currentStep.stepNumber}-${index}`}
                          className="group flex items-start gap-3 border-t border-[#DED5CC] pt-3 transition-transform duration-300 hover:translate-x-1"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#B06A64]" />
                          <p className="text-sm leading-6 text-[#706B65]">{deliverable}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setExpandedDeliverables(
                        expandedDeliverables === activeStep ? null : activeStep
                      )
                    }
                    className="group rounded-[1.5rem] bg-[#1F1D1B] p-6 text-left text-[#F8F5F0] transition-all duration-300 hover:-translate-y-1 sm:p-7"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#C97872]">
                          YOUR CHECKPOINT
                        </p>
                        <h3 className="mt-3 text-2xl font-black tracking-[-0.025em]">
                          Your part is simple.
                        </h3>
                      </div>
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#F8F5F0]/15 text-[#C97872]">
                        {expandedDeliverables === activeStep ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </div>

                    <p className="mt-5 text-sm leading-6 text-[#DED5CC]">
                      You review the work at this stage, share feedback, and approve
                      the direction before the project moves forward.
                    </p>

                    {expandedDeliverables === activeStep && (
                      <div className="mt-6 grid gap-2 border-t border-[#F8F5F0]/10 pt-5">
                        <span className="rounded-xl bg-[#F8F5F0]/5 p-3 text-xs text-[#DED5CC]">
                          Review progress
                        </span>
                        <span className="rounded-xl bg-[#F8F5F0]/5 p-3 text-xs text-[#DED5CC]">
                          Share feedback
                        </span>
                        <span className="rounded-xl bg-[#C97872]/15 p-3 text-xs text-[#C97872]">
                          Approve next step
                        </span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </section>

            {/* Supporting image strip — makes the detail page feel like a journey */}
            <section className="pt-20 sm:pt-28">
              <div className="grid gap-4 sm:grid-cols-3">
                {WORKFLOW_IMAGES.slice(1, 4).map((image, index) => (
                  <figure
                    key={image.eyebrow}
                    className={`group overflow-hidden rounded-[1.75rem] bg-[#DED5CC] ${
                      index === 1 ? 'sm:translate-y-10' : ''
                    }`}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-[#F8F5F0]/90 px-3 py-1.5 text-[10px] font-mono font-semibold tracking-[0.16em] text-[#B06A64] backdrop-blur-sm">
                        {image.eyebrow}
                      </span>
                    </div>
                    <figcaption className="bg-[#FFFCF8] px-5 py-4 text-sm leading-6 text-[#706B65]">
                      {image.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            {/* Bottom progression */}
            <section className="mt-24 border-t border-[#DED5CC] pt-6 sm:mt-32">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 text-xs text-[#706B65]">
                  <span className="font-mono text-[#B06A64]">
                    {String(activeStep + 1).padStart(2, '0')}
                  </span>
                  <div className="h-px w-20 bg-[#DED5CC] sm:w-32">
                    <div
                      className="h-full bg-[#C97872] transition-all duration-500"
                      style={{
                        width: `${((activeStep + 1) / WORK_PROCESS_STEPS.length) * 100}%`,
                      }}
                    />
                  </div>
                  <span>
                    {activeStep === WORK_PROCESS_STEPS.length - 1
                      ? 'Ready to launch'
                      : `${WORK_PROCESS_STEPS.length - activeStep - 1} step${
                          WORK_PROCESS_STEPS.length - activeStep - 1 === 1 ? '' : 's'
                        } to go`}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((current) => Math.max(current - 1, 0))}
                    className="flex min-h-11 items-center gap-2 rounded-full border border-[#DED5CC] bg-[#FFFCF8] px-4 text-xs font-semibold text-[#706B65] transition-all hover:-translate-x-0.5 hover:border-[#C97872]/50 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Previous
                  </button>

                  <button
                    type="button"
                    disabled={activeStep === WORK_PROCESS_STEPS.length - 1}
                    onClick={() =>
                      setActiveStep((current) =>
                        Math.min(current + 1, WORK_PROCESS_STEPS.length - 1)
                      )
                    }
                    className="group flex min-h-11 items-center gap-2 rounded-full bg-[#1F1D1B] px-5 text-xs font-bold text-[#F8F5F0] transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Next step
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </section>

            {/* End statement */}
            <section className="mt-20 grid gap-8 border-t border-[#DED5CC] pt-12 sm:mt-28 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-[#B06A64]">
                  <Zap className="h-4 w-4" />
                  <span>The point of the process</span>
                </div>
                <p className="mt-4 max-w-4xl text-3xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
                  You should never have to wonder,
                  <span className="text-[#C97872]"> “What’s happening with Our project?”</span>
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#706B65]">
                <Layers3 className="h-4 w-4" />
                <span>Plan → Build → Test → Launch</span>
              </div>
            </section>
          </main>
        </div>
      </section>
    );
  }

  return (
    <section
      id="process"
      className="relative overflow-hidden border-b border-[#DED5CC]/70 bg-[#F8F5F0] py-16 md:py-24"
    >
      <div className="pointer-events-none absolute -left-36 top-20 h-80 w-80 rounded-full bg-[#C97872]/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-[#DED5CC]/45 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DED5CC] bg-[#F1DFDA] px-3.5 py-1 text-xs font-semibold text-[#B06A64] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <Compass className="h-3.5 w-3.5" />
            <span>HOW THE PROCESS WORKS</span>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-[#1F1D1B] sm:text-5xl">
            A Clear Process From Idea to Launch
          </h2>

          <p className="text-sm text-[#706B65] sm:text-base">
            I keep the process simple and transparent. You know what happens next,
            see progress along the way, and have regular opportunities to review the work.
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] top-8 hidden h-px bg-gradient-to-r from-[#DED5CC] via-[#C97872]/40 to-[#DED5CC] lg:block" />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {WORK_PROCESS_STEPS.map((step, index) => (
              <div
                key={step.stepNumber}
                className="group relative flex cursor-pointer flex-col justify-between space-y-4 rounded-2xl border border-[#DED5CC] bg-[#FFFCF8] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#C97872]/60 hover:shadow-xl focus-within:border-[#C97872]/60"
                onClick={() => openProcess(index)}
              >
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-2xl font-black text-[#DED5CC] transition-colors duration-300 group-hover:text-[#C97872]">
                    {step.stepNumber}
                  </span>

                  <div className="relative rounded-xl border border-[#DED5CC] bg-[#F8F5F0] p-2.5 shadow-sm transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 group-hover:border-[#C97872]/40 group-hover:bg-[#F1DFDA]">
                    {getIcon(step.icon, 'h-5 w-5 text-[#B06A64]')}
                  </div>
                </div>

                <div className="h-0.5 w-8 bg-[#DED5CC] transition-all duration-500 group-hover:w-16 group-hover:bg-[#C97872]" />

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#B06A64]">
                    <span>{step.duration}</span>
                    <span className="translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      Step {index + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#1F1D1B] transition-colors duration-300 group-hover:text-[#B06A64]">
                    {step.title}
                  </h3>
                </div>

                <p className="text-xs leading-relaxed text-[#706B65]">{step.description}</p>

                <div className="space-y-2 border-t border-[#DED5CC]/80 pt-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#706B65]">
                    What You Get
                  </span>

                  <ul className="space-y-1.5 text-xs text-[#706B65]">
                    {step.deliverables.map((del, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-1.5 text-[11px] transition-transform duration-300 group-hover:translate-x-0.5"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#B06A64] transition-transform duration-300 group-hover:scale-110" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    openProcess(index);
                  }}
                  className="flex min-h-11 items-center gap-1 self-start pt-1 text-[10px] font-semibold text-[#B06A64] transition-all duration-300 hover:translate-x-0.5 hover:text-[#C97872] focus:outline-none focus:ring-2 focus:ring-[#C97872]/30"
                >
                  <span>Explore this workflow</span>
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => openProcess(0)}
            className="group flex min-h-12 items-center gap-2 rounded-2xl bg-[#1F1D1B] px-5 text-xs font-bold text-[#F8F5F0] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#2A2724] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#C97872]/40"
          >
            <Sparkles className="h-4 w-4 text-[#C97872]" />
            <span>See the full workflow</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
