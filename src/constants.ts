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
    headline: "Dominate Search Results & Capture Organic Demand",
    description: "We implement sophisticated SEO strategies that align with Google's evolving algorithms to secure long-term visibility and authority for your brand.",
    detailedServices: ["Strategic On-page Optimization", "High-Authority Link Building", "Advanced Keyword Intelligence", "Technical SEO Excellence"],
    process: "Audit → Strategize → Execute → Rank",
    results: ["Sustainable Traffic Growth", "Top-Tier Search Rankings", "High-Intent Lead Acquisition"],
    cta: "Request SEO Strategy",
    icon: Search,
    color: "bg-gold-500/10 text-gold-500"
  },
  {
    id: "gmb",
    title: "GMB Optimization",
    headline: "Command Your Local Market via Google Maps",
    description: "Our GMB experts optimize your local presence to ensure your business is the first choice for customers in your immediate vicinity.",
    detailedServices: ["GMB Profile Engineering", "Local Citation Building", "Reputation & Review Strategy"],
    results: ["Increased Local Inquiries", "Enhanced Storefront Visibility"],
    cta: "Optimize Local Presence",
    icon: MapPin,
    color: "bg-gold-400/10 text-gold-400"
  },
  {
    id: "smm",
    title: "Social Media Management",
    headline: "Elevate Your Brand Narrative & Community Engagement",
    description: "We curate premium social media experiences that build brand equity and foster meaningful connections with your target audience.",
    detailedServices: ["Strategic Content Curation", "Cinematic Reels & Visuals", "Community Growth Management"],
    results: ["Brand Loyalty", "Premium Audience Growth"],
    cta: "Elevate Social Presence",
    icon: Share2,
    color: "bg-gold-500/10 text-gold-500"
  },
  {
    id: "performance",
    title: "Performance Marketing",
    headline: "Accelerate Growth with Data-Driven Paid Media",
    description: "We engineer high-performance ad campaigns across Meta and Google, focusing on precision targeting and maximum return on ad spend (ROAS).",
    detailedServices: ["Meta Ads (FB/IG)", "Google Search & Display", "Dynamic Retargeting Funnels"],
    results: ["Immediate Lead Volume", "Optimized Acquisition Cost"],
    cta: "Launch Growth Campaign",
    icon: TrendingUp,
    color: "bg-gold-600/10 text-gold-600"
  },
  {
    id: "web",
    title: "Website & Landing Page Design",
    headline: "Architecting High-Conversion Digital Storefronts",
    description: "We design and develop bespoke, responsive websites that serve as high-converting assets for your business, blending aesthetics with performance.",
    detailedServices: ["Bespoke Business Websites", "Conversion-Optimized Landing Pages", "Mobile-First Architecture"],
    results: ["Superior Conversion Rates", "Elite Digital Identity"],
    cta: "Design My Digital Asset",
    icon: Layout,
    color: "bg-gold-500/10 text-gold-500"
  },
  {
    id: "whatsapp",
    title: "WhatsApp Marketing & Automation",
    headline: "Streamline Conversions with Intelligent Automation",
    description: "Leverage the power of direct-to-consumer communication with automated WhatsApp systems designed for high engagement and rapid response.",
    detailedServices: ["Automated Broadcast Systems", "Intelligent Chatbot Workflows", "CRM Integration"],
    results: ["Accelerated Response Times", "Enhanced Customer Retention"],
    cta: "Automate Communication",
    icon: WhatsAppIcon,
    color: "bg-gold-500/10 text-gold-500"
  },
  {
    id: "leadgen",
    title: "Lead Generation & Sales Funnel",
    headline: "Engineered Systems for Consistent Revenue Growth",
    description: "We build end-to-end sales funnels that nurture prospects and automate the journey from awareness to acquisition.",
    detailedServices: ["Full-Funnel Architecture", "Automated Nurture Sequences", "Lead Scoring & Qualification"],
    results: ["Predictable Revenue Streams", "Automated Sales Pipeline"],
    cta: "Build My Sales Engine",
    icon: Target,
    color: "bg-gold-400/10 text-gold-400"
  },
  {
    id: "content",
    title: "Content Creation & Copywriting",
    headline: "Persuasive Storytelling That Drives Action",
    description: "Our copywriters and creators craft compelling narratives that resonate with your audience and compel them to engage with your brand.",
    detailedServices: ["High-Conversion Ad Copy", "Strategic Editorial Content", "Brand Voice Development"],
    results: ["Increased Engagement", "Higher Click-Through Rates"],
    cta: "Craft My Story",
    icon: PenTool,
    color: "bg-gold-500/10 text-gold-500"
  },
  {
    id: "branding",
    title: "Branding (Logo & Business Identity)",
    headline: "Defining the Visual Legacy of Your Business",
    description: "We create iconic brand identities that communicate professionalism, trust, and market leadership from the first glance.",
    detailedServices: ["Iconic Logo Design", "Comprehensive Visual Identity", "Brand Style Guidelines"],
    results: ["Market Distinction", "Instant Brand Recognition"],
    cta: "Establish My Identity",
    icon: Award,
    color: "bg-gold-600/10 text-gold-600"
  },
  {
    id: "influencer",
    title: "Influencer Marketing",
    headline: "Strategic Partnerships for Authentic Brand Reach",
    description: "We facilitate elite collaborations between your brand and high-impact creators to drive authentic engagement and market authority.",
    detailedServices: ["Strategic Creator Sourcing", "End-to-End Campaign Management", "ROI-Focused Performance Tracking"],
    results: ["Amplified Brand Trust", "Targeted Market Penetration"],
    cta: "Partner with Creators",
    icon: Users,
    color: "bg-gold-500/10 text-gold-500"
  }
];

