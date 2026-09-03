import React, { useState, useMemo } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { 
  Search, 
  ExternalLink, 
  Gauge, 
  ArrowRight, 
  Sparkles, 
  Filter, 
  Star, 
  Play, 
  Layers,
  Zap,
  Check
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
    { id: 'saas', label: 'EV Fleet & SaaS' },
    { id: 'landing', label: 'Healthcare & Marketing' },
    { id: 'ecommerce', label: 'E-Commerce' },
  ];

  // Popular filter tags
  const popularTags = ['React.js', 'Node.js', 'Express.js', 'WhatsApp API', 'MongoDB', 'Vite', 'Tailwind CSS', 'SEO'];

  // Filter logic
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch = 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTag = selectedTag === 'all' || p.tags.includes(selectedTag);

      return matchesCategory && matchesSearch && matchesTag;
    });
  }, [selectedCategory, searchQuery, selectedTag]);

  return (
    <section id="works" className="py-16 md:py-24 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>FEATURED PRODUCTION PROJECTS & CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
              Real-World Applications. <br />
              <span className="text-emerald-400">Deployed Live & High-Performing.</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Explore full-stack and front-end production web applications built with React, Node.js, Express, WhatsApp API, MongoDB, Vite, and Tailwind CSS.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs font-mono shrink-0">
            <div>
              <span className="text-slate-400 block">Avg. Lighthouse</span>
              <span className="text-emerald-400 font-bold text-base">99.8 / 100</span>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div>
              <span className="text-slate-400 block">Live Deployment</span>
              <span className="text-emerald-400 font-bold text-base">Render Production</span>
            </div>
          </div>
        </div>

        {/* Filters Bar & Search Input */}
        <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800/80 space-y-4">
          
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
                      ? 'bg-slate-800 text-slate-100 font-bold border border-slate-700 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search stack, title, feature..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 text-slate-200 placeholder-slate-500 text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500/80 transition-all"
              />
            </div>

          </div>

          {/* Quick Tag Pills */}
          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-800/60 text-xs">
            <span className="text-slate-500 font-mono text-[11px]">Filter by Stack:</span>
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                selectedTag === 'all'
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Tech
            </button>
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? 'all' : tag)}
                className={`px-2.5 py-1 rounded-lg font-mono transition-all ${
                  selectedTag === tag
                    ? 'bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-950/60 border border-slate-800/60'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-3">
            <p className="text-slate-300 font-semibold text-base">No projects found matching your filter criteria.</p>
            <p className="text-xs text-slate-500">Try clearing your search query or selecting "All Projects".</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSelectedTag('all');
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-medium hover:bg-slate-700"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-slate-900/90 rounded-2xl border border-slate-800/90 overflow-hidden shadow-xl hover:border-slate-700 transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Card Image Header */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    {/* Category Badge & Lighthouse Pill */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                        {project.categoryLabel}
                      </span>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-mono text-amber-300 border border-amber-500/30">
                        <Gauge className="w-3 h-3 text-emerald-400" />
                        <span>{project.lighthouseScores.performance} / 100 Speed</span>
                      </div>
                    </div>

                    {/* Primary Highlight Metric Overlay */}
                    <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800/80 text-xs">
                      <span className="text-slate-400 block text-[10px]">Client Metric Gain</span>
                      <span className="text-emerald-400 font-bold font-mono">
                        {project.metrics[0].label}: {project.metrics[0].value}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                      <span>{project.client}</span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {project.shortDescription}
                    </p>

                    {/* Tags List */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.slice(0, 4).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-slate-400 border border-slate-800"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-5 pt-0 border-t border-slate-800/60 mt-4 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700/80 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {project.liveUrl && project.liveUrl.startsWith('http') && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-sm shadow-emerald-500/20"
                      title={`Visit ${project.title} live`}
                    >
                      <span>Live Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA Card */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-8 rounded-3xl border border-indigo-900/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold text-slate-100">
              Have a similar web application project in mind?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              I provide fixed-price scope proposals, 100/100 PageSpeed guarantees, and clear weekly sprint deliverables.
            </p>
          </div>

          <button
            onClick={onOpenEstimator}
            className="px-6 py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs sm:text-sm hover:bg-emerald-400 transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-emerald-500/20"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Calculate Your Project Scope Now</span>
          </button>
        </div>

      </div>
    </section>
  );
};
