import React, { useState } from 'react';
import { Code2, Calculator, Send, Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenEstimator: () => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenEstimator,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [estimatorHovered, setEstimatorHovered] = useState(false);
  const [contactHovered, setContactHovered] = useState(false);

  const navItems = [
    { id: "works", label: "Work" },
    { id: "services", label: "Services" },
    { id: "estimator", label: "Project Estimate" },
    { id: "process", label: "How we work" },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F5F0]/90 backdrop-blur-md border-b border-[#DED5CC] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">

        {/* Brand / Logo */}
        <button
          type="button"
          onClick={() => handleNavClick("hero")}
          className="flex items-center gap-3 cursor-pointer group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97872]/30 rounded-xl"
          id="nav-logo"
          aria-label="Go to homepage"
        >
          <div className="relative w-10 h-10 rounded-xl bg-[#C97872] p-[1px] shadow-sm shadow-[#C97872]/10 transition-all duration-300 group-hover:scale-105 group-hover:-rotate-1 group-hover:shadow-[0_10px_24px_rgba(201,120,114,0.2)]">
            <div className="w-full h-full bg-[#F8F5F0] rounded-[11px] flex items-center justify-center overflow-hidden">
              <Code2 className="w-5 h-5 text-[#C97872] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#1F1D1B] text-base sm:text-lg tracking-tight transition-colors duration-300 group-hover:text-[#B06A64]">
                Orion
              </span>

              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#F1DFDA] text-[#B06A64] border border-[#DED5CC] transition-all duration-300 group-hover:border-[#C97872]/40 group-hover:-translate-y-0.5">
                Bengaluru, India 🇮🇳
              </span>
            </div>

            <p className="text-xs text-[#706B65] tracking-wide hidden sm:block">
              Websites • Web Apps • E-commerce • SEO
            </p>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav
          aria-label="Main navigation"
          className="hidden lg:flex items-center gap-1 bg-[#FFFCF8] p-1.5 rounded-full border border-[#DED5CC] text-sm font-medium shadow-sm"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const isHovered = hoveredNav === item.id;

            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => setHoveredNav(item.id)}
                onMouseLeave={() => setHoveredNav(null)}
                className={`group relative px-4 py-1.5 rounded-full transition-all duration-300 text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97872]/30 ${
                  isActive
                    ? "bg-[#1F1D1B] text-[#F8F5F0] shadow-sm"
                    : "text-[#706B65] hover:text-[#1F1D1B] hover:bg-[#F1DFDA]"
                }`}
              >
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  {item.label}
                  <ArrowRight
                    className={`w-3 h-3 transition-all duration-200 ${
                      isHovered
                        ? "translate-x-0.5 opacity-100"
                        : "translate-x-0 opacity-0"
                    }`}
                  />
                </span>
              </button>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Project Estimator */}
          <button
            id="header-estimator-btn"
            onClick={onOpenEstimator}
            onMouseEnter={() => setEstimatorHovered(true)}
            onMouseLeave={() => setEstimatorHovered(false)}
            className="hidden sm:inline-flex relative overflow-hidden items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#FFFCF8] text-[#706B65] hover:text-[#1F1D1B] border border-[#DED5CC] hover:border-[#C97872] transition-all duration-300 shadow-sm hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(201,120,114,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97872]/30"
          >
            <Calculator className={`relative z-10 w-3.5 h-3.5 text-[#C97872] transition-transform duration-300 ${estimatorHovered ? "rotate-6 scale-110" : ""}`} />
            <span className="relative z-10">Project Estimate</span>
            <span className="absolute inset-0 -translate-x-full bg-[#F1DFDA]/60 transition-transform duration-500 group-hover:translate-x-0" />
          </button>

          {/* Primary CTA */}
          <button
            id="header-contact-btn"
            onClick={onOpenContact}
            onMouseEnter={() => setContactHovered(true)}
            onMouseLeave={() => setContactHovered(false)}
            className="group relative overflow-hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#C97872] text-white hover:bg-[#B06A64] transition-all duration-300 shadow-md shadow-[#C97872]/15 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(201,120,114,0.24)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97872]/30"
          >
            <span className="relative z-10">Start a Project</span>
            <Send className={`relative z-10 w-3.5 h-3.5 transition-transform duration-300 ${contactHovered ? "translate-x-0.5 -translate-y-0.5 rotate-[-8deg]" : ""}`} />
            <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#FFFCF8] text-[#706B65] hover:text-[#1F1D1B] hover:border-[#C97872] border border-[#DED5CC] transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97872]/30"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="block transition-transform duration-300" style={{ transform: mobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F8F5F0] border-b border-[#DED5CC] px-4 pt-3 pb-6 space-y-4 animate-[fadeIn_200ms_ease-out]">

          {/* Simple Status / Availability */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#DED5CC] text-xs text-[#706B65]">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C97872] transition-transform duration-300 hover:scale-150" />
              Available for projects
            </span>

            <span className="text-[#B06A64] font-medium">
              Taking new work
            </span>
          </div>

          {/* Mobile Navigation */}
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`group w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97872]/30 ${
                  activeTab === item.id
                    ? "bg-[#1F1D1B] text-[#F8F5F0] border-[#1F1D1B] shadow-sm"
                    : "bg-[#FFFCF8] text-[#706B65] hover:bg-[#F1DFDA] hover:text-[#1F1D1B] hover:-translate-y-0.5 border-[#DED5CC] hover:border-[#C97872]/50"
                }`}
              >
                <span className="flex items-center justify-between gap-2">
                  {item.label}
                  <ArrowRight className="w-3.5 h-3.5 opacity-40 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </button>
            ))}
          </div>

          {/* Mobile Actions */}
          <div className="pt-1 flex flex-col gap-2">

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEstimator();
              }}
              className="group w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-[#FFFCF8] text-[#706B65] hover:text-[#1F1D1B] border border-[#DED5CC] hover:border-[#C97872] hover:bg-[#F1DFDA] hover:-translate-y-0.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97872]/30"
            >
              <Calculator className="w-4 h-4 text-[#C97872] transition-transform duration-300 group-hover:rotate-6" />
              <span>Get a Project Estimate</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="group w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-[#C97872] text-white hover:bg-[#B06A64] hover:-translate-y-0.5 transition-all duration-300 shadow-md shadow-[#C97872]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97872]/30"
            >
              <span>Start a Project</span>
              <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

          </div>
        </div>
      )}
    </header>
  );
};
