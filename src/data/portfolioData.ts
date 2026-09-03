import { Project, ClientTestimonial, TechSkill, WorkProcessStep, ServicePackage, BenchmarkComparison, EstimatorOption, FeatureOption } from '../types';

export const DEVELOPER_PROFILE = {
  name: 'Orion',
  title: 'Full-Stack Freelance Developer (React, Node.js & Vite)',
  location: 'Bengaluru, India (IST / UTC+5:30)',
  experienceYears: 1,
  projectsCompleted: '15+',
  email: 'startwithorion@gmail.com',
  techStackList: ['React.js', 'Node.js', 'Express.js', 'Vite', 'Tailwind CSS', 'MongoDB', 'WhatsApp API', 'REST APIs', 'TypeScript', 'HTML5/CSS3'],
  tagline: 'Crafting responsive, high-performance React & Node.js web applications with seamless UX, sub-second load times, and clean code architecture.',
  demoNotice: 'Notice: Featured projects include real deployed web applications running live on Render, built with React, Vite, Node.js, and Tailwind CSS.',
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'whatsapp-ev-fleet',
    title: 'WhatsApp EV Fleet Booking System',
    client: 'Agritech & EV Reaper Fleet Solutions',
    clientRole: 'Operations & Fleet Technology',
    category: 'saas',
    categoryLabel: 'EV Fleet & WhatsApp Booking',
    description: 'A WhatsApp-based Rental & Fleet Booking System designed to make hiring an EV Reaper as simple as sending a message. Farmers book or purchase agricultural machinery by sharing location, crop type, acreage, and preferred date with automatic operator assignment and instant ETA tracking.',
    shortDescription: 'Full-stack WhatsApp conversational booking and automated fleet dispatch system for agricultural EV reapers.',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Booking Flow', value: '100% Digital', trend: 'up' },
      { label: 'Fleet Allocation', value: '<30s Auto', trend: 'up' },
      { label: 'WhatsApp ETA', value: 'Real-time', trend: 'up' },
      { label: 'Lighthouse Speed', value: '99/100', trend: 'up' }
    ],
    lighthouseScores: {
      performance: 99,
      accessibility: 100,
      bestPractices: 100,
      seo: 100
    },
    tags: ['React.js', 'Node.js', 'Express.js', 'WhatsApp API', 'MongoDB', 'REST APIs', 'Vite', 'Tailwind CSS'],
    duration: '3 Weeks',
    year: '2026',
    liveUrl: 'https://hv-ev.onrender.com',
    githubUrl: 'https://github.com',
    featured: true,
    challenge: 'Traditional agricultural machinery hiring is manual, fragmented, and prone to delays. Farmers struggle to find available reaper operators during peak harvest seasons, while fleet managers lack automated tools to track real-time machine availability, acreage pricing, and booking confirmations.',
    solution: 'Built an end-to-end digital booking and fleet dispatch workflow connecting WhatsApp conversational API with a Node.js/Express backend and a responsive React operations dashboard. Farmers share their GPS location, crop type, acreage, and preferred date to get instant automated quotes and real-time operator allocation.',
    deliverables: [
      'WhatsApp-based conversational machinery booking and purchase flow',
      'Farmer location and service-area geofencing identification',
      'Crop type, acreage, and custom service date selection engine',
      'Automatic algorithmic assignment of nearest available reaper & operator',
      'Instant transparent quotation & billing calculation module',
      'Real-time booking status and live ETA updates over WhatsApp',
      'Responsive operations dashboard for fleet and operator management',
      'Post-service rating, farmer feedback collection & review pipeline',
      'Full REST API backend with Express.js and MongoDB database schemas',
      'Live production deployment on Render (https://hv-ev.onrender.com)'
    ],

    interactiveSnippetType: 'whatsapp-booking'
  },
  {
    id: 'tiny-tusk-dentistry',
    title: 'Tiny Tusk – Pediatric Dentistry Website',
    client: 'Tiny Tusk Pediatric Dental Care',
    clientRole: 'Lead Pediatric Dentist & Clinic Founder',
    category: 'landing',
    categoryLabel: 'Pediatric Healthcare Website',
    description: 'Tiny Tusk is a modern, child-friendly pediatric dentistry website designed to make dental care feel comfortable, welcoming, and less intimidating for children and their parents with clear service breakdowns and seamless appointment booking.',
    shortDescription: 'Modern, child-friendly pediatric dentistry web experience with warm interactive UX and appointment scheduling.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Mobile UX Speed', value: '0.4s Instant', trend: 'down' },
      { label: 'Lighthouse Performance', value: '100/100', trend: 'up' },
      { label: 'Core Web Vitals', value: 'Pass 100%', trend: 'up' },
      { label: 'Parent Engagement', value: '+75% Inquiries', trend: 'up' }
    ],
    lighthouseScores: {
      performance: 100,
      accessibility: 100,
      bestPractices: 100,
      seo: 100
    },
    tags: ['React.js', 'Vite', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'SEO Optimization', 'Responsive Design'],
    duration: '2 Weeks',
    year: '2026',
    liveUrl: 'https://pediatric-dentistry-site.onrender.com',
    githubUrl: 'https://github.com',
    featured: true,
    challenge: 'Dental visits frequently cause high anxiety for young children and confusion for parents navigating treatments. Standard medical websites often feel cold, sterile, and clinical, lacking engaging visual storytelling and mobile-first appointment booking.',
    solution: 'Engineered a welcoming, child-friendly web interface with warm pastel aesthetics, friendly mascot storytelling, interactive treatment visualizers, doctor credentials, and an intuitive parent appointment booking pipeline built with React and Tailwind CSS.',
    deliverables: [
      'Child-friendly and playful UI/UX designed specifically for pediatric healthcare',
      'Ultra-responsive desktop, tablet, and mobile interface with zero layout shift',
      'Interactive pediatric dental services and preventive care showcase',
      'Clinic environment virtual tour and dentist credentials profile section',
      'Seamless appointment request and contact inquiry modal system',
      'Parent-focused informational hierarchy with FAQs and preparation tips',
      'Clean component-based React architecture optimized with Vite',
      'Live production deployment on Render (https://pediatric-dentistry-site.onrender.com)'
    ],

    interactiveSnippetType: 'dentistry'
  },
  {
    id: 'readyrx-marketing',
    title: 'ReadyRx – Content Creator & Social Media Marketing Platform',
    client: 'ReadyRx Media & Brand Agency',
    clientRole: 'Creative Marketing Director & Founder',
    category: 'landing',
    categoryLabel: 'Creator & Marketing Platform',
    description: 'A modern digital presence and marketing website designed for a content creator & social media marketing brand. Showcases creative campaigns, growth strategies, brand-building packages, and dynamic portfolio work through a high-converting UI.',
    shortDescription: 'Conversion-focused digital marketing portfolio and creative agency platform built with React & Tailwind CSS.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Conversion Impact', value: 'High CTA', trend: 'up' },
      { label: 'Page Load Speed', value: '0.5s Fast', trend: 'down' },
      { label: 'SEO Lighthouse', value: '100/100', trend: 'up' },
      { label: 'Mobile Score', value: '100% Ready', trend: 'up' }
    ],
    lighthouseScores: {
      performance: 100,
      accessibility: 100,
      bestPractices: 100,
      seo: 100
    },
    tags: ['React.js', 'Vite', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Conversion Strategy', 'Dark Mode UI'],
    duration: '2 Weeks',
    year: '2026',
    liveUrl: 'https://readyrx.onrender.com',
    githubUrl: 'https://github.com',
    featured: true,
    challenge: 'Content creators and modern marketing agencies need a distinctive, high-converting digital presence that conveys visual flair, dynamic storytelling, and clear service packages without sacrificing mobile performance or page speed.',
    solution: 'Developed a sleek, conversion-focused digital presence with bold typography, dynamic gradient highlights, modular service showcase cards, interactive portfolio reels, and instant lead capture forms.',
    deliverables: [
      'Modern content creator portfolio showcasing multi-channel campaigns',
      'Social media marketing, reel production, and brand strategy service showcases',
      'Creative, visually engaging dark-mode UI with high-contrast accents',
      'Responsive desktop and mobile design with smooth micro-interactions',
      'Conversion-focused call-to-action sections with form validation',
      'Clean component-based React architecture with zero script bloat',
      'Semantic HTML5 structure and optimized metadata for SEO discovery',
      'Live production deployment on Render (https://readyrx.onrender.com)'
    ],

    interactiveSnippetType: 'readyrx'
  },
  
];

