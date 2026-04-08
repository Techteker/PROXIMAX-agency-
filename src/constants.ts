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
  FileText
} from 'lucide-react';
import { WhatsAppIcon } from './components/icons/WhatsApp';

export const services = [
  {
    id: "seo",
    title: "SEO (On-page & Off-page)",
    headline: "Rank Your Website on Google & Get More Traffic",
    description: "We help your website rank higher on Google using proven SEO strategies.",
    detailedServices: ["On-page SEO", "Off-page SEO", "Keyword Research", "Technical SEO"],
    process: "Audit → Optimize → Rank",
    results: ["More traffic", "Higher rankings", "More leads"],
    cta: "Get Free SEO Audit",
    icon: Search,
    color: "bg-gold-500/10 text-gold-500"
  },
  {
    id: "gmb",
    title: "GMB Optimization",
    headline: "Rank Your Business on Google Maps & Get Local Customers",
    description: "We optimize your Google My Business profile to bring more calls and visits.",
    detailedServices: ["GMB Setup & Optimization", "Local SEO", "Review Management"],
    results: ["More calls", "More local customers"],
    cta: "Rank My Business on Maps",
    icon: MapPin,
    color: "bg-gold-400/10 text-gold-400"
  },
  {
    id: "smm",
    title: "Social Media Management",
    headline: "Grow Your Social Media & Build Your Brand",
    description: "We manage and grow your social media for better engagement.",
    detailedServices: ["Content Posting", "Reels & Graphics", "Engagement Strategy"],
    results: ["More followers", "Better engagement"],
    cta: "Grow My Social Media",
    icon: Share2,
    color: "bg-gold-500/10 text-gold-500"
  },
  {
    id: "performance",
    title: "Performance Marketing",
    headline: "Get Instant Leads & Sales with Paid Ads",
    description: "We run high-converting ad campaigns to grow your business fast.",
    detailedServices: ["Facebook & Instagram Ads", "Google Ads", "Retargeting"],
    results: ["More leads", "High ROI"],
    cta: "Start My Ads Campaign",
    icon: TrendingUp,
    color: "bg-gold-600/10 text-gold-600"
  },
  {
    id: "web",
    title: "Website & Landing Page Design",
    headline: "Build High-Converting Websites for Your Business",
    description: "We create modern and responsive websites that convert visitors into customers.",
    detailedServices: ["Business Website", "Landing Page Design", "Mobile Responsive"],
    results: ["More conversions", "Professional presence"],
    cta: "Build My Website",
    icon: Layout,
    color: "bg-gold-500/10 text-gold-500"
  },
  {
    id: "whatsapp",
    title: "WhatsApp Marketing & Automation",
    headline: "Convert Leads Faster with WhatsApp Automation",
    description: "We set up WhatsApp systems to automate your customer communication.",
    detailedServices: ["Bulk Messaging", "Automation", "Chatbot Setup"],
    results: ["Instant replies", "Higher conversion"],
    cta: "Setup WhatsApp Marketing",
    icon: WhatsAppIcon,
    color: "bg-gold-500/10 text-gold-500"
  },
  {
    id: "leadgen",
    title: "Lead Generation & Sales Funnel",
    headline: "Get Daily Quality Leads for Your Business",
    description: "We build automated systems to generate consistent leads.",
    detailedServices: ["Funnel Setup", "Landing Page", "Automation"],
    results: ["Consistent leads", "Automated sales"],
    cta: "Get More Leads",
    icon: Target,
    color: "bg-gold-400/10 text-gold-400"
  },
  {
    id: "content",
    title: "Content Creation & Copywriting",
    headline: "Content That Attracts & Converts",
    description: "We create powerful content that drives engagement and sales.",
    detailedServices: ["Ad Copy", "Social Media Content", "Website Content"],
    results: ["More engagement", "Better conversions"],
    cta: "Create My Content",
    icon: PenTool,
    color: "bg-gold-500/10 text-gold-500"
  },
  {
    id: "branding",
    title: "Branding (Logo & Business Identity)",
    headline: "Build a Strong & Professional Brand Identity",
    description: "We design branding that makes your business stand out.",
    detailedServices: ["Logo Design", "Brand Identity", "Social Media Branding"],
    results: ["Professional look", "Strong brand image"],
    cta: "Build My Brand",
    icon: Award,
    color: "bg-gold-600/10 text-gold-600"
  },
  {
    id: "influencer",
    title: "Influencer Marketing",
    headline: "Collaborate with Top Influencers to Grow Your Brand",
    description: "We connect your brand with the right influencers for maximum reach and ROI.",
    detailedServices: ["Influencer Sourcing", "Campaign Management", "Performance Tracking"],
    results: ["Massive reach", "Authentic engagement"],
    cta: "Start Influencer Campaign",
    icon: Users,
    color: "bg-gold-500/10 text-gold-500"
  }
];

export const internshipRoles = [
  { title: "Digital Marketing Intern", icon: Target, desc: "Master SEO, GMB, and performance marketing on real client projects." },
  { title: "Lead Generation Intern", icon: Briefcase, desc: "Learn the art of finding and qualifying high-value prospects." },
  { title: "Sales Intern", icon: ArrowRight, desc: "Develop persuasive communication and closing skills." },
  { title: "Social Media Manager", icon: Instagram, desc: "Build brand presence and engagement across all platforms." },
  { title: "Web Development Intern", icon: Cpu, desc: "Create high-converting landing pages and business websites." }
];

export const internshipBenefits = [
  { title: "Official Certificate", icon: Award },
  { title: "Real Project Experience", icon: Target },
  { title: "Letter of Recommendation", icon: FileText },
  { title: "Performance Stipend", icon: Sparkles },
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
  "Exclusive Brand Collaborations",
  "High-Paying Sponsorships",
  "Professional Growth & Mentorship",
  "Access to Premium Events",
  "Content Creation Support",
  "Fast & Secure Payments"
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
