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
  Check,
  Mail,
  ShoppingCart
} from 'lucide-react';
import { WhatsAppIcon } from './components/icons/WhatsApp';

import { ALL_BLOGS } from './data/blogs';

export const services = [
  {
    id: "web",
    title: "Website Design & Development",
    headline: "Elevate your brand with stunning web design & development",
    description: "Elevate your brand with stunning web design & development for impactful online experiences.",
    detailedServices: ["Custom Website Design", "E-commerce Development", "Responsive Layouts", "UI/UX Optimization"],
    results: ["Enhanced user experience", "Higher mobile traffic", "Increased brand authority"],
    cta: "Start Your Project",
    icon: Layout,
    color: "bg-yellow-200"
  },
  {
    id: "seo",
    title: "Search Engine Optimization (SEO)",
    headline: "Rank #1 with the Best SEO Agency in Ranchi",
    description: "Partner with a top-rated SEO agency in Ranchi & Jharkhand to dominate search results, drive organic traffic, and grow your local business visibility.",
    detailedServices: ["Strategic Keyword Research", "On-page & Technical SEO", "High-Quality Backlink Building", "Local SEO for Ranchi Businesses"],
    results: ["Top Google rankings", "10x Organic traffic growth", "Google Maps (GMB) dominance"],
    cta: "Rank My Site",
    icon: Search,
    color: "bg-orange-200"
  },
  {
    id: "branding",
    title: "Strategic Branding & Promotion",
    headline: "Elite Branding Agency in Ranchi for Growing Businesses",
    description: "We craft unique brand identities that resonate with your audience and drive promotions across Jharkhand to boost market visibility.",
    detailedServices: ["Logo & Visual Identity", "Brand Strategy", "Market Positioning", "Promotional Campaigns"],
    results: ["Stronger market presence", "Unique brand identity", "Higher audience trust"],
    cta: "Build My Brand",
    icon: Award,
    color: "bg-pink-200"
  },
  {
    id: "graphic",
    title: "Graphic Design",
    headline: "Create visually stunning designs that communicate",
    description: "Create visually stunning designs that communicate your brand's message effectively with expert graphic design.",
    detailedServices: ["Social Media Graphics", "Print Design", "Marketing Collateral", "Digital Illustrations"],
    results: ["Better visual communication", "Professional appearance", "Consistent brand look"],
    cta: "Get Stunning Designs",
    icon: PenTool,
    color: "bg-yellow-100"
  },
  {
    id: "gmb",
    title: "Google My Business & Local SEO",
    headline: "Dominate Local Search with GMB Optimization Ranchi",
    description: "Stand out from the competition with professional GMB optimization. We help Ranchi businesses rank #1 on Google Maps for high-intent local searches.",
    detailedServices: ["GMB Profile Optimization", "Local Review Management", "Local Citation Building", "Google Maps SEO Strategy"],
    results: ["More local phone calls", "Increased store foot-traffic", "Top 3 Maps ranking"],
    cta: "Rank on Maps",
    icon: MapPin,
    color: "bg-orange-100"
  },
  {
    id: "smm",
    title: "Social Media & Performance Marketing",
    headline: "Grow Your Brand with the Best SMM Agency in Ranchi",
    description: "Scale your revenue with high-ROI Facebook, Instagram, and Google Ads. Our performance marketing experts in Jharkhand deliver daily quality leads.",
    detailedServices: ["ROI-Focused Facebook Ads", "Instagram Growth Strategy", "Creative Performance Content", "High-Quality Lead Generation"],
    results: ["High engagement & ROAS", "Scalable lead generation", "Consistent brand growth"],
    cta: "Grow My Socials",
    icon: Share2,
    color: "bg-pink-100"
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
  { title: "Performance-Based Earnings", subtitle: "( 500-35000 rs. )", icon: Sparkles },
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
  { title: "Performance-Based Salary", subtitle: "( 50,000 to 50,00,000 rs. )", icon: Sparkles },
  { title: "Brand Exposure & Growth", icon: Target },
  { title: "Professional Growth & Mentorship", icon: FileText },
  { title: "Content Creation Support", icon: Briefcase },
  { title: "Fast & Secure Payments", icon: Check }
];

export const SAMPLE_BLOGS = ALL_BLOGS;

export const REVIEWS = [
  {
    brand: "ARB Photography",
    niche: "Professional Photography Team",
    text: "We Have Been Using PROXIMAX's Service For The Last Four Years And Are Happy With The Quality They Provide. They Manage Our Website And Social Media Handles. Thanks To Team PROXIMAX.",
    logo: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=100&auto=format&fit=crop",
    rating: 5
  },
  {
    brand: "Apollo Clinic",
    niche: "Health Care Clinic",
    text: "The Ads Were Amazing We Got Very High Return On The Ad Spents And We Have Been Able To Get That From Team PROXIMAX. With The Right Guidance And Support, Today We Have Grown Our Social Presence Substantially.",
    logo: "https://images.unsplash.com/photo-1505751172157-c7285937446b?q=80&w=100&auto=format&fit=crop",
    rating: 5
  },
  {
    brand: "Elite Real Estate",
    niche: "Property Consultants",
    text: "The lead generation system built by PROXIMAX is revolutionary for our business. We went from struggling for calls to having a consistent pipeline of qualified buyers. Highly recommended!",
    logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=100&auto=format&fit=crop",
    rating: 5
  },
  {
    brand: "Aura Dental Clinic",
    niche: "Multi-specialty Dentistry",
    text: "Our local GMB ranking shot up to #1 within two months. Now, most of our new patients find us directly on Google Maps. The team is professional and data-driven.",
    logo: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=100&auto=format&fit=crop",
    rating: 5
  },
  {
    brand: "Sparkle Jewellery",
    niche: "Premium Showroom",
    text: "Working with Rajendar and his team has been a game changer for our brand. Our social media engagement is at an all-time high, and it's reflecting in our store walk-ins.",
    logo: "https://images.unsplash.com/photo-1515562141207-7a18b5ce3377?q=80&w=100&auto=format&fit=crop",
    rating: 5
  },
  {
    brand: "Gym Nation",
    niche: "Fitness Center",
    text: "The Facebook ad campaigns managed by PROXIMAX brought in 50+ new memberships in just 3 weeks during our launch. Their targeting strategy is spot on.",
    logo: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=100&auto=format&fit=crop",
    rating: 5
  },
  {
    brand: "Urban Woods",
    niche: "Interior Design Firm",
    text: "PROXIMAX's SEO work is incredible. We are now ranking for the most competitive interior design keywords in our city. The quality of leads is exactly what we needed.",
    logo: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=100&auto=format&fit=crop",
    rating: 5
  },
  {
    brand: "Skyline Education",
    niche: "Coaching Institute",
    text: "The automated lead nurturing funnel they set up has saved us so much time. Our counselors now only deal with highly interested students. Great efficiency boost!",
    logo: "https://images.unsplash.com/photo-1523050338692-7b835a07733f?q=80&w=100&auto=format&fit=crop",
    rating: 5
  },
  {
    brand: "The Spice Kitchen",
    niche: "Fine Dining Restaurant",
    text: "Our mid-week bookings increased by 40% after implementing the local ads and influencer strategy recommended by PROXIMAX. They really understand local demand.",
    logo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=100&auto=format&fit=crop",
    rating: 5
  },
  {
    brand: "Luxe Car Rentals",
    niche: "Luxury Automotive",
    text: "The website they built for us is not only stunning but also a high-converting machine. The mobile experience is seamless, which is crucial for our rental bookings.",
    logo: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=100&auto=format&fit=crop",
    rating: 5
  },
  {
    brand: "Glow Skin Care",
    niche: "D2C Beauty Brand",
    text: "Managed to achieve a 5X ROAS on our new product launch thanks to PROXIMAX's scaleable ad strategy. They help us manage our ad spend very effectively.",
    logo: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=100&auto=format&fit=crop",
    rating: 5
  },
  {
    brand: "Tech Solutions",
    niche: "Software Agency",
    text: "PROXIMAX handled our LinkedIn lead generation campaign and the results were phenomenal. We've signed three major B2B contracts through their efforts.",
    logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=100&auto=format&fit=crop",
    rating: 5
  },
  {
    brand: "Fit Bite",
    niche: "Healthy Meal Prep",
    text: "The branding and packaging design work done by the PROXIMAX team is world-class. It gave our startup the premium look needed to compete in the market.",
    logo: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=100&auto=format&fit=crop",
    rating: 5
  },
  {
    brand: "Legal Path",
    niche: "Law Firm",
    text: "Digital marketing for law is tricky, but PROXIMAX handled it perfectly. Our website now ranks consistently for niche legal services in our region.",
    logo: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=100&auto=format&fit=crop",
    rating: 5
  },
  {
    brand: "Green Valley",
    niche: "Organic Farms",
    text: "Our e-commerce sales grew by 300% within a year of partnering with PROXIMAX. Their knowledge of Shopify SEO and Facebook Ads is unparalleled.",
    logo: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=100&auto=format&fit=crop",
    rating: 5
  },
  {
    brand: "Moda Fashion",
    niche: "Apparel Brand",
    text: "The creative content produced for our Instagram handle is exactly our vibe. We've seen a massive spike in direct messages and inquiries.",
    logo: "https://images.unsplash.com/photo-1445205174273-59396092d3af?q=80&w=100&auto=format&fit=crop",
    rating: 5
  },
  {
    brand: "Clean Sweep",
    niche: "Cleaning Services",
    text: "Local service ads managed by this agency have kept our schedule full since day one. They are the best for local lead generation.",
    logo: "https://images.unsplash.com/photo-1581578731548-c64695cc6958?q=80&w=100&auto=format&fit=crop",
    rating: 5
  },
  {
    brand: "Pet Paradise",
    niche: "Pet Care & Spa",
    text: "Our community growth on social media has been amazing. People in our neighborhood now recognize our brand everywhere. Thanks PROXIMAX!",
    logo: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=100&auto=format&fit=crop",
    rating: 5
  },
  {
    brand: "Zenith Travels",
    niche: "Tour & Travel Agency",
    text: "The lead flow for our international tour packages has been incredibly consistent. Their Google Ads expertise is clearly visible in our ROI.",
    logo: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=100&auto=format&fit=crop",
    rating: 5
  },
  {
    brand: "Build Right",
    niche: "Construction Company",
    text: "Professional, transparent, and result-oriented. PROXIMAX is the only agency we trust for our digital expansion. They deliver what they promise.",
    logo: "https://images.unsplash.com/photo-1503387762-592dea58ef21?q=80&w=100&auto=format&fit=crop",
    rating: 5
  },
  {
    brand: "Home Nest",
    niche: "Furniture Store",
    text: "Their local SEO strategy brought us customers from cities as far as 50km away. Our digital presence has never been this strong.",
    logo: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=100&auto=format&fit=crop",
    rating: 5
  }
];

export const INDUSTRIES_SERVED = [
  "Clinic", "Hospital", "Dental Clinic", "Gym & Fitness Center", "Yoga Studio",
  "Salon & Spa", "Beauty Parlour", "Restaurant & Cafe", "Hotel & Resort",
  "Real Estate", "Construction Company", "Interior Designer", "Architecture Firm",
  "Fashion Brand", "Clothing Store", "Footwear Brand", "Jewellery Shop",
  "Automobile Showroom", "Bike Showroom", "Car Rental Service", "Coaching Institute",
  "School", "College", "Online Course Business", "Tuition Classes",
  "E-commerce Store", "Grocery Store", "Electronics Shop", "Mobile Shop",
  "Furniture Store", "Pharmacy", "Medical Store", "Diagnostic Center",
  "Pathology Lab", "Travel Agency", "Tour & Tourism", "Event Management",
  "Wedding Planner", "Photography Studio", "Law Firm", "CA Firm",
  "Finance Company", "Insurance Advisor", "Startup Brands", "Local Businesses",
  "Personal Brands", "Influencers & Creators", "YouTubers", "NGOs",
  "Political Campaigns", "Corporate Companies", "Franchise Businesses",
  "Home Services", "Plumbing Services", "Electrician Services", "Repair Services",
  "Logistics & Delivery", "Agriculture & Organic Farming",
  "Fast Delivery & Quick Commerce", "Tech Startups", "SaaS Companies", "AI Businesses"
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