export const ESTIMATOR_PROJECT_TYPES: EstimatorOption[] = [
  {
    id: 'landing-page',
    title: 'High-Converting Landing Page',
    description: 'Custom single page website built with HTML, CSS, React, Tailwind CSS, and top-tier SEO.',
    basePrice: 8000, // ₹8,000 (~$95)
    baseHours: 15,
    iconName: 'Layout'
  },
  {
    id: 'saas-webapp',
    title: 'SaaS / Web Application MVP',
    description: 'Modern React & Node.js web app with authentication, interactive dashboard & REST APIs.',
    basePrice: 28000, // ₹28,000 (~$335)
    baseHours: 40,
    iconName: 'Cpu'
  },
  {
    id: 'ecommerce',
    title: 'Custom Headless E-Commerce',
    description: 'High performance online store prototype with product catalog, cart & checkout simulator.',
    basePrice: 22000, // ₹22,000 (~$265)
    baseHours: 30,
    iconName: 'ShoppingBag'
  },
  {
    id: 'custom-portal',
    title: 'Client Portal / Admin Tool',
    description: 'Admin dashboard, reporting system, document hub or CRM tool built with Node.js & TypeScript.',
    basePrice: 18000, // ₹18,000 (~$215)
    baseHours: 25,
    iconName: 'ShieldCheck'
  },
  {
    id: 'speed-refactor',
    title: 'SEO & Core Web Vitals Audit',
    description: 'Refactoring legacy sluggish code to hit 95+ PageSpeed & Lighthouse scores.',
    basePrice: 6000, // ₹6,000 (~$70)
    baseHours: 10,
    iconName: 'Zap'
  }
];

