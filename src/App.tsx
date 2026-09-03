/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectShowcase } from './components/ProjectShowcase';
import { InteractiveCaseStudyModal } from './components/InteractiveCaseStudyModal';
import { ProjectEstimator } from './components/ProjectEstimator';
import { CodeEfficiencyBenchmark } from './components/CodeEfficiencyBenchmark';
import { ServicesAndPricing } from './components/ServicesAndPricing';
import { WorkProcess } from './components/WorkProcess';
import { ContactSection } from './components/ContactSection';
import { InstantAiAssistant } from './components/InstantAiAssistant';
import { Footer } from './components/Footer';
import { Project } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('works');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // State for pre-filling contact form from Estimator
  const [estimatorBrief, setEstimatorBrief] = useState<{
    projectType: string;
    selectedFeatures: string[];
    priceRange: string;
    timeline: string;
    estimatedHours: number;
  } | null>(null);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenEstimator = () => {
    scrollToSection('estimator');
  };

  const handleOpenContact = () => {
    scrollToSection('contact');
  };

  const handleSendBriefToContact = (briefSummary: {
    projectType: string;
    selectedFeatures: string[];
    priceRange: string;
    timeline: string;
    estimatedHours: number;
  }) => {
    setEstimatorBrief(briefSummary);
    scrollToSection('contact');
  };

  const handleSelectPackage = (packageName: string, startingPrice: number) => {
    setEstimatorBrief({
      projectType: packageName,
      selectedFeatures: ['Sprint Architecture', 'QA & 100/100 PageSpeed', '30 Days Maintenance'],
      priceRange: `From $${startingPrice.toLocaleString()}`,
      timeline: 'Standard Sprint',
      estimatedHours: 30
    });
    scrollToSection('contact');
  };

  const handleSelectCategoryForEstimator = (projectCategory: string) => {
    scrollToSection('estimator');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenEstimator={handleOpenEstimator}
        onOpenContact={handleOpenContact}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onExploreWorks={() => scrollToSection('works')}
          onOpenEstimator={handleOpenEstimator}
          onOpenContact={handleOpenContact}
        />

        {/* Selected Case Studies */}
        <ProjectShowcase
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenEstimator={handleOpenEstimator}
        />

        {/* Project Scope & Cost Estimator */}
        <ProjectEstimator
          onSendBriefToContact={handleSendBriefToContact}
        />

        {/* Code Efficiency & Performance Benchmarks */}
        <CodeEfficiencyBenchmark />

        {/* Fixed Services & Rates */}
        <ServicesAndPricing
          onSelectPackage={handleSelectPackage}
        />

        {/* Predictable Work Process */}
        <WorkProcess />

        {/* Start A Project Sprint / Contact */}
        <ContactSection
          initialBrief={estimatorBrief}
        />
      </main>

      {/* Interactive Case Study Modal */}
      <InteractiveCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectForEstimator={handleSelectCategoryForEstimator}
      />

      {/* Instant Flash-Lite AI Assistant Floating Widget */}
      <InstantAiAssistant />

      {/* Footer */}
      <Footer
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigate={scrollToSection}
      />

    </div>
  );
}
