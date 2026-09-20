/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectShowcase } from './components/ProjectShowcase';
import { Project } from './types';

// Heavy/below-the-fold sections are split into separate chunks.
const ProjectEstimator = lazy(() =>
  import('./components/ProjectEstimator').then((m) => ({
    default: m.ProjectEstimator,
  }))
);

const ServicesAndPricing = lazy(() =>
  import('./components/ServicesAndPricing').then((m) => ({
    default: m.ServicesAndPricing,
  }))
);

const WorkProcess = lazy(() =>
  import('./components/WorkProcess').then((m) => ({
    default: m.WorkProcess,
  }))
);

const ContactSection = lazy(() =>
  import('./components/ContactSection').then((m) => ({
    default: m.ContactSection,
  }))
);

const InteractiveCaseStudyModal = lazy(() =>
  import('./components/InteractiveCaseStudyModal').then((m) => ({
    default: m.InteractiveCaseStudyModal,
  }))
);

const InstantAiAssistant = lazy(() =>
  import('./components/InstantAiAssistant').then((m) => ({
    default: m.InstantAiAssistant,
  }))
);

const Footer = lazy(() =>
  import('./components/Footer').then((m) => ({
    default: m.Footer,
  }))
);

function DeferredFallback() {
  return <div className="min-h-[8rem] bg-[#F8F5F0]" aria-hidden="true" />;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('works');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [estimatorBrief, setEstimatorBrief] = useState<{
    projectType: string;
    selectedFeatures: string[];
    priceRange: string;
    timeline: string;
    estimatedHours: number;
  } | null>(null);

  const [hasScrolled, setHasScrolled] = useState(false);
  const [shouldLoadDeferredSections, setShouldLoadDeferredSections] = useState(false);
  const [shouldLoadAssistant, setShouldLoadAssistant] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Let Header/Hero/Projects paint before loading the heavier lower sections.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShouldLoadDeferredSections(true);
    }, 150);

    return () => window.clearTimeout(timer);
  }, []);

  // The assistant is independent, so don't make it compete with first paint.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShouldLoadAssistant(true);
    }, 800);

    return () => window.clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveTab(id);

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleOpenEstimator = () => {
    setShouldLoadDeferredSections(true);
    window.setTimeout(() => scrollToSection('estimator'), 0);
  };

  const handleOpenContact = () => {
    setShouldLoadDeferredSections(true);
    window.setTimeout(() => scrollToSection('contact'), 0);
  };

  const handleSendBriefToContact = (briefSummary: {
    projectType: string;
    selectedFeatures: string[];
    priceRange: string;
    timeline: string;
    estimatedHours?: number;
  }) => {
    setEstimatorBrief({
      ...briefSummary,
      estimatedHours: briefSummary.estimatedHours ?? 0,
    });

    setShouldLoadDeferredSections(true);

    window.setTimeout(() => scrollToSection('contact'), 0);
  };

  const handleSelectPackage = (
    packageName: string,
    startingPrice: number
  ) => {
    setEstimatorBrief({
      projectType: packageName,
      selectedFeatures: [
        'Project planning & architecture',
        'Testing & quality checks',
        'Post-launch support',
      ],
      priceRange: `Starting at ₹${startingPrice.toLocaleString('en-IN')}`,
      timeline: 'Based on project scope',
      estimatedHours: 30,
    });

    setShouldLoadDeferredSections(true);

    window.setTimeout(() => scrollToSection('contact'), 0);
  };

  const handleSelectCategoryForEstimator = (_projectCategory: string) => {
    setShouldLoadDeferredSections(true);
    window.setTimeout(() => scrollToSection('estimator'), 0);
  };

  return (
    <div
      className={`
        min-h-screen
        bg-[#F8F5F0]
        text-[#1F1D1B]
        font-sans
        antialiased
        selection:bg-[#C97872]
        selection:text-white
        transition-colors duration-300
        ${hasScrolled ? 'is-scrolled' : ''}
      `}
    >
      <div
        className="pointer-events-none fixed left-0 right-0 top-0 z-[70] h-px bg-gradient-to-r from-transparent via-[#C97872]/60 to-transparent"
        aria-hidden="true"
      />

      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenEstimator={handleOpenEstimator}
        onOpenContact={handleOpenContact}
      />

       <main>
        <Hero
          onExploreWorks={() => scrollToSection('works')}
          onOpenEstimator={handleOpenEstimator}
          onOpenContact={handleOpenContact}
        />

        <ProjectShowcase
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenEstimator={handleOpenEstimator}
        />

        {shouldLoadDeferredSections ? (
          <Suspense fallback={<DeferredFallback />}>
            {/* Services first: users understand the offer before seeing the calculator. */}
            <ServicesAndPricing onSelectPackage={handleSelectPackage} />

            {/* Estimate second: users can price the project after seeing the packages. */}
            <ProjectEstimator
              onSendBriefToContact={handleSendBriefToContact}
            />

            <WorkProcess />
            <ContactSection initialBrief={estimatorBrief} />
          </Suspense>
        ) : (
          <DeferredFallback />
        )}
      </main>

      {selectedProject && (
        <Suspense fallback={null}>
          <InteractiveCaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onSelectForEstimator={handleSelectCategoryForEstimator}
          />
        </Suspense>
      )}

      {shouldLoadAssistant && (
        <Suspense fallback={null}>
          <InstantAiAssistant />
        </Suspense>
      )}

      <Suspense fallback={null}>
        <Footer
          onScrollToTop={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
          onNavigate={scrollToSection}
        />
      </Suspense>
    </div>
  );
}
