import { Project, ClientTestimonial, TechSkill, WorkProcessStep, ServicePackage, BenchmarkComparison, EstimatorOption, FeatureOption } from '../types';

export const DEVELOPER_PROFILE = {
  name: 'Orion',
  title: 'Web Developer • React, Node.js & TypeScript',
  location: 'Bengaluru, India (IST / UTC+5:30)',
  experienceYears: 1,
  projectsCompleted: '15+',
  email: 'startwithorion@gmail.com',
  techStackList: ['React.js', 'Node.js', 'Express.js', 'Vite', 'Tailwind CSS', 'MongoDB', 'WhatsApp API', 'REST APIs', 'TypeScript', 'HTML5/CSS3'],
  tagline: 'We build thoughtful, responsive websites and web apps that are easy to use, fast to load, and built around real business needs.',
  demoNotice: 'Featured projects include live websites and web applications built with modern web technology.',
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'whatsapp-ev-fleet',
    title: 'WhatsApp EV Fleet Booking System',
    client: 'Agritech & EV Reaper Fleet Solutions',
    clientRole: 'Operations & Fleet Technology',
    category: 'saas',
    categoryLabel: 'Fleet & Booking Web App',
    description: 'A booking system that makes hiring agricultural machinery as simple as sending a WhatsApp message. Customers share their location, crop type, acreage, and preferred date while the system handles booking details and operator assignment.',
    shortDescription: 'A WhatsApp booking and fleet management system for agricultural machinery.',
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
    description: 'A warm, child-friendly dental website designed to make care feel approachable for children and easy to understand for parents, with clear services and appointment requests.',
    shortDescription: 'A friendly pediatric dental website with clear information and appointment booking.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Mobile UX Speed', value: '0.4s Instant', trend: 'down' },
      { label: 'Lighthouse Performance', value: 'Strong', trend: 'up' },
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
    categoryLabel: 'Creator & Marketing Website',
    description: 'A modern marketing website for a content creator and social media brand, built to present services, creative work, and campaigns clearly while guiding visitors toward getting in touch.',
    shortDescription: 'A polished marketing and portfolio website for a creative brand.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Conversion Impact', value: 'High CTA', trend: 'up' },
      { label: 'Page Load Speed', value: '0.5s Fast', trend: 'down' },
      { label: 'SEO Lighthouse', value: 'Strong', trend: 'up' },
      { label: 'Mobile Score', value: '100% Ready', trend: 'up' }
    ],
    lighthouseScores: {
      performance: 100,
      accessibility: 100,
      bestPractices: 100,
      seo: 100
    },
    tags: ['React.js', 'Vite', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Conversion Strategy', 'warm UI'],
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
      'Creative, visually engaging warm UI with high-contrast accents',
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
    title:  'Landing Page',
    description: 'A focused, responsive website for launching a product, service, campaign, or business online.',
    basePrice: 8000, // ₹8,000
    baseHours: 15,
    iconName: 'Layout'
  },
  {
    id: 'saas-webapp',
    title:  'Web Application MVP',
    description: 'A custom web application with the core screens, features, authentication, and backend needed for an MVP.',
    basePrice: 28000, // ₹28,000
    baseHours: 40,
    iconName: 'Cpu'
  },
  {
    id: 'ecommerce',
    title:  'E-Commerce Website',
    description: 'An online store with product browsing, cart flow, and a practical checkout experience.',
    basePrice: 22000, // ₹22,000
    baseHours: 30,
    iconName: 'ShoppingBag'
  },
  {
    id: 'custom-portal',
    title:  'Client Portal / Admin Tool',
    description: 'Admin dashboard, reporting system, document hub or CRM tool built with Node.js & TypeScript.',
    basePrice: 18000, // ₹18,000
    baseHours: 25,
    iconName: 'ShieldCheck'
  },
  {
    id: 'speed-refactor',
    title:  'Website Speed & SEO Review',
    description: 'Practical refactoring to improve PageSpeed, Lighthouse, and real-world loading performance.',
    basePrice: 6000, // ₹6,000
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
    description: 'Semantic markup, accessible structure, clean HTML, and a solid foundation for responsive interfaces.'
  },
  {
    name: 'CSS3 & Tailwind CSS',
    category: 'frontend',
    experienceYears: 6,
    proficiency: 98,
    icon: 'Palette',
    description: 'Responsive layouts, reusable styles, custom themes, and polished interactions.'
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'frontend',
    experienceYears: 6,
    proficiency: 98,
    icon: 'FileCode',
    description: 'Modern JavaScript for interactive interfaces, API calls, state, and browser functionality.'
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    experienceYears: 5,
    proficiency: 96,
    icon: 'ShieldCheck',
    description: 'Clear types and maintainable code that makes larger projects easier to work with.'
  },
  {
    name: 'React 19 & Next.js',
    category: 'frontend',
    experienceYears: 6,
    proficiency: 98,
    icon: 'Code2',
    description: 'Reusable components, hooks, state management, and responsive application interfaces.'
  },
  {
    name: 'Node.js & Express API',
    category: 'backend',
    experienceYears: 5,
    proficiency: 94,
    icon: 'Server',
    description: 'REST APIs, validation, authentication, database integration, and practical backend logic.'
  },
  {
    name: 'SEO & Core Web Vitals',
    category: 'performance',
    experienceYears: 6,
    proficiency: 99,
    icon: 'Gauge',
    description: 'Search-friendly structure, metadata, accessibility, and practical performance improvements.'
  }
];

