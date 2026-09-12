import React, { useState } from 'react';
import { Code2, ArrowUp, ArrowRight, Github, Linkedin, Twitter, Mail, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollToTop,
  onNavigate,
}) => {
  const [isTopHovered, setIsTopHovered] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const navItems = [
    { id: 'works', label: 'Work' },
    { id: 'estimator', label: 'Project Estimate' },
    { id: 'services', label: 'Services' },
    { id: 'process', label: 'How we work' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#F8F5F0] border-t border-[#DED5CC] pt-14 pb-8">
      {/* Subtle ambient detail */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 w-72 h-72 rounded-full bg-[#F1DFDA]/45 blur-3xl transition-transform duration-700"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-[#DED5CC]">

          {/* Brand */}
          <div className="space-y-3 max-w-md">
            <button
              type="button"
              onClick={onScrollToTop}
              className="group inline-flex items-center gap-2.5 rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97872]/30"
              aria-label="Return to top"
            >
              <div className="relative w-9 h-9 rounded-xl bg-[#FFFCF8] border border-[#DED5CC] flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#C97872]/50 group-hover:shadow-[0_10px_24px_rgba(201,120,114,0.12)]">
                <Code2 className="w-4 h-4 text-[#C97872] transition-transform duration-300 group-hover:rotate-6" />
              </div>

              <span className="font-bold text-[#1F1D1B] text-lg tracking-tight transition-colors duration-300 group-hover:text-[#B06A64]">
                Orion
              </span>

              <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#F1DFDA] text-[#B06A64] border border-[#DED5CC] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#C97872]/40">
                Bengaluru, India 🇮🇳
              </span>
            </button>

            <p className="text-xs leading-relaxed text-[#706B65] max-w-sm">
              We build fast, thoughtful websites and web apps for businesses and
              people with ideas worth building.
            </p>
          </div>

          {/* Quick Nav Links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs font-medium text-[#706B65]"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                onMouseEnter={() => setHoveredNav(item.id)}
                onMouseLeave={() => setHoveredNav(null)}
                className="group inline-flex items-center gap-1 py-1 hover:text-[#C97872] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97872]/30 rounded-md"
              >
                <span>{item.label}</span>
                <ArrowRight
                  className={`w-3 h-3 transition-all duration-200 ₹{
                    hoveredNav === item.id
                      ? 'translate-x-0.5 opacity-100'
                      : 'translate-x-0 opacity-0'
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* Back To Top Button */}
          <button
            type="button"
            onClick={onScrollToTop}
            onMouseEnter={() => setIsTopHovered(true)}
            onMouseLeave={() => setIsTopHovered(false)}
            className="group relative overflow-hidden p-3 rounded-xl bg-[#FFFCF8] text-[#706B65] hover:bg-[#C97872] hover:text-white border border-[#DED5CC] hover:border-[#C97872] transition-all duration-300 text-xs font-medium flex items-center gap-2 shrink-0 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(201,120,114,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97872]/30"
            aria-label="Back to top"
          >
            <span className="relative z-10">Back to top</span>
            <ArrowUp
              className={`relative z-10 w-4 h-4 transition-transform duration-300 ₹{
                isTopHovered ? '-translate-y-0.5' : ''
              }`}
            />
            <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
          </button>

        </div>

        {/* Bottom status bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#706B65]">

          <p className="transition-colors duration-300 hover:text-[#1F1D1B]">
            © 2026 Orion. Websites & web apps, designed and built with modern
            web technology.
          </p>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="group flex items-center gap-1.5 text-[#B06A64] font-medium cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C97872] transition-transform duration-300 group-hover:scale-150" />
              <span className="transition-colors duration-300 group-hover:text-[#C97872]">
                Performance-focused
              </span>
            </span>

            <span className="text-[#DED5CC]">•</span>

            <span className="transition-colors duration-300 hover:text-[#1F1D1B]">
              Built with care
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
};
