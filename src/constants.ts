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

export const CASE_STUDIES = [
  {
    id: 'cs1',
    title: 'How We Generated 42 Leads in 21 Days for a Real Estate Business',
    subheadline: 'We helped this business generate consistent leads and customer inquiries using a structured digital marketing system.',
    clientOverview: 'A local real estate business struggling to generate consistent leads from online channels.',
    problem: [
      'No leads coming from Google',
      'Low visibility online',
      'Wasting money on ads',
      'No proper system'
    ],
    goal: [
      'Increase leads',
      'Improve visibility',
      'Generate consistent inquiries'
    ],
    strategy: [
      'SEO optimization',
      'Google My Business optimization',
      'Paid ad campaigns',
      'Landing page improvements',
      'WhatsApp lead capture system'
    ],
    execution: 'We optimized their Google presence, improved targeting, and created a structured lead generation funnel.',
    results: [
      'Generated 42+ high-quality leads in 21 days',
      'Increased calls by 45%',
      'Improved Google ranking to top 3',
      'Reduced cost per lead by 30%'
    ],
    feedback: 'PROXIMAX helped us generate real leads consistently. We started receiving inquiries within the first few weeks.',
    takeaways: [
      'Consistency is key',
      'Proper system matters',
      'Right targeting brings results'
    ],
    category: 'Real Estate'
  },
  {
    id: 'cs2',
    title: 'How a Jewellery Store Increased Walk-in Customers by 60% in 30 Days',
    subheadline: 'We implemented a local SEO and GMB strategy to drive foot traffic to a premium jewellery showroom.',
    clientOverview: 'A premium jewellery store in a competitive urban market looking to increase physical store visits.',
    problem: [
      'Low local map visibility',
      'Competitors dominating local search',
      'Inconsistent walk-in traffic',
      'Poor online review management'
    ],
    goal: [
      'Dominate local Google Maps',
      'Increase walk-in customers',
      'Build local brand authority'
    ],
    strategy: [
      'Hyper-local GMB optimization',
      'Local citation building',
      'Review acquisition strategy',
      'Instagram local awareness ads',
      'WhatsApp "Book a Visit" system'
    ],
    execution: 'We focused on GMB signals, local keywords, and social proof to make the store the top choice for local jewellery shoppers.',
    results: [
      '60% increase in walk-in customers',
      '120% increase in Google Maps directions requests',
      'Ranked #1 for "Jewellery store near me"',
      'Generated 150+ new 5-star reviews'
    ],
    feedback: 'The foot traffic in our store has increased significantly. PROXIMAX understood our local market perfectly.',
    takeaways: [
      'Local SEO is powerful for retail',
      'Reviews drive trust and visits',
      'GMB is the new storefront'
    ],
    category: 'Jewellery'
  },
  {
    id: 'cs3',
    title: 'How an Apparel Brand Scaled Online Sales by 3X in 60 Days',
    subheadline: 'We optimized their e-commerce funnel and performance marketing to drive massive sales growth.',
    clientOverview: 'An emerging fashion brand with a great product but struggling to scale online sales profitably.',
    problem: [
      'High customer acquisition cost (CAC)',
      'Low website conversion rate',
      'Ineffective social media ads',
      'No retargeting strategy'
    ],
    goal: [
      'Scale monthly revenue by 3X',
      'Reduce CAC by 40%',
      'Improve return on ad spend (ROAS)'
    ],
    strategy: [
      'Conversion rate optimization (CRO)',
      'Facebook & Instagram catalog ads',
      'Multi-step retargeting funnel',
      'Influencer collaboration strategy',
      'Email & WhatsApp recovery flows'
    ],
    execution: 'We rebuilt their ad accounts, optimized the product pages, and implemented a robust retargeting system.',
    results: [
      '3.2X increase in monthly online sales',
      '4.5X average ROAS on cold traffic',
      '42% reduction in customer acquisition cost',
      '25% increase in average order value'
    ],
    feedback: 'Our sales have exploded since we started working with PROXIMAX. They are true experts in performance marketing.',
    takeaways: [
      'Data-driven ads win',
      'Retargeting is where the profit is',
      'CRO is as important as traffic'
    ],
    category: 'Fashion'
  },
  {
    id: 'cs4',
    title: 'How a Local Gym Generated 85 New Memberships in 45 Days',
    subheadline: 'We used a lead magnet and local ads strategy to fill up a new fitness center.',
    clientOverview: 'A newly opened gym needing a quick influx of members to reach break-even.',
    problem: [
      'Zero brand awareness in the area',
      'High competition from established gyms',
      'Low initial membership sign-ups'
    ],
    goal: [
      'Generate 75+ new memberships',
      'Build local community awareness',
      'Establish social proof'
    ],
    strategy: [
      '7-Day Free Pass lead magnet',
      'Local Facebook lead forms',
      'Google Search ads for "Gym near me"',
      'WhatsApp follow-up automation',
      'Member referral system'
    ],
    execution: 'We created a high-value offer and promoted it heavily to the local 5km radius using targeted ads.',
    results: [
      '85 new memberships sold in 45 days',
      '300+ high-quality leads generated',
      '₹45 cost per lead (CPL)',
      '15% conversion rate from lead to member'
    ],
    feedback: 'PROXIMAX filled our gym faster than we expected. Their lead follow-up system is a game changer.',
    takeaways: [
      'Offers drive action',
      'Local targeting is efficient',
      'Speed of follow-up matters'
    ],
    category: 'Fitness'
  },
  {
    id: 'cs5',
    title: 'How a Dental Clinic Increased High-Value Appointments by 50%',
    subheadline: 'We focused on high-intent search keywords and trust-building content to drive premium dental cases.',
    clientOverview: 'A multi-specialty dental clinic wanting to attract more implant and orthodontic patients.',
    problem: [
      'Attracting low-value general checkups only',
      'Low visibility for high-ticket services',
      'Weak online reputation'
    ],
    goal: [
      'Increase implant & ortho inquiries by 50%',
      'Improve online authority',
      'Streamline appointment booking'
    ],
    strategy: [
      'Service-specific SEO landing pages',
      'Google Search ads for high-intent keywords',
      'Video testimonial campaign',
      'GMB optimization for medical keywords',
      'WhatsApp appointment reminder system'
    ],
    execution: 'We targeted specific high-value keywords and used patient success stories to build deep trust.',
    results: [
      '52% increase in high-value treatment inquiries',
      'Ranked #1 for "Dental implants [City]"',
      '30% reduction in appointment no-shows',
      '200% increase in website engagement'
    ],
    feedback: 'We are now getting the exact type of patients we wanted. PROXIMAX delivered exactly what they promised.',
    takeaways: [
      'Target intent, not just volume',
      'Video proof is essential for medical',
      'Automation reduces no-shows'
    ],
    category: 'Healthcare'
  },
  {
    id: 'cs6',
    title: 'How an Interior Design Firm Booked 12 Premium Projects in 3 Months',
    subheadline: 'We used a visual-first marketing strategy to attract high-budget homeowners.',
    clientOverview: 'A boutique interior design firm looking to move from small renovations to full-home premium projects.',
    problem: [
      'Portfolio not reaching the right audience',
      'Low-quality inquiries with small budgets',
      'Inconsistent lead flow'
    ],
    goal: [
      'Book 10+ premium full-home projects',
      'Elevate brand positioning',
      'Generate consistent high-budget leads'
    ],
    strategy: [
      'Visual-heavy Instagram & Pinterest strategy',
      'High-end Facebook carousel ads',
      'SEO for "Luxury interior designers"',
      'Premium lead magnet (Design Guide)',
      'Personalized WhatsApp consultation flow'
    ],
    execution: 'We showcased their best work through high-quality visuals and targeted high-income demographics.',
    results: [
      '12 premium projects signed in 90 days',
      'Average project value increased by 40%',
      '150+ high-budget leads generated',
      'Strong brand presence in luxury segment'
    ],
    feedback: 'The quality of leads we get now is incredible. PROXIMAX helped us reposition our brand perfectly.',
    takeaways: [
      'Visuals sell luxury',
      'Demographic targeting is key',
      'Nurturing leads builds trust'
    ],
    category: 'Interior Design'
  },
  {
    id: 'cs7',
    title: 'How a Luxury Car Rental Increased Bookings by 80% for Wedding Season',
    subheadline: 'We dominated seasonal search trends and social media to capture high-intent wedding demand.',
    clientOverview: 'A luxury car rental service wanting to maximize fleet utilization during the wedding season.',
    problem: [
      'Fleet sitting idle during peak days',
      'Manual booking process causing delays',
      'Low visibility for "Wedding car rental"'
    ],
    goal: [
      '80% increase in wedding bookings',
      'Automate the inquiry process',
      'Dominate seasonal keywords'
    ],
    strategy: [
      'Seasonal Google Search campaigns',
      'Wedding-themed social media ads',
      'GMB optimization for event keywords',
      'WhatsApp catalog integration',
      'Retargeting for website visitors'
    ],
    execution: 'We launched aggressive seasonal campaigns and simplified the booking inquiry via WhatsApp.',
    results: [
      '82% increase in total bookings',
      '100% fleet utilization on weekends',
      '₹15 Lakhs+ additional revenue generated',
      'Reduced inquiry response time to < 5 mins'
    ],
    feedback: 'This was our best wedding season ever. PROXIMAX made sure our phones never stopped ringing.',
    takeaways: [
      'Seasonality is an opportunity',
      'Speed of response closes deals',
      'Multi-channel approach works'
    ],
    category: 'Automotive'
  },
  {
    id: 'cs8',
    title: 'How an Educational Institute Increased Admissions by 40%',
    subheadline: 'We used a multi-touch lead nurturing funnel to drive student enrollments.',
    clientOverview: 'A professional training institute struggling to convert website visitors into enrolled students.',
    problem: [
      'High website traffic but low enrollments',
      'Leads dropping off during the decision phase',
      'Lack of automated follow-up'
    ],
    goal: [
      'Increase admissions by 35%+',
      'Improve lead-to-enrollment ratio',
      'Build institutional authority'
    ],
    strategy: [
      'Webinar-based lead generation',
      'Automated email & WhatsApp nurturing',
      'Retargeting with student success stories',
      'SEO for career-related keywords',
      'Google Search ads for course names'
    ],
    execution: 'We implemented a system that educated the leads and built trust over a 14-day nurturing sequence.',
    results: [
      '40% increase in total admissions',
      '25% improvement in lead conversion rate',
      '500+ webinar attendees generated',
      'Ranked top 3 for 15+ core keywords'
    ],
    feedback: 'Our admission team is now much more efficient. The nurturing system PROXIMAX built does the heavy lifting.',
    takeaways: [
      'Education builds trust',
      'Nurturing is essential for high-consideration',
      'Multi-touch funnels are effective'
    ],
    category: 'Education'
  },
  {
    id: 'cs9',
    title: 'How a Fine-Dining Restaurant Increased Mid-week Reservations by 50%',
    subheadline: 'We used targeted local offers and influencer marketing to drive traffic on slow days.',
    clientOverview: 'A premium restaurant with high weekend demand but struggling with low occupancy on weekdays.',
    problem: [
      'Low revenue on Mon-Thu',
      'High fixed costs during slow periods',
      'Ineffective general social media posting'
    ],
    goal: [
      'Increase mid-week reservations by 50%',
      'Build a loyal customer database',
      'Improve local search ranking'
    ],
    strategy: [
      'Mid-week "Chef Special" local ads',
      'Local food influencer collaborations',
      'GMB "Offer" posts and optimization',
      'WhatsApp loyalty program',
      'Birthday/Anniversary targeting ads'
    ],
    execution: 'We created exclusive mid-week reasons to visit and leveraged local influencers to create buzz.',
    results: [
      '55% increase in mid-week table bookings',
      '20% increase in overall monthly revenue',
      '1,000+ customers joined WhatsApp loyalty list',
      'Significant boost in local GMB impressions'
    ],
    feedback: 'Our slow days are now consistently busy. The influencer campaign was a huge success.',
    takeaways: [
      'Specific offers solve specific problems',
      'Influencers drive local discovery',
      'Loyalty lists are a goldmine'
    ],
    category: 'Hospitality'
  },
  {
    id: 'cs10',
    title: 'How a D2C Skincare Brand Achieved 5X ROAS on New Product Launch',
    subheadline: 'We used a high-impact launch strategy and performance marketing to drive immediate sales.',
    clientOverview: 'A direct-to-consumer skincare brand launching a new organic serum line.',
    problem: [
      'New product with zero reviews',
      'Highly competitive skincare market',
      'Limited launch budget'
    ],
    goal: [
      'Achieve 4X+ ROAS on launch',
      'Generate 500+ initial sales',
      'Build quick social proof'
    ],
    strategy: [
      'Pre-launch "Early Access" list building',
      'High-converting video creative ads',
      'UGC (User Generated Content) focus',
      'Aggressive retargeting for cart abandoners',
      'WhatsApp "Flash Sale" alerts'
    ],
    execution: 'We built anticipation before the launch and used high-energy video ads to drive immediate conversions.',
    results: [
      '5.2X ROAS achieved in the first 30 days',
      '750+ units sold in launch month',
      '₹180 average customer acquisition cost',
      '30% of sales from the pre-launch list'
    ],
    feedback: 'The launch exceeded all our expectations. PROXIMAX knows how to create hype and convert it into sales.',
    takeaways: [
      'Anticipation increases conversion',
      'UGC builds instant trust',
      'List building is a safety net'
    ],
    category: 'E-commerce'
  }
];