export const ESTIMATOR_FEATURES: FeatureOption[] = [
  {
    id: 'stripe-payments',
    category: 'Monetization',
    title: 'Stripe / Razorpay Payment Integration',
    description: '1-click checkout, customer portal, invoices & subscription tier billing.',
    price: 4000,
    hours: 6
  },
  {
    id: 'user-auth',
    category: 'Security',
    title: 'User Auth & JWT / Role Management',
    description: 'Secure login, registration, password resets & permission roles.',
    price: 3000,
    hours: 5
  },
  {
    id: 'cms-integration',
    category: 'Content',
    title: 'CMS / Admin Content Management',
    description: 'Easy content editing dashboard for non-technical team members.',
    price: 3500,
    hours: 5
  },
  {
    id: 'custom-animations',
    category: 'UX & Visuals',
    title: 'Tailwind CSS Micro-Interactions & Motion',
    description: 'Smooth page transitions, scroll effects & interactive micro-interactions.',
    price: 2500,
    hours: 4
  },
  {
    id: 'analytics-seo',
    category: 'Growth',
    title: 'Advanced Technical SEO & Schema Markup',
    description: 'OpenGraph metadata, JSON-LD schema, Google Analytics 4 & Core Web Vitals.',
    price: 2500,
    hours: 4
  },
  {
    id: 'api-database',
    category: 'Backend',
    title: 'Node.js REST API & Database Integration',
    description: 'Node.js & Express endpoints, TypeScript schemas, and query optimization.',
    price: 5000,
    hours: 8
  }
];

export const TESTIMONIALS_DATA: ClientTestimonial[] = [
];

