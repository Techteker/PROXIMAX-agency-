import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  Check, 
  ArrowRight, 
  Star, 
  Rocket, 
  TrendingUp, 
  Target, 
  Building2, 
  Plus, 
  Minus,
  Quote,
  Zap,
  ShieldCheck,
  MousePointer2,
  Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

const pricingPlans = [
  {
    name: "Starter Boost",
    id: "starter",
    icon: <Zap className="w-6 h-6" />,
    price: "₹4,999",
    period: "/month",
    description: "Ideal for beginners & small businesses looking to establish their presence.",
    features: [
      "Social Media Setup",
      "Basic SEO Optimization",
      "8 Custom Posts/month",
      "Monthly Progress Report",
      "Email Support"
    ],
    cta: "Get Started",
    popular: false,
    color: "from-blue-500/20 to-transparent"
  },
  {
    name: "Growth Master",
    id: "growth",
    tag: "🔥 Most Popular",
    icon: <Rocket className="w-6 h-6" />,
    price: "₹9,999",
    period: "/month",
    description: "Powerful tools for scaling brands that want dominate their market.",
    features: [
      "Organic + Paid Marketing",
      "Full Funnel Strategy",
      "Weekly Performance Review",
      "Priority Support",
      "Real-time Dashboard",
      "Better Ad Targeting",
      "ROI Optimization"
    ],
    cta: "Get Started",
    popular: true,
    color: "from-gold-500/20 to-transparent"
  },
  {
    name: "Scale Pro",
    id: "scale",
    icon: <TrendingUp className="w-6 h-6" />,
    price: "₹19,999",
    period: "/month",
    description: "Advanced performance marketing for high-growth enterprises.",
    features: [
      "Advanced Ads Strategy",
      "Funnel Optimization",
      "Conversion Tracking",
      "Competitor Analysis",
      "Daily Monitoring",
      "Dedicated Manager"
    ],
    cta: "Get Started",
    popular: false,
    color: "from-purple-500/20 to-transparent"
  },
  {
    name: "Influencer Engine",
    id: "influencer",
    icon: <Target className="w-6 h-6" />,
    price: "₹14,999",
    period: "/month",
    description: "Leverage the power of creators to drive authentic engagement.",
    features: [
      "Influencer Outreach",
      "Campaign Management",
      "Performance-based payouts",
      "Brand Collaborations",
      "Growth Tracking"
    ],
    cta: "Get Started",
    popular: false,
    color: "from-emerald-500/20 to-transparent"
  },
  {
    name: "Custom Enterprise",
    id: "enterprise",
    icon: <Building2 className="w-6 h-6" />,
    price: "Custom",
    period: "",
    description: "Bespeak solutions tailored specifically for global organizations.",
    features: [
      "Full Marketing Team",
      "AI Automation Workflow",
      "Unlimited Campaigns",
      "Dedicated 24/7 Support",
      "Custom Growth Strategy"
    ],
    cta: "Request Proposal",
    popular: false,
    color: "from-red-500/20 to-transparent"
  }
];

const faqs = [
  {
    q: "Can I change my plan later?",
    a: "Yes, you can upgrade or downgrade your plan at any time. The changes will be reflected in your next billing cycle."
  },
  {
    q: "Is there a long-term contract?",
    a: "We offer month-to-month plans. You can cancel at any time with a 30-day notice period. No hidden lock-ins."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, UPI, and bank transfers through our secure payment gateway."
  },
  {
    q: "Do you offer any discounts for yearly billing?",
    a: "Yes, if you choose to pay annually, you get 2 months free (approx. 17% discount)."
  }
];

const testimonials = [
  {
    name: "Aman Sharma",
    role: "Founder, TechSpark",
    content: "PROXIMAX transformed our lead generation. We saw a 300% ROI in the first quarter itself. Their growth master plan is pure magic.",
    image: "https://picsum.photos/seed/user1/100/100"
  },
  {
    name: "Priya Patel",
    role: "Marketing Head, LuxeDecor",
    content: "The Influencer Engine plan helped us reach 1M+ impressions in just 30 days. The quality of creators they work with is top-notch.",
    image: "https://picsum.photos/seed/user2/100/100"
  }
];