export const internshipRoles = [
  { title: "Digital Marketing Residency", icon: Target, desc: "Master the intricacies of SEO, GMB engineering, and performance marketing on high-stakes client accounts." },
  { title: "Strategic Lead Acquisition", icon: Briefcase, desc: "Master the methodology of identifying and qualifying high-value enterprise prospects." },
  { title: "Business Development & Sales", icon: ArrowRight, desc: "Cultivate persuasive communication and high-level negotiation skills in a professional environment." },
  { title: "Social Media Strategy", icon: Instagram, desc: "Architect brand influence and sophisticated engagement frameworks across global platforms." },
  { title: "Full-Stack Digital Development", icon: Cpu, desc: "Engineer high-conversion digital storefronts and sophisticated enterprise web solutions." }
];

export const internshipBenefits = [
  { title: "Professional Certification", icon: Award },
  { title: "High-Stakes Project Experience", icon: Target },
  { title: "Executive Letter of Recommendation", icon: FileText },
  { title: "Performance-Based Stipend", icon: Sparkles },
  { title: "Elite Career Opportunities", icon: Briefcase }
];

export const internshipLearningPoints = [
  "Advanced Google Business Profile (GMB) Engineering",
  "High-Performance Lead Acquisition Methodologies",
  "Executive Client Relations & Strategic Communication",
  "Elite SEO & Content Optimization Frameworks",
  "Sophisticated Social Influence & Automation",
  "Data-Driven Performance Marketing & ROI Optimization"
];

export const influencerBenefits = [
  "Exclusive Brand Collaborations",
  "High-Impact Sponsorships",
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
    excerpt: 'In 2026, Google My Business (GMB) optimization is no longer optional for local businesses. Discover the latest strategies to dominate local search and drive high-intent leads.',
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
    excerpt: 'Ranking #1 on Google Maps requires more than just a profile. Learn the advanced techniques to outshine your competitors and become the top-rated choice in your city.',
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
    excerpt: 'Small businesses can achieve massive growth with the right local SEO framework. We break down the essential steps to attract local customers on a budget.',
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
    excerpt: 'The real estate landscape has evolved. Explore how AI-driven targeting and immersive digital experiences are redefining property sales in 2026.',
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
    excerpt: 'Trust and aesthetics are the pillars of jewellery marketing. Discover how to leverage visual storytelling to double your sales in the digital age.',
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
    excerpt: 'Building a fashion brand today requires a blend of community and commerce. Learn the latest branding tips to establish a dominant digital presence.',
    readTime: 11
  }
];