export const TECH_SKILLS: TechSkill[] = [
  {
    name: 'HTML5 & Semantic Structure',
    category: 'frontend',
    experienceYears: 6,
    proficiency: 99,
    icon: 'Code2',
    description: 'Semantic markup, ARIA accessibility, DOM node reduction & WCAG compliance.'
  },
  {
    name: 'CSS3 & Tailwind CSS',
    category: 'frontend',
    experienceYears: 6,
    proficiency: 98,
    icon: 'Palette',
    description: 'Zero runtime CSS, responsive fluid layouts, custom themes & hardware-accelerated animations.'
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'frontend',
    experienceYears: 6,
    proficiency: 98,
    icon: 'FileCode',
    description: 'Async/await pipelines, Web Workers, DOM optimization, Event loop & closure patterns.'
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    experienceYears: 5,
    proficiency: 96,
    icon: 'ShieldCheck',
    description: 'Strict type safety, generic types, utility functions & zero runtime type leaks.'
  },
  {
    name: 'React 19 & Next.js',
    category: 'frontend',
    experienceYears: 6,
    proficiency: 98,
    icon: 'Code2',
    description: 'Server components, custom hooks, virtualized rendering & state management.'
  },
  {
    name: 'Node.js & Express API',
    category: 'backend',
    experienceYears: 5,
    proficiency: 94,
    icon: 'Server',
    description: 'REST APIs, server-side validation, anti-spam middleware, JWT auth & caching.'
  },
  {
    name: 'SEO & Core Web Vitals',
    category: 'performance',
    experienceYears: 6,
    proficiency: 99,
    icon: 'Gauge',
    description: '100/100 Lighthouse scores, JSON-LD schema, open-graph metadata & sub-1s LCP.'
  }
];

export const WORK_PROCESS_STEPS: WorkProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Discovery & Tech Spec Brief',
    duration: '1 - 2 Days',
    description: 'We align on your product goals, target audience, performance requirements, and user journeys. I provide a fixed roadmap with HTML, CSS, React, and Node.js architecture specs.',
    deliverables: ['Tech Stack Architecture Spec', 'Interactive Prototype Wireframes', 'Fixed INR / USD Scope & Timeline'],
    icon: 'Compass'
  },
  {
    stepNumber: '02',
    title: 'Agile Development Sprints',
    duration: '1 - 3 Weeks',
    description: 'I build clean, fully typed modular React & TypeScript components styled with Tailwind CSS, with daily local progress updates and staging links.',
    deliverables: ['Staging Demo Preview', 'Clean Modular Codebase', 'Weekly Progress Walkthroughs'],
    icon: 'Code'
  },
  {
    stepNumber: '03',
    title: 'SEO & Performance Audit',
    duration: '2 - 3 Days',
    description: 'Rigorous cross-device testing across Chrome, Safari, mobile & desktop. I audit Core Web Vitals to guarantee 95+ scores for performance & Technical SEO.',
    deliverables: ['100/100 Lighthouse Audit Report', 'Cross-browser QA Pass Certificate', 'SEO & Accessibility Certification'],
    icon: 'ShieldCheck'
  },
  {
    stepNumber: '04',
    title: 'Deployment & Support',
    duration: 'Ongoing',
    description: 'Seamless deployment to Cloud Run / Vercel / Netlify. I provide full source code ownership, documentation, and 30 days of free support.',
    deliverables: ['Production / Staging Setup', 'Full Source Code Repository', '30-Day Post-Launch Support Guarantee'],
    icon: 'Rocket'
  }
];

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'landing',
    name: 'High-Converting Landing Page',
    tagline: 'Ideal for launching new products, SaaS waitlists, or marketing campaigns with 100/100 SEO.',
    startingPrice: 8000, // ₹8,000 (~$95)
    timeline: '3 - 5 Days',
    idealFor: 'Startups & Founders needing fast conversion & SEO',
    features: [
      'HTML5 + CSS3 + React + Tailwind CSS Stack',
      '100/100 Lighthouse Performance & SEO Score Guarantee',
      'Interactive Micro-Interactions & Smooth Animations',
      'Contact Form with Anti-Spam Honeypot & CAPTCHA',
      'OpenGraph Metadata & Schema Markup for SEO',
      '30 Days Free Post-Launch Maintenance'
    ]
  },
  {
    id: 'fullstack',
    name: 'Custom Web App / SaaS MVP',
    tagline: 'Complete web application with modern React frontend, Node.js API, and TypeScript.',
    startingPrice: 28000, // ₹28,000 (~$335)
    timeline: '2 - 3 Weeks',
    idealFor: 'Founders building B2B SaaS, Client Portals, or Web Apps',
    popular: true,
    features: [
      'Complete React 19 + TypeScript + Tailwind Frontend Architecture',
      'Node.js & Express RESTful API Backend',
      'User Authentication & Role-Based Access Control',
      'Payment Gateway Integration (Razorpay / Stripe)',
      'Real-time Dashboard & Virtualized Data Tables',
      'Comprehensive Technical Documentation & Deployment'
    ]
  },
  {
    id: 'refactor',
    name: 'SEO & Core Web Vitals Audit',
    tagline: 'Transform your slow existing web app into a lightning-fast digital asset.',
    startingPrice: 6000, // ₹6,000 (~$70)
    timeline: '2 - 3 Days',
    idealFor: 'Businesses losing traffic due to slow load speeds',
    features: [
      'In-Depth Lighthouse & Core Web Vitals Diagnostic',
      'Bundle Size Reduction & Unused JS/CSS Elimination',
      'React Component Re-render Bottleneck Fixes',
      'Image Optimization & Lazy Loading Strategy',
      'Sub-1 Second Page Loading Guarantee',
      'Detailed Before & After Performance & SEO Report'
    ]
  }
];