const comparisonFeatures = [
  "Social Media Setup",
  "Monthly Reports",
  "Dedicated Manager",
  "Paid Ad Management",
  "ROI Optimization",
  "Real-time Dashboard",
  "Influencer Access",
  "Custom AI Tools"
];

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCtaClick = (plan: string) => {
    // Navigate to contact section or specialized form
    navigate('/#contact');
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-bg pt-32 pb-20 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-[100] bg-grain opacity-[0.03] mix-blend-overlay" />
      <Helmet>
        <title>Pricing Plans & Digital Marketing Packages | PROXIMAX India</title>
        <meta name="description" content="Explore ROI-focused digital marketing pricing plans for SEO, GMB Optimization, Lead Generation, and Influencer Marketing. Scale your brand with PROXIMAX India's expert packages." />
        <meta name="keywords" content="digital marketing packages india, seo pricing india, lead generation services costs, influencer marketing packages, proximax pricing" />
        <link rel="canonical" href="https://proximax.in/pricing" />
      </Helmet>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-900/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <Sparkles className="w-4 h-4 text-gold-500" />
            <span className="text-[10px] tracking-luxury text-gold-500 italic">Trusted by 100+ growing brands</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-serif italic text-text-main mb-8 tracking-tighter leading-none"
          >
            Choose Your <span className="text-gradient">Growth Plan</span> 🚀
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-muted max-w-2xl mx-auto font-sans font-light"
          >
            Flexible pricing for startups, creators & businesses. No hidden fees, just pure ROI-driven performance.
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-32 perspective-2000">
          {pricingPlans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              whileHover={{ translateZ: 50, scale: 1.05 }}
              className={cn(
                "group relative h-full preserve-3d",
                plan.popular ? "lg:scale-105 z-10" : ""
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-600 text-white text-[10px] tracking-luxury px-4 py-1.5 rounded-full z-20 shadow-lg shadow-gold-600/20 whitespace-nowrap">
                  {plan.tag}
                </div>
              )}

              <div className={cn(
                "h-full card-3d glow-border glass-premium rounded-[3rem] p-8 border border-white/10 flex flex-col transition-all duration-500 overflow-hidden",
                plan.popular ? "border-gold-500/50 shadow-[0_0_60px_rgba(203,142,59,0.2)]" : "hover:border-white/20"
              )}>
                <div className="absolute inset-0 bg-grain opacity-[0.02] pointer-events-none" />
                {/* Plan Backdrop Glow */}
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700", plan.color)} />

                <div className="relative z-10 flex flex-col h-full translate-z-20">
                  <div className="mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gold-500 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-2xl">
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-serif italic text-text-main mb-2">{plan.name}</h3>
                    <p className="text-xs text-text-muted font-sans font-light leading-relaxed">{plan.description}</p>
                  </div>

                  <div className="mb-10 flex items-baseline gap-1">
                    <span className="text-4xl font-display font-black text-text-main">{plan.price}</span>
                    <span className="text-text-dim text-sm">{plan.period}</span>
                  </div>

                  <ul className="space-y-4 mb-10 flex-grow">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <div className="mt-1 w-4 h-4 rounded-full bg-gold-600/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 text-gold-500" />
                        </div>
                        <span className="text-xs text-text-muted leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleCtaClick(plan.id)}
                    className={cn(
                      "w-full py-4 rounded-2xl text-[10px] tracking-luxury transition-all duration-500 font-display font-black",
                      plan.popular 
                        ? "bg-gold-600 text-white hover:bg-gold-500 shadow-lg shadow-gold-600/20" 
                        : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                    )}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif italic text-text-main mb-4">Plan Comparison</h2>
            <p className="text-text-muted">Compare features side-by-side to find your match</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="py-6 px-4 text-left text-[10px] tracking-luxury text-gold-500">Features</th>
                  {pricingPlans.map(plan => (
                    <th key={plan.id} className="py-6 px-4 text-center text-sm font-serif italic text-white">{plan.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-5 px-4 text-sm text-text-muted">{feature}</td>
                    <td className="py-5 px-4 text-center">
                      <div className="flex justify-center">
                        <Check className="w-4 h-4 text-gold-500" />
                      </div>
                    </td>
                    <td className="py-5 px-4 text-center">
                      <div className="flex justify-center">
                        <Check className="w-4 h-4 text-gold-500" />
                      </div>
                    </td>
                    <td className="py-5 px-4 text-center">
                      <div className="flex justify-center">
                        <Check className="w-4 h-4 text-gold-500" />
                      </div>
                    </td>
                    <td className="py-5 px-4 text-center">
                      <div className="flex justify-center">
                        <Check className="w-4 h-4 text-gold-500" />
                      </div>
                    </td>
                    <td className="py-5 px-4 text-center">
                      <div className="flex justify-center">
                        <Check className="w-4 h-4 text-gold-500" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-12 mb-32">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-12 rounded-[3rem] relative"
            >
              <Quote className="absolute top-10 right-10 w-12 h-12 text-gold-600/10" />
              <div className="flex items-center gap-6 mb-8">
                <img 
                  src={testimonial.image} 
                  alt={`Testimonial from ${testimonial.name} - ${testimonial.role} about PROXIMAX services`} 
                  className="w-16 h-16 rounded-full border-2 border-gold-500/20"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-xl font-display text-white">{testimonial.name}</h4>
                  <p className="text-xs text-gold-500 tracking-luxury">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-lg text-text-muted font-serif italic leading-relaxed">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-4">Pricing FAQs</h2>
            <p className="text-text-muted">Common questions about our plans and services</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className={cn(
                  "glass-premium rounded-3xl border border-white/5 overflow-hidden transition-all duration-300",
                  openFaq === idx ? "border-gold-500/30 ring-1 ring-gold-500/20" : ""
                )}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left"
                >
                  <span className="font-display text-white text-lg">{faq.q}</span>
                  <div className={cn(
                    "w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gold-500 transition-transform duration-300",
                    openFaq === idx ? "rotate-45" : ""
                  )}>
                    <Plus className="w-4 h-4" />
                  </div>
                </button>
                
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-8 pb-6 text-text-muted font-sans font-light leading-relaxed border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative glass-premium p-16 md:p-24 rounded-[4rem] text-center overflow-hidden border border-gold-500/20"
        >
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-900/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-serif italic text-white mb-8 tracking-tighter">
              Still confused? <span className="text-gradient">Let’s talk</span> 💬
            </h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto mb-12 font-sans font-light">
              Not sure which plan is right for your goals? Our growth consultants are here to help you map out the perfect strategy.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => handleCtaClick('confused')}
                className="btn-premium px-12 py-5 text-white"
              >
                Book Free Consultation
              </button>
              <button 
                onClick={() => window.open('https://wa.me/919341579348', '_blank')}
                className="px-12 py-5 rounded-full bg-white/5 border border-white/10 text-white font-display font-black text-[10px] tracking-luxury hover:bg-white/10 transition-all uppercase"
              >
                Chat on WhatsApp
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-6 left-6 right-6 z-50 md:hidden">
        <button 
          onClick={() => handleCtaClick('sticky')}
          className="w-full bg-gold-600 text-white py-4 rounded-2xl font-display font-black text-[10px] tracking-luxury shadow-2xl shadow-gold-600/40 border border-white/20 uppercase"
        >
          Start Your Growth Journey
        </button>
      </div>
    </div>
  );
};

export default PricingPage;
