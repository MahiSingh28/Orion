import React from 'react';
import { SERVICE_PACKAGES } from '../data/portfolioData';
import {
  CheckCircle2,
  ArrowRight,
  Clock,
  IndianRupee,
} from 'lucide-react';

interface ServicesProps {
  onSelectPackage: (packageName: string, startingPrice: number) => void;
}

export const ServicesAndPricing: React.FC<ServicesProps> = ({
  onSelectPackage,
}) => {
  const handleCardMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    card.style.setProperty(
      '--mouse-x',
      `${((event.clientX - rect.left) / rect.width) * 100}%`
    );
    card.style.setProperty(
      '--mouse-y',
      `${((event.clientY - rect.top) / rect.height) * 100}%`
    );
  };

  const handleCardMouseLeave = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.currentTarget.style.setProperty('--mouse-x', '50%');
    event.currentTarget.style.setProperty('--mouse-y', '50%');
  };

  const selectPackage = (pkg: (typeof SERVICE_PACKAGES)[number]) => {
    onSelectPackage(pkg.name, pkg.startingPrice);
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden py-16 md:py-24 border-b border-[#DED5CC]/70 bg-[#F8F5F0]"
    >
      {/* Ambient interaction layer */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#C97872]/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-[#DED5CC]/45 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F1DFDA] text-[#B06A64] border border-[#DED5CC] text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <IndianRupee className="w-3.5 h-3.5" />
            <span>SERVICES & PRICING</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#1F1D1B] tracking-tight">
            Simple Packages. Clear Pricing.
          </h2>

          <p className="text-[#706B65] text-sm sm:text-base">
            Choose a starting package based on what you need. Every project
            has a clear scope, timeline, regular progress updates, and support
            after launch.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {SERVICE_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              role="button"
              tabIndex={0}
              aria-label={`Choose ${pkg.name}`}
              onClick={() => selectPackage(pkg)}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  selectPackage(pkg);
                }
              }}
              className={`group relative overflow-visible rounded-3xl p-8 border flex flex-col justify-between cursor-pointer outline-none transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.015] hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-[#C97872] focus-visible:ring-offset-2 ${
                pkg.popular
                  ? 'bg-gradient-to-b from-[#F1DFDA] via-[#FFFCF8] to-[#F8F5F0] border-[#C97872] shadow-xl shadow-[#1F1D1B]/10 scale-[1.02] lg:-translate-y-2'
                  : 'bg-[#FFFCF8] border-[#DED5CC] hover:border-[#C97872]/50 shadow-sm'
              }`}
              style={{
                backgroundImage:
                  'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(201, 120, 114, 0.11), transparent 32%)',
              }}
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(201,120,114,0.12),transparent_34%)]" />

              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap px-4 py-1 rounded-full bg-[#C97872] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-transform duration-300 group-hover:scale-105">
                  Most Requested
                </div>
              )}

              <div className="relative space-y-6">
                {/* Header */}
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold text-[#1F1D1B] transition-colors duration-300 group-hover:text-[#B06A64]">
                      {pkg.name}
                    </h3>
                    <span className="text-[10px] uppercase tracking-wider text-[#706B65] opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      View package
                    </span>
                  </div>

                  <p className="text-xs text-[#706B65] mt-2 leading-relaxed">
                    {pkg.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="bg-[#F8F5F0] p-4 rounded-2xl border border-[#DED5CC] shadow-sm transition-all duration-300 group-hover:border-[#C97872]/40 group-hover:shadow-md">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-[#706B65] text-xs">
                      Starting at
                    </span>

                    <span className="text-2xl sm:text-3xl font-black text-[#B06A64] tracking-tight">
                      ₹{pkg.startingPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#706B65] mt-2">
                    <Clock className="w-3.5 h-3.5 text-[#B06A64] transition-transform duration-300 group-hover:rotate-[-8deg]" />
                    <span>Typical timeline: {pkg.timeline}</span>
                  </div>
                </div>

                {/* Ideal For */}
                <div className="text-xs text-[#706B65] bg-[#F8F5F0] p-3 rounded-xl border border-[#DED5CC] transition-all duration-300 group-hover:border-[#DED5CC] group-hover:-translate-y-0.5">
                  <strong className="text-[#1F1D1B] block text-[10px] uppercase tracking-wider mb-1">
                    Best for
                  </strong>

                  <span>{pkg.idealFor}</span>
                </div>

                {/* Feature Checklist */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold text-[#1F1D1B] uppercase tracking-wider">
                    What's included
                  </span>

                  <ul className="space-y-2.5 text-xs text-[#706B65]">
                    {pkg.features.map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 transition-transform duration-300 group-hover:translate-x-0.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#B06A64] shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" />

                        <span className="leading-tight">
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  selectPackage(pkg);
                }}
                className={`relative overflow-hidden group/cta w-full mt-8 py-3.5 rounded-2xl font-semibold text-xs transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C97872] ${
                  pkg.popular
                    ? 'bg-[#C97872] text-white hover:bg-[#B06A64] shadow-lg shadow-[#1F1D1B]/10'
                    : 'bg-[#DED5CC] text-[#1F1D1B] hover:bg-[#CFC4BA] border border-[#DED5CC]'
                }`}
              >
                <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-white/15 transition-transform duration-700 group-hover/cta:translate-x-[420%]" />
                <span className="relative">Choose This Package</span>
                <ArrowRight className="relative w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