export const BENCHMARK_COMPARISONS: BenchmarkComparison[] = [
  {
    id: 'rendering-opt',
    title: 'React 19 & TypeScript Re-render Optimization',
    standardMetric: '140ms re-render delay (45 re-renders/sec)',
    optimizedMetric: '2ms re-render delay (1 re-render/sec)',
    improvement: '70x Faster UI State Sync',
    description: 'Replacing heavy inline object definitions and un-memoized callbacks with atomic state selector patterns.',
    unoptimizedCode: `// Standard Slow JS Pattern
function ProductList({ items }) {
  const expensiveList = items.filter(i => i.active)
    .map(i => ({ ...i, priceWithTax: i.price * 1.2 }));
    
  return (
    <div>
      {expensiveList.map(item => (
        <ProductCard key={item.id} item={item} onClick={() => alert(item.name)} />
      ))}
    </div>
  );
}`,
    optimizedCode: `// Optimized React + TypeScript Pattern
const ProductList = memo(function ProductList({ items }: Props) {
  const activeItems = useMemo(() => {
    return items.filter(i => i.active);
  }, [items]);

  const handleSelect = useCallback((id: string) => {
    trackProductClick(id);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {activeItems.map(item => (
        <OptimizedProductCard key={item.id} item={item} onSelect={handleSelect} />
      ))}
    </div>
  );
});`
  },
  {
    id: 'virtualized-list',
    title: 'DOM Node Virtualization for Large Datasets',
    standardMetric: '15,000 DOM Nodes (Heavy Lag on Scroll)',
    optimizedMetric: '18 Active DOM Nodes (Constant 60 FPS)',
    improvement: '99.8% DOM Footprint Reduction',
    description: 'Only rendering elements currently visible in the user viewport, maintaining silky 60 FPS scrolling even with 100,000+ items.',
    unoptimizedCode: `// Standard Unoptimized List (Renders 10,000 DOM elements)
function UnoptimizedTable({ rows }) {
  return (
    <div className="overflow-auto h-96">
      {rows.map(row => (
        <div key={row.id} className="p-3 border-b">
          <span>{row.id}</span> - <span>{row.name}</span>
        </div>
      ))}
    </div>
  );
}`,
    optimizedCode: `// Windowed Virtualized Renderer (Renders only visible subset)
function VirtualizedTable({ rows, rowHeight = 48, viewportHeight = 400 }: Props) {
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 2);
  const visibleCount = Math.ceil(viewportHeight / rowHeight) + 4;
  const visibleRows = rows.slice(startIndex, startIndex + visibleCount);

  return (
    <div 
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      className="overflow-auto relative h-[400px]"
    >
      <div style={{ height: \`\${rows.length * rowHeight}px\` }}>
        <div style={{ transform: \`translateY(\${startIndex * rowHeight}px)\` }}>
          {visibleRows.map(row => (
            <RowItem key={row.id} data={row} height={rowHeight} />
          ))}
        </div>
      </div>
    </div>
  );
}`
  }
];
