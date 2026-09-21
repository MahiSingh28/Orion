import React from 'react';
import {
  Code2,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  ArrowUpRight,
} from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollToTop,
  onNavigate,
}) => {


  return (
    <footer className="relative bg-[#F8F5F0] text-[#1F1D1B] border-t border-[#DED5CC] pt-16 pb-8">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">

        {/* Main editorial footer */}
        <div className="grid grid-cols-1 gap-12 pb-14 md:grid-cols-2 md:gap-16">

           {/* Brand / intro */}
          <div className="pt-1">
            <button
              type="button"
              onClick={onScrollToTop}
              aria-label="Return to top"
              className="group inline-flex items-center gap-3 text-left rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97872]/30"
            >
              <Code2 className="h-7 w-7 text-[#1F1D1B] transition-transform duration-300 group-hover:-rotate-6" />
              <span className="text-5xl font-semibold tracking-[-0.04em] text-[#C97872] transition-colors duration-300 group-hover:text-[#B06A64]">
                Orion
              </span>
            </button>

            <div className="mt-8 h-px w-12 bg-[#1F1D1B]" />

            <p className="mt-5 max-w-lg text-base leading-8 text-[#706B65]"><strong>
              Not just websites. Digital experiences built to move your business
              forward.</strong>
            </p>
          </div>

          {/* Contact / social */}
          <div className="flex flex-col items-start pt-7 md:items-end md:pt-8 md:text-right">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#706B65]">
              Inquiries
            </p>

            <a
              href="mailto:startwithorion@gmail.com"
              className="mt-5 text-base text-[#1F1D1B] transition-colors duration-300 hover:text-[#B06A64]"
            >
              startwithorion@gmail.com
            </a>

            <a
              href="tel:+91123456789"
              className="mt-3 block text-base text-[#1F1D1B] transition-colors duration-300 hover:text-[#B06A64]"
            >
              +91 12345 6789
            </a>

            <p className="mt-3 text-base text-[#1F1D1B]">
              Bengaluru — India
            </p>

            <div className="mt-8 flex items-center gap-5">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="transition-all duration-300 hover:-translate-y-1 hover:text-[#B06A64]"
              >
                <Instagram className="h-5 w-5" />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="transition-all duration-300 hover:-translate-y-1 hover:text-[#B06A64]"
              >
                <Linkedin className="h-5 w-5" />
              </a>

              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="transition-all duration-300 hover:-translate-y-1 hover:text-[#B06A64]"
              >
                <Code2 className="h-5 w-5" />
              </a>

              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="transition-all duration-300 hover:-translate-y-1 hover:text-[#B06A64]"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="border-t border-[#DED5CC] pt-5">
          <div className="flex flex-col gap-3 text-xs text-[#706B65] sm:flex-row sm:items-center sm:justify-between">
            <p>
              © 2026 Orion. Websites &amp; web apps, designed and built with care.
            </p>

            <button
              type="button"
              onClick={onScrollToTop}
              className="group inline-flex items-center gap-2 self-start font-medium text-[#1F1D1B] transition-colors duration-300 hover:text-[#B06A64] sm:self-auto"
            >
              Back to top
              <ArrowUpRight className="h-3.5 w-3.5 rotate-[-45deg] transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
