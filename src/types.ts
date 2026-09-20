export interface Project {
  id: string;
  title: string;
  client: string;
  clientRole: string;
  category: 'saas' | 'ecommerce' | 'landing' | 'dashboard' | 'fullstack';
  categoryLabel: string;
  description: string;
  shortDescription: string;
  image: string;
  metrics: {
    label: string;
    value: string;
    trend: 'up' | 'down' | 'neutral';
  }[];
  lighthouseScores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  tags: string[];
  duration: string;
  year: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  challenge: string;
  solution: string;
  deliverables: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
    avatar: string;
    rating: number;
  };
  interactiveSnippetType?: 'whatsapp-booking' | 'dentistry' | 'readyrx' | 'saas-dashboard' | 'ecommerce-checkout' | 'analytics-widget' | 'speed-audit' | 'live-iframe';
}

export interface EstimatorOption {
  id: string;
  title: string;
  description: string;
  basePrice: number;
  baseHours: number;
  iconName: string;
}

export interface FeatureOption {
  id: string;
  category: string;
  title: string;
  description: string;
  price: number;
  hours: number;
}

export interface ClientTestimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  projectType: string;
  quote: string;
  date: string;
  platform: 'Upwork Top Rated' | 'Direct Client' | 'Fiverr Pro' | 'Clutch Verified';
}

export interface TechSkill {
  name: string;
  category: 'frontend' | 'backend' | 'performance' | 'tools';
  experienceYears: number;
  proficiency: number; // 0-100
  icon: string;
  description: string;
}

export interface WorkProcessStep {
  stepNumber: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
  icon: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  tagline: string;
  startingPrice: number;
  timeline: string;
  idealFor: string;
  features: string[];
  popular?: boolean;
}

export interface BenchmarkComparison {
  id: string;
  title: string;
  standardMetric: string;
  optimizedMetric: string;
  improvement: string;
  description: string;
  unoptimizedCode: string;
  optimizedCode: string;
}