export const WORK_PROCESS_STEPS: WorkProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Discovery & Project Plan',
    duration: '1 - 2 Days',
    description: 'We align on your goals, audience, pages or features, and priorities. We turn that into a clear scope, plan, and timeline.',
    deliverables: ['Project scope and priorities', 'Initial page or feature plan', 'Clear timeline and estimate'],
    icon: 'Compass'
  },
  {
    stepNumber: '02',
    title: 'Design & Development',
    duration: '1 - 3 Weeks',
    description: 'We build the website or app in manageable stages, sharing working previews so you can review the direction and give feedback as we go.',
    deliverables: ['Working preview', 'Responsive interface and features', 'Regular progress updates'],
    icon: 'Code'
  },
  {
    stepNumber: '03',
    title: 'Testing & Polish',
    duration: '2 - 3 Days',
    description: 'We test the project across common screen sizes and browsers, then fix visual, usability, accessibility, and performance issues before launch.',
    deliverables: ['Cross-device testing', 'Performance and accessibility checks', 'Final polish and fixes'],
    icon: 'ShieldCheck'
  },
  {
    stepNumber: '04',
    title: 'Launch & Support',
    duration: 'Ongoing',
    description: 'Once everything is approved, We help launch the project, hand over the source code, and provide post-launch support.',
    deliverables: ['Production launch setup', 'Complete source code handover', '30 days of post-launch support'],
    icon: 'Rocket'
  }
];

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'landing',
    name:  'Landing Page',
    tagline: 'Ideal for launching a product, service, campaign, or new business online.',
    startingPrice: 8000, // ₹8,000
    timeline: '3 - 5 Days',
    idealFor: 'Startups & Founders needing fast conversion & SEO',
    features: [
      'HTML5 + CSS3 + React + Tailwind CSS Stack',
      'Performance-focused, search-friendly build',
      'Interactive Micro-Interactions & Smooth Animations',
      'Contact Form with Anti-Spam Honeypot & CAPTCHA',
      'OpenGraph Metadata & Schema Markup for SEO',
      '30 days of free post-launch support'
    ]
  },
  {
    id: 'fullstack',
    name: 'Custom Web App / SaaS MVP',
    tagline: 'For custom tools, dashboards, portals, and early-stage web applications.',
    startingPrice: 28000, // ₹28,000
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
    name:  'Website Speed & SEO Review',
    tagline: 'For improving an existing website that feels slow, difficult to use, or hard to find in search.',
    startingPrice: 6000, // ₹6,000
    timeline: '2 - 3 Days',
    idealFor: 'Businesses losing traffic due to slow load speeds',
    features: [
      'In-Depth Lighthouse & Core Web Vitals Diagnostic',
      'Bundle Size Reduction & Unused JS/CSS Elimination',
      'React Component Re-render Bottleneck Fixes',
      'Image Optimization & Lazy Loading Strategy',
      'Practical speed improvements and recommendations',
      'Detailed Before & After Performance & SEO Report'
    ]
  }
];

export const BENCHMARK_COMPARISONS: BenchmarkComparison[] = [
  {
    id: 'rendering-opt',
    title: 'React Rendering Optimization',
    standardMetric: '140ms re-render delay',
    optimizedMetric: '2ms re-render delay',
    improvement: 'Faster UI updates',
    description: 'A practical example of reducing unnecessary calculations and re-renders in a React interface.',
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
    title: 'Handling Large Lists Smoothly',
    standardMetric: '15,000 DOM nodes',
    optimizedMetric: 'Only visible rows rendered',
    improvement: 'Much lighter scrolling',
    description: 'A simple windowing approach that keeps large lists responsive by rendering only the rows currently needed.',
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
