import { 
  Search, 
  MapPin, 
  Share2, 
  TrendingUp, 
  Layout, 
  Target, 
  PenTool, 
  Award,
  Users,
  Cpu,
  Briefcase,
  Instagram,
  ArrowRight,
  Sparkles,
  FileText,
  Check
} from 'lucide-react';
import { WhatsAppIcon } from './components/icons/WhatsApp';

export const services = [
  {
    id: "seo",
    title: "SEO (Search Engine Optimization)",
    headline: "Rank Higher & Generate Consistent Organic Leads",
    description: "If your business is not visible on Google, you are losing potential customers. We help you rank higher and generate consistent organic leads.",
    detailedServices: ["On-page SEO", "Off-page SEO", "Keyword Research", "Technical SEO"],
    process: "Audit → Optimize → Rank",
    results: ["Consistent organic leads", "Top Google rankings", "Increased revenue"],
    cta: "Get More Leads Now",
    icon: Search,
    color: "bg-gold-500/10 text-gold-500"
  },
  {
    id: "gmb",
    title: "Google My Business Optimization",
    headline: "Dominate Google Maps & Increase Local Calls",
    description: "Rank higher on Google Maps and increase calls, visits, and local customer inquiries from your immediate area.",
    detailedServices: ["GMB Setup & Optimization", "Local SEO", "Review Management"],
    results: ["More phone calls", "Increased store visits", "Local market dominance"],
    cta: "Rank My Business on Maps",
    icon: MapPin,
    color: "bg-gold-400/10 text-gold-400"
  },
  {
    id: "smm",
    title: "Social Media Management",
    headline: "Build a High-Authority Brand Presence",
    description: "We turn your social media into a high-authority brand presence that builds trust and attracts loyal customers.",
    detailedServices: ["Content Posting", "Reels & Graphics", "Engagement Strategy"],
    results: ["Stronger brand trust", "Higher engagement", "Loyal customer base"],
    cta: "Start Your Growth Today",
    icon: Share2,
    color: "bg-gold-500/10 text-gold-500"
  },
  {
    id: "performance",
    title: "Performance Marketing (Paid Ads)",
    headline: "Get Instant Leads & Measurable ROI",
    description: "Run high-converting ad campaigns that generate immediate leads and measurable ROI for your business.",
    detailedServices: ["Facebook & Instagram Ads", "Google Ads", "Retargeting"],
    results: ["Immediate lead flow", "High ROI", "Scalable growth"],
    cta: "Start My Ads Campaign",
    icon: TrendingUp,
    color: "bg-gold-600/10 text-gold-600"
  },
  {
    id: "web",
    title: "High-Converting Website Design",
    headline: "Turn Your Website Into a 24/7 Sales Machine",
    description: "We create modern, responsive websites designed to convert visitors into high-paying customers.",
    detailedServices: ["Business Website", "Landing Page Design", "Mobile Responsive"],
    results: ["Higher conversion rates", "Professional authority", "Better user experience"],
    cta: "Build My Sales Machine",
    icon: Layout,
    color: "bg-gold-500/10 text-gold-500"
  },
  {
    id: "whatsapp",
    title: "WhatsApp Marketing & Automation",
    headline: "Convert Leads Instantly with Automation",
    description: "Capture and convert leads instantly with automated WhatsApp communication systems that work while you sleep.",
    detailedServices: ["Bulk Messaging", "Automation", "Chatbot Setup"],
    results: ["Instant lead response", "Higher closing rates", "Time-saving automation"],
    cta: "Setup WhatsApp Automation",
    icon: WhatsAppIcon,
    color: "bg-gold-500/10 text-gold-500"
  },
  {
    id: "leadgen",
    title: "Lead Generation & Sales Funnels",
    headline: "Build a Predictable Pipeline of High-Quality Leads",
    description: "Build a predictable pipeline of high-quality leads for your business every month using our proven funnel systems.",
    detailedServices: ["Funnel Setup", "Landing Page", "Automation"],
    results: ["Consistent lead flow", "Predictable revenue", "Automated acquisition"],
    cta: "Get More Leads Now",
    icon: Target,
    color: "bg-gold-400/10 text-gold-400"
  },
  {
    id: "content",
    title: "Content Creation & Copywriting",
    headline: "High-Performance Copy That Sells",
    description: "We create powerful, result-driven content that drives engagement and turns readers into buyers.",
    detailedServices: ["Ad Copy", "Social Media Content", "Website Content"],
    results: ["Better conversions", "Higher engagement", "Clear brand voice"],
    cta: "Get High-Performance Copy",
    icon: PenTool,
    color: "bg-gold-500/10 text-gold-500"
  },
  {
    id: "branding",
    title: "Brand Identity & Positioning",
    headline: "Position Your Business as a Premium Brand",
    description: "We design professional brand identities that make your business stand out and command premium prices.",
    detailedServices: ["Logo Design", "Brand Identity", "Social Media Branding"],
    results: ["Premium brand image", "Market differentiation", "Professional authority"],
    cta: "Position My Brand",
    icon: Award,
    color: "bg-gold-600/10 text-gold-600"
  },
  {
    id: "influencer",
    title: "Influencer Marketing & Collaborations",
    headline: "Leverage Authority for Maximum Reach & ROI",
    description: "We connect your brand with high-authority influencers for maximum reach, trust, and measurable ROI.",
    detailedServices: ["Influencer Sourcing", "Campaign Management", "Performance Tracking"],
    results: ["Massive reach", "Authentic trust", "Increased sales"],
    cta: "Start My Campaign",
    icon: Users,
    color: "bg-gold-500/10 text-gold-500"
  }
];

