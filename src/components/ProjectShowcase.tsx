import React, { useState, useMemo } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { 
  Search,
  ExternalLink,
  Gauge,
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

interface ProjectShowcaseProps {
  onSelectProject: (project: Project) => void;
  onOpenEstimator: () => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  onSelectProject,
  onOpenEstimator,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Categories list
  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'saas', label: 'Web Apps & SaaS' },
    { id: 'landing', label: 'Business Websites' },
    { id: 'ecommerce', label: 'E-Commerce' },
  ];

  // Popular filter tags
  const popularTags = [
    'React.js',
    'Node.js',
    'Express.js',
    'WhatsApp API',
    'MongoDB',
    'Vite',
    'Tailwind CSS',
    'SEO',
  ];

  // Filter logic
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((p) => {
      const matchesCategory =
        selectedCategory === 'all' || p.category === selectedCategory;

      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesTag =
        selectedTag === 'all' || p.tags.includes(selectedTag);

      return matchesCategory && matchesSearch && matchesTag;
    });
  }, [selectedCategory, searchQuery, selectedTag]);

  const handleProjectMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    card.style.setProperty(
      '--spot-x',
      `${((event.clientX - rect.left) / rect.width) * 100}%`
    );
    card.style.setProperty(
      '--spot-y',
      `${((event.clientY - rect.top) / rect.height) * 100}%`
    );
  };

  const handleProjectMouseLeave = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.currentTarget.style.setProperty('--spot-x', '50%');
    event.currentTarget.style.setProperty('--spot-y', '50%');
  };

  return (
    <section
      id="works"
      className="relative overflow-hidden border-b border-[#DED5CC]/70 bg-[#F8F5F0] py-20 md:py-28"
    >
      {/* Editorial background details */}
      <div className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-[#C97872]/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-40 bottom-40 h-96 w-96 rounded-full bg-[#DED5CC]/50 blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C97872]/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Section Header */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="text-[10px] font-bold tracking-[0.28em] text-[#B06A64]">
                01 / SELECTED WORK
              </span>
              <span className="h-px w-16 bg-[#C97872]/50" />
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#706B65]">
                Websites · Web Apps · E-Commerce
              </span>
            </div>

            <h2 className="max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.055em] leading-[0.94] text-[#1F1D1B]">
              Work that looks good.
              <br />
              <span className="text-[#B06A64]">Works even better.</span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm sm:text-base leading-7 text-[#706B65]">
              A selection of websites and web apps We designed and built.
              Explore the projects, see the thinking behind them, and open the
              interactive case study for the details.
            </p>
          </div>

          <div className="lg:col-span-4 lg:pb-1">
            <div className="relative overflow-hidden rounded-3xl border border-[#1F1D1B] bg-[#1F1D1B] p-6 text-[#FFFCF8] shadow-xl shadow-[#1F1D1B]/10">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#C97872]/25 blur-2xl" />
              <div className="relative flex items-start justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#DED5CC]">
                  Portfolio
                </span>
                <span className="text-3xl font-black text-[#C97872]">
                  {String(PROJECTS_DATA.length).padStart(2, '0')}
                </span>
              </div>
              <div className="relative mt-7 grid grid-cols-2 gap-4 border-t border-white/15 pt-4">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#DED5CC]">
                    Approach
                  </span>
                  <span className="mt-1 block text-sm font-semibold">
                    Design → Build
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#DED5CC]">
                    Focus
                  </span>
                  <span className="mt-1 block text-sm font-semibold">
                    Useful by default
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Bar & Search Input */}
        <div className="relative rounded-[1.75rem] border border-[#DED5CC] bg-[#FFFCF8]/90 p-3 shadow-lg shadow-[#1F1D1B]/5 backdrop-blur-sm space-y-3">

          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">

            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs font-medium">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  id={`cat-tab-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-[#DED5CC] text-[#3B2F2A] font-bold border border-[#DED5CC] shadow-sm'
                      : 'text-[#706B65] hover:text-[#3B2F2A] hover:bg-[#DED5CC]/50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-[#706B65] absolute left-3.5 top-1/2 -translate-y-1/2" />

              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F8F5F0] text-[#3B2F2A] placeholder-[#706B65] text-xs pl-9 pr-4 py-2.5 rounded-xl border border-[#DED5CC] focus:outline-none focus:border-[#C97872] focus:ring-2 focus:ring-[#C97872]/10 transition-all"
              />
            </div>

          </div>

          {/* Quick Tag Pills */}
          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-[#DED5CC]/70 text-xs">
            <span className="text-[#706B65] font-sans text-[11px]">
              Filter by technology:
            </span>

            {/* All */}
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                selectedTag === 'all'
                  ? 'bg-[#C97872]/20 text-[#B06A64] font-semibold border border-[#C97872]/40'
                  : 'text-[#706B65] hover:text-[#3B2F2A] hover:bg-[#DED5CC]/40'
              }`}
            >
              All
            </button>

            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  setSelectedTag(selectedTag === tag ? 'all' : tag)
                }
                className={`px-2.5 py-1 rounded-lg font-sans transition-all ${
                  selectedTag === tag
                    ? 'bg-[#C97872]/20 text-[#B06A64] font-semibold border border-[#C97872]/40'
                    : 'text-[#706B65] hover:text-[#3B2F2A] bg-[#F8F5F0]/70 border border-[#DED5CC]/70'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-[#FFFCF8]/50 rounded-2xl border border-[#DED5CC] space-y-3">
            <p className="text-[#706B65] font-semibold text-base">
              No projects match those filters.
            </p>

            <p className="text-xs text-[#706B65]">
              Try a different search or reset the filters.
            </p>

            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSelectedTag('all');
              }}
              className="px-4 py-2 rounded-xl bg-[#DED5CC] text-[#3B2F2A] text-xs font-medium hover:bg-[#DED5CC] transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">

            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                onMouseMove={handleProjectMouseMove}
                onMouseLeave={handleProjectMouseLeave}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-[1.6rem] border shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl ${
                  index === 0
                    ? 'md:col-span-2 lg:col-span-2 bg-[#1F1D1B] border-[#1F1D1B] text-[#FFFCF8]'
                    : 'bg-[#FFFCF8] border-[#DED5CC]'
                }`}
                style={{
                  backgroundImage:
                    'radial-gradient(circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(201, 120, 114, 0.13), transparent 30%)',
                }}
              >

                <div>

                  {/* Card Image Header */}
                  <div className={`relative overflow-hidden bg-[#F8F5F0] ${
                      index === 0 ? 'h-64 sm:h-72 lg:h-[22rem]' : 'h-52 sm:h-56'
                    }`}>

                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Warm Image Overlay */}
                    <div className={`absolute inset-0 ${
                      index === 0
                        ? 'bg-gradient-to-t from-[#1F1D1B] via-[#1F1D1B]/20 to-transparent'
                        : 'bg-gradient-to-t from-[#1F1D1B]/80 via-[#1F1D1B]/10 to-transparent'
                    }`} />

                    {/* Category Badge & Lighthouse Pill */}
                    {index === 0 && (
                      <span className="absolute bottom-4 right-4 z-10 rounded-full border border-white/20 bg-[#1F1D1B]/55 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                        Featured project
                      </span>
                    )}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">

                      {/* Category */}
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-sans font-bold bg-[#F8F5F0]/90 backdrop-blur-md text-[#B06A64] border border-[#C97872]/40">
                        {project.categoryLabel}
                      </span>

                      {/* Lighthouse */}
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#F8F5F0]/90 backdrop-blur-md text-[10px] font-sans text-[#B06A64] border border-[#DED5CC]">
                        <Gauge className="w-3 h-3 text-[#B06A64]" />
                        <span>
                          {project.lighthouseScores.performance} / 100
                        </span>
                      </div>

                    </div>

                    {/* Primary Highlight Metric Overlay */}
                    <div className="absolute bottom-3 left-3 bg-[#F8F5F0]/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#DED5CC] text-xs shadow-sm">
                      <span className="text-[#706B65] block text-[10px]">
                        Project Highlight
                      </span>

                      <span className="text-[#B06A64] font-bold font-sans">
                        {project.metrics[0].label}: {project.metrics[0].value}
                      </span>
                    </div>

                  </div>

                  {/* Card Body */}
                  <div className={`p-5 sm:p-6 space-y-3 ${
                    index === 0 ? 'lg:p-7' : ''
                  }`}>

                    {/* Client + Year */}
                    <div className="flex items-center justify-between text-xs text-[#706B65] font-sans">
                      <span>{project.client}</span>
                      <span>{project.year}</span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-base font-bold text-[#3B2F2A] group-hover:text-[#B06A64] transition-colors line-clamp-1">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[#706B65] line-clamp-2 leading-relaxed">
                      {project.shortDescription}
                    </p>

                    {/* Tags List */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.slice(0, 4).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-sans bg-[#F8F5F0] text-[#706B65] border border-[#DED5CC]"
                        >
                          {tag}
                        </span>
                      ))}

                      {project.tags.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-sans text-[#706B65]">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>

                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className={`p-5 pt-0 mt-4 flex items-center justify-between gap-2 ${
                  index === 0
                    ? 'border-t border-white/15'
                    : 'border-t border-[#DED5CC]/70'
                }`}>

                  {/* View Project */}
                  <button
                    onClick={() => onSelectProject(project)}
                    className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-[#DED5CC] hover:bg-[#DED5CC] text-[#3B2F2A] border border-[#DED5CC]/80 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Visit Live Site */}
                  {project.liveUrl &&
                    project.liveUrl.startsWith('http') && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2.5 rounded-xl font-bold text-xs bg-[#C97872] hover:bg-[#B06A64] text-white transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-sm shadow-[#C97872]/20"
                        title={`Visit ${project.title} live`}
                      >
                        <span>Visit Live Site</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                </div>

              </div>
            ))}

          </div>
        )}

        {/* Bottom CTA Card */}
        <div className="relative overflow-hidden rounded-[1.75rem] border border-[#1F1D1B] bg-[#1F1D1B] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-7 shadow-2xl shadow-[#1F1D1B]/15">
          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[#C97872]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-[#C97872]/10 blur-3xl" />

          <div className="space-y-2 text-center md:text-left">

            <h3 className="text-xl sm:text-2xl font-black text-[#FFFCF8]">
              Have a project like this in mind?
            </h3>

            <p className="text-[#DED5CC] text-xs sm:text-sm max-w-xl">
              Tell me what you’re building and I’ll help you work out the right scope, timeline, and next steps.
            </p>

          </div>

          {/* CTA */}
          <button
            onClick={onOpenEstimator}
            className="px-6 py-3.5 rounded-xl bg-[#C97872] text-white font-bold text-xs sm:text-sm hover:bg-[#B06A64] transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-[#C97872]/20"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Get a Project Estimate</span>
          </button>

        </div>

      </div>
    </section>
  );
};