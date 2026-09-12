import React from 'react';
import { TESTIMONIALS_DATA } from '../data/portfolioData';
import { ShieldCheck, Star } from 'lucide-react';

const ADDITIONAL_TESTIMONIALS = [
  {
    id: 'indian-testimonial-1',
    author: 'Aarav Mehta',
    role: 'Founder',
    company: 'Mehta & Co.',
    quote:
      'The whole process felt simple and well organised. I could explain what I wanted in plain language, see the progress regularly, and the final website felt polished and easy for our customers to use.',
    rating: 5,
    platform: 'Direct Client',
    avatar: 'https://i.pravatar.cc/150?img=12',
    date: 'Aug 2026',
    projectType: 'Business Website',
  },
  {
    id: 'indian-testimonial-2',
    author: 'Priya Nair',
    role: 'Co-Founder',
    company: 'Nair Studio',
    quote:
      'What stood out was the attention to detail. The website looks professional, works smoothly on mobile, and I always knew what was happening next during the project.',
    rating: 5,
    platform: 'Direct Client',
    avatar: 'https://i.pravatar.cc/150?img=47',
    date: 'Jul 2026',
    projectType: 'Website & Web App',
  },
];

export const Testimonials: React.FC = () => {
  const testimonials = [...TESTIMONIALS_DATA, ...ADDITIONAL_TESTIMONIALS];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-16 md:py-24 border-b border-[#DED5CC]/70 bg-[#F8F5F0]"
    >
      <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-[#C97872]/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-[#DED5CC]/45 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F1DFDA] text-[#B06A64] border border-[#DED5CC] text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CLIENT FEEDBACK</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#1F1D1B] tracking-tight">
            What Clients Say
          </h2>

          <p className="text-[#706B65] text-sm sm:text-base">
            A few words from people Weworked with — from the first idea
            through launch and beyond.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="group relative bg-[#FFFCF8] rounded-3xl p-6 sm:p-8 border border-[#DED5CC] space-y-6 flex flex-col justify-between hover:border-[#C97872]/50 hover:-translate-y-1.5 transition-all duration-500 shadow-sm hover:shadow-xl"
            >
              {/* Subtle cursor-independent hover accent */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_50%_0%,rgba(201,120,114,0.10),transparent_42%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative space-y-4">
                {/* Rating + Platform */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#B06A64]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#B06A64] transition-transform duration-300 group-hover:scale-110"
                        style={{ transitionDelay: `${i * 35}ms` }}
                      />
                    ))}
                  </div>

                  <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-[#F8F5F0] text-[#B06A64] border border-[#DED5CC] transition-colors duration-300 group-hover:border-[#C97872]/50">
                    {t.platform}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-base text-[#1F1D1B] italic leading-relaxed">
                  “{t.quote}”
                </p>
              </div>

              {/* Client Info */}
              <div className="relative pt-4 border-t border-[#DED5CC]/80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#C97872]/40 transition-transform duration-300 group-hover:scale-105"
                  />

                  <div>
                    <h4 className="font-bold text-[#1F1D1B] text-sm">
                      {t.author}
                    </h4>

                    <p className="text-xs text-[#706B65]">
                      {t.role},{' '}
                      <span className="text-[#1F1D1B] font-medium">
                        {t.company}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Date + Project Type */}
                <div className="text-right hidden sm:block">
                  <span className="text-[10px] text-[#706B65]/70 block">
                    {t.date}
                  </span>

                  <span className="text-[11px] text-[#B06A64]">
                    {t.projectType}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