export const internshipRoles = [
  { title: "Digital Marketing Intern", icon: Target, desc: "Work on real client projects and master SEO, GMB, and performance marketing." },
  { title: "Lead Generation Intern", icon: Briefcase, desc: "Develop practical skills in finding and qualifying high-value prospects." },
  { title: "Sales Intern", icon: ArrowRight, desc: "Learn persuasive communication and closing skills with performance-based earnings." },
  { title: "Social Media Manager", icon: Instagram, desc: "Build brand presence and engagement while earning a certificate of completion." },
  { title: "Web Development Intern", icon: Cpu, desc: "Create high-converting landing pages and business websites for real clients." }
];

export const internshipBenefits = [
  { title: "Official Certificate", icon: Award },
  { title: "Real Client Projects", icon: Target },
  { title: "Practical Skill Development", icon: FileText },
  { title: "Performance-Based Earnings", icon: Sparkles },
  { title: "Job Opportunities", icon: Briefcase }
];

export const internshipLearningPoints = [
  "Advanced Search Engine Optimization (SEO)",
  "Google My Business (GMB) Optimization",
  "Local Business Growth Strategies",
  "Performance Marketing & Paid Ads",
  "Lead Generation & Sales Funnels",
  "Professional Client Communication"
];

export const influencerBenefits = [
  { title: "Paid Collaboration Opportunities", icon: Award },
  { title: "Affiliate Earning Potential", icon: Sparkles },
  { title: "Brand Exposure & Growth", icon: Target },
  { title: "Professional Growth & Mentorship", icon: FileText },
  { title: "Content Creation Support", icon: Briefcase },
  { title: "Fast & Secure Payments", icon: Check }
];

export const SAMPLE_BLOGS = [
  {
    id: 's1',
    title: 'Google My Business Optimization Guide for 2026',
    slug: 'gmb-optimization-guide-2026',
    date: '2026-04-03',
    author: 'PROXIMAX Team',
    category: 'Local SEO',
    banner: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073&auto=format&fit=crop',
    excerpt: '2026 me Google My Business (GMB) optimization ke bina local business grow karna namumkin hai. Janiye latest strategies aur tips leads badhane ke liye.',
    readTime: 8
  },
  {
    id: 's2',
    title: 'How to Rank #1 on Google Maps in India',
    slug: 'rank-1-google-maps-india',
    date: '2026-04-03',
    author: 'PROXIMAX Team',
    category: 'Local SEO',
    banner: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop',
    excerpt: 'Google Maps par rank karna ab pehle se zyada competitive hai. Janiye kaise aap India me apne business ko #1 position par la sakte hain.',
    readTime: 10
  },
  {
    id: 's3',
    title: 'Local SEO Strategies for Small Businesses',
    slug: 'local-seo-strategies-small-business',
    date: '2026-04-03',
    author: 'PROXIMAX Team',
    category: 'Local SEO',
    banner: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    excerpt: 'Small business owners ke liye local SEO ab luxury nahi, necessity hai. Janiye kaise aap kam budget me local customers attract kar sakte hain.',
    readTime: 7
  },
  {
    id: 's4',
    title: 'Real Estate Marketing Trends 2026',
    slug: 'real-estate-marketing-trends-2026',
    date: '2026-04-03',
    author: 'PROXIMAX Team',
    category: 'Real Estate',
    banner: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop',
    excerpt: '2026 me real estate bechna pehle jaisa nahi raha. AI, VR aur personalized marketing ne game badal diya hai.',
    readTime: 12
  },
  {
    id: 's5',
    title: 'Jewellery Marketing Ideas 2026',
    slug: 'jewellery-marketing-ideas-2026',
    date: '2026-04-03',
    author: 'PROXIMAX Team',
    category: 'Jewellery',
    banner: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop',
    excerpt: 'Jewellery business me trust aur aesthetics sabse zaroori hain. Janiye 2026 ke best marketing ideas jo aapki sales 2x kar sakte hain.',
    readTime: 9
  },
  {
    id: 's6',
    title: 'Fashion Branding in the Digital Age',
    slug: 'fashion-branding-digital-age',
    date: '2026-04-03',
    author: 'PROXIMAX Team',
    category: 'Fashion',
    banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
    excerpt: 'Fashion brands ko digital presence build karne ke liye kya karna chahiye? Janiye latest branding tips aur growth strategies.',
    readTime: 11
  }
];
