/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Share2, 
  TrendingUp, 
  Layout, 
  MessageSquare, 
  Target, 
  PenTool, 
  Award,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Phone,
  Sparkles,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { cn } from './lib/utils';
import { generateInductionBanner } from './services/imageService';

const services = [
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
    color: "bg-yellow-500/10 text-yellow-500"
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
    color: "bg-yellow-400/10 text-yellow-400"
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
    color: "bg-yellow-500/10 text-yellow-500"
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
    color: "bg-yellow-600/10 text-yellow-600"
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
    color: "bg-yellow-500/10 text-yellow-500"
  },
  {
    id: "whatsapp",
    title: "WhatsApp Marketing & Automation",
    headline: "Convert Leads Faster with WhatsApp Automation",
    description: "We set up WhatsApp systems to automate your customer communication.",
    detailedServices: ["Bulk Messaging", "Automation", "Chatbot Setup"],
    results: ["Instant replies", "Higher conversion"],
    cta: "Setup WhatsApp Marketing",
    icon: MessageSquare,
    color: "bg-yellow-500/10 text-yellow-500"
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
    color: "bg-yellow-400/10 text-yellow-400"
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
    color: "bg-yellow-500/10 text-yellow-500"
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
    color: "bg-yellow-600/10 text-yellow-600"
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [inductionBanner, setInductionBanner] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Select a service',
    budget: '',
    message: ''
  });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, service, budget, message } = formData;
    
    const whatsappMessage = `🚀 *New Inquiry from PROXIMAX Website* 🚀%0A%0A` +
      `👤 *Name:* ${name}%0A` +
      `📧 *Email:* ${email}%0A` +
      `🛠️ *Service:* ${service}%0A` +
      `💰 *Budget:* ${budget}%0A` +
      `📝 *Message:* ${message}%0A%0A` +
      `_Sent from PROXIMAX Digital_`;
    
    const whatsappUrl = `https://wa.me/919341579348?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Clear form after submission
    setFormData({
      name: '',
      email: '',
      service: 'Select a service',
      budget: '',
      message: ''
    });
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Generate induction banner on load
    generateInductionBanner().then(setInductionBanner);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 selection:bg-yellow-500/30 selection:text-white">
      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-6 py-12"
          >
            <div className="absolute inset-0 bg-[#050505]/95 backdrop-blur-xl" onClick={() => setSelectedService(null)} />
            
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: 50, scale: 0.8, rotate: 10 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative w-full max-w-4xl bg-[#121212] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl max-h-full overflow-y-auto"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-8 right-8 p-3 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid lg:grid-cols-2">
                {/* Left Side: Visuals */}
                <div className="relative aspect-square lg:aspect-auto bg-[#181818] p-12 flex flex-col justify-center items-center text-center overflow-hidden">
                  {/* Magic Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-transparent z-0" />
                  <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-600/10 rounded-full blur-[100px] animate-pulse" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-600/5 rounded-full blur-[100px]" />
                  
                  {/* Magic Color Glow */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 180, 270, 360],
                      backgroundColor: ["rgba(202, 138, 4, 0.1)", "rgba(234, 179, 8, 0.15)", "rgba(245, 158, 11, 0.1)"]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 z-0 blur-[120px]"
                  />
                  <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-[100px] animate-pulse" />
                  <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-[100px]" />
                  
                  <div className="relative z-10">
                    <div className="w-24 h-24 rounded-3xl bg-yellow-600 text-white flex items-center justify-center mb-8 shadow-2xl shadow-yellow-500/20 mx-auto">
                      <selectedService.icon className="w-12 h-12" />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-4 tracking-tighter">{selectedService.title}</h2>
                    <p className="text-yellow-400 font-black uppercase tracking-[0.3em] text-xs">Service Exploration</p>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" />
                </div>

                {/* Right Side: Content */}
                <div className="p-12 lg:p-16">
                  <h3 className="text-3xl font-bold text-white mb-6 leading-tight">{selectedService.headline}</h3>
                  <p className="text-slate-400 mb-10 leading-relaxed">{selectedService.description}</p>
                  
                  <div className="space-y-10">
                    {/* Services List */}
                    <div>
                      <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Core Services</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedService.detailedServices.map((s, i) => (
                          <div key={i} className="flex items-center gap-3 text-white font-medium">
                            <CheckCircle2 className="w-4 h-4 text-yellow-500" />
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Process (if exists) */}
                    {selectedService.process && (
                      <div>
                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Our Process</h4>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-yellow-400 font-bold tracking-widest text-sm text-center">
                          {selectedService.process}
                        </div>
                      </div>
                    )}

                    {/* Results */}
                    <div>
                      <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Expected Results</h4>
                      <div className="space-y-3">
                        {selectedService.results.map((r, i) => (
                          <div key={i} className="flex items-center gap-3 text-slate-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                            {r}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <button 
                      onClick={() => {
                        setSelectedService(null);
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full bg-yellow-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-yellow-700 transition-all shadow-xl shadow-yellow-600/20 flex items-center justify-center gap-3"
                    >
                      {selectedService.cta} <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919341579348" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group"
      >
        <MessageSquare className="w-8 h-8" />
        <span className="absolute right-full mr-4 px-4 py-2 bg-white text-emerald-600 text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-emerald-100">
          Chat with us on WhatsApp
        </span>
      </a>

      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-yellow-500/20">P</div>
            <span className="text-2xl font-bold tracking-tighter text-white">PROXIMAX</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Services', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-sm font-medium text-slate-400 hover:text-yellow-500 transition-colors"
              >
                {item}
              </a>
            ))}
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-yellow-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-yellow-700 transition-all shadow-lg shadow-yellow-600/20"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-40 bg-[#050505] pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {['Home', 'Services', 'About', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="text-3xl font-bold text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-yellow-600 text-white py-4 rounded-xl font-bold text-lg"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative pt-40 pb-24 overflow-hidden">
        {/* Premium Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Main Glows */}
          <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-yellow-600/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-yellow-900/10 rounded-full blur-[120px]" />
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          {/* Radial Center Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.05)_0%,transparent_70%)]" />
          
          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              Best Premium Digital Agency
            </div>
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.95] text-white mb-8 tracking-tighter drop-shadow-2xl">
              Scale Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-white to-slate-300 animate-pulse">Business</span> <br />
              Beyond Limits.
            </h1>
            <p className="text-xl text-slate-400 mb-10 max-w-lg leading-relaxed">
              PROXIMAX is a performance-driven digital agency. We combine cutting-edge tech with creative strategy to dominate your market.
            </p>
            <div className="flex flex-wrap gap-5">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-yellow-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-yellow-700 transition-all shadow-2xl shadow-yellow-600/20 flex items-center gap-3 group"
              >
                Start Growing <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/5 text-white border border-white/10 px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Our Services
              </button>
            </div>
            
            <div className="mt-16 flex items-center gap-8">
              <div>
                <div className="flex gap-1 text-yellow-500">
                  {[1,2,3,4,5].map(i => <ShieldCheck key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-sm font-bold text-white mt-1">Trusted by 200+ Brands</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group aspect-[10/8] bg-gradient-to-br from-[#121212] to-[#0a0a0a] backdrop-blur-3xl">
              {inductionBanner ? (
                <img 
                  src={inductionBanner} 
                  alt="Premium Induction Banner" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-900/20 to-slate-900/20 animate-pulse">
                  <Cpu className="w-12 h-12 text-yellow-500 opacity-20" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
              
              {/* Premium Badge */}
              <div className="absolute top-8 right-8 px-6 py-3 bg-yellow-600/90 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-2xl z-20 flex items-center gap-2 backdrop-blur-md border border-white/20 group-hover:bg-yellow-500 transition-colors">
                <Sparkles className="w-3 h-3 animate-spin-slow" />
                Best Premium Agency
              </div>
            </div>
            
            {/* Floating Cards */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 bg-[#121212] p-8 rounded-3xl shadow-2xl z-20 border border-white/5 backdrop-blur-xl"
            >
              <div className="text-4xl font-bold text-yellow-500 mb-1">98%</div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Retention</div>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-10 -right-10 bg-[#121212] p-8 rounded-3xl shadow-2xl z-20 border border-white/5 backdrop-blur-xl"
            >
              <div className="text-4xl font-bold text-slate-300 mb-1">10x</div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">ROI Growth</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
        {/* Magic Background Particles/Glows */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-yellow-600/10 rounded-full blur-[150px] -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-yellow-600/5 rounded-full blur-[150px] -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.03)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <motion.div
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  scale: [0.98, 1, 0.98]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block"
              >
                <h2 className="text-yellow-500 font-black uppercase tracking-[0.4em] text-xs mb-6 flex items-center gap-3">
                  <Sparkles className="w-3 h-3" /> Expertise
                </h2>
              </motion.div>
              <h3 className="text-5xl md:text-6xl font-bold text-white leading-tight">Solutions Built for <br /> Digital Dominance</h3>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-slate-400 max-w-sm mb-2"
            >
              We don't just provide services; we build high-performance growth engines tailored to your specific business goals.
            </motion.p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 50 },
                  show: { 
                    opacity: 1, 
                    scale: 1, 
                    y: 0, 
                    transition: { 
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      duration: 0.8 
                    } 
                  }
                }}
                whileHover={{ 
                  y: -15,
                  scale: 1.02,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedService(service)}
                className="group p-10 bg-[#121212] rounded-[2.5rem] border border-white/5 hover:border-yellow-500/40 hover:bg-[#181818] transition-all duration-500 relative overflow-hidden cursor-pointer"
              >
                {/* Magic Color Burst on Click */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileTap={{ 
                      opacity: [0, 0.8, 0], 
                      scale: [0, 2, 3],
                      transition: { duration: 0.6, ease: "easeOut" } 
                    }}
                    className="absolute w-40 h-40 bg-yellow-500/40 rounded-full blur-3xl"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileTap={{ 
                      opacity: [0, 0.6, 0], 
                      scale: [0, 1.5, 2.5],
                      transition: { duration: 0.8, ease: "easeOut", delay: 0.1 } 
                    }}
                    className="absolute w-32 h-32 bg-orange-500/30 rounded-full blur-2xl"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileTap={{ 
                      opacity: [0, 1, 0], 
                      scale: [0, 1, 2],
                      transition: { duration: 0.4, ease: "easeOut" } 
                    }}
                    className="absolute w-20 h-20 bg-white/20 rounded-full blur-xl"
                  />
                  
                  {/* Magic Particles */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      whileTap={{ 
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: [0, (Math.random() - 0.5) * 200],
                        y: [0, (Math.random() - 0.5) * 200],
                        transition: { duration: 0.8, ease: "easeOut" }
                      }}
                      className={`absolute w-2 h-2 rounded-full blur-[1px] ${
                        i % 3 === 0 ? 'bg-yellow-400' : i % 3 === 1 ? 'bg-orange-400' : 'bg-white'
                      }`}
                    />
                  ))}
                </div>

                {/* Magic Glow Effect */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/10 rounded-full blur-[80px] group-hover:bg-yellow-500/20 transition-all duration-700" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-yellow-500/5 rounded-full blur-[80px] group-hover:bg-yellow-500/15 transition-all duration-700" />
                
                {/* Animated Border Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-yellow-500/0 animate-shimmer" />
                </div>
                
                <motion.div 
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1,
                    transition: { duration: 0.5 }
                  }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(202, 138, 4, 0.2)",
                      "0 0 40px rgba(234, 179, 8, 0.4)",
                      "0 0 20px rgba(202, 138, 4, 0.2)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-10 group-hover:bg-yellow-600 group-hover:text-white group-hover:shadow-[0_0_30px_rgba(202,138,4,0.4)] transition-all duration-500 relative z-10"
                >
                  <service.icon className="w-10 h-10" />
                </motion.div>

                <div className="relative z-10">
                  <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors tracking-tight">{service.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
                    {service.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.results.slice(0, 2).map((result, i) => (
                      <span key={i} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full text-slate-400 group-hover:bg-yellow-500/10 group-hover:text-yellow-500 transition-all">
                        {result}
                      </span>
                    ))}
                  </div>

                  <div className="h-px w-full bg-white/5 mb-8 group-hover:bg-yellow-500/20 transition-colors" />
                  
                  <button 
                    className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-yellow-400 group-hover:gap-5 transition-all relative group/btn"
                  >
                    <span className="relative z-10">Explore Magic</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                    <div className="absolute inset-0 bg-yellow-500/20 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity rounded-full" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="about" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-[#121212] border border-white/10 relative group shadow-2xl shadow-yellow-500/10">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/30 via-transparent to-yellow-600/30 opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
                
                <img 
                  src="/founder & ceo .png" 
                  alt="Rajendar Rana" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://picsum.photos/seed/founder/800/1000";
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />
                
                <div className="absolute bottom-10 left-10 right-10 p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-2xl">
                  <div className="text-white">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-8 h-px bg-yellow-500" />
                      <p className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-400">Founder & CEO</p>
                    </div>
                    <h4 className="text-4xl font-bold tracking-tighter mb-1">Rajendar Rana</h4>
                    <p className="text-xs text-slate-400 font-medium tracking-widest uppercase opacity-60">Digital Strategist & Tech Visionary</p>
                  </div>
                </div>
              </div>
              
              <motion.div 
                animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-600/20 rounded-full blur-[80px] -z-10" 
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-yellow-500 font-black uppercase tracking-[0.4em] text-xs mb-6">Our Leadership</h2>
              <h3 className="text-5xl font-bold text-white mb-8 leading-tight">Driving Innovation <br /> at PROXIMAX</h3>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                With over a decade of experience in digital strategy and performance marketing, Rajendar Rana established PROXIMAX with a single mission: to bridge the gap between ambitious brands and their true digital potential.
              </p>
              <blockquote className="border-l-4 border-yellow-500 pl-8 py-2 mb-12">
                <p className="text-xl text-white italic font-medium leading-relaxed">
                  "We don't just build websites or run ads; we build legacies. Every client at PROXIMAX is a partner in our journey to redefine what's possible in the digital landscape."
                </p>
              </blockquote>
              
              <div className="grid grid-cols-2 gap-12 mb-12">
                <div>
                  <div className="text-4xl font-bold text-white mb-2">10+</div>
                  <div className="text-xs font-black text-slate-500 uppercase tracking-widest">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">500+</div>
                  <div className="text-xs font-black text-slate-500 uppercase tracking-widest">Projects Delivered</div>
                </div>
              </div>

              <div className="flex items-center gap-5">
                {[
                  { Icon: Linkedin, href: "#" },
                  { Icon: Twitter, href: "#" },
                  { Icon: Instagram, href: "https://www.instagram.com/xoxo_tweez?igsh=eWR2NHp3eWxianU5" }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-yellow-600 hover:text-white transition-all duration-300"
                  >
                    <social.Icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-yellow-900/40">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]" />
            
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-10 tracking-tighter">Ready to Scale <br /> Your Brand?</h2>
              <p className="text-yellow-100 text-xl mb-12 max-w-2xl mx-auto opacity-90 leading-relaxed">
                Join hundreds of successful businesses that have transformed their digital presence with PROXIMAX. Let's build something extraordinary together.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-yellow-600 px-12 py-6 rounded-full font-black text-lg hover:bg-yellow-50 transition-all shadow-2xl"
                >
                  Free Strategy Call
                </button>
                <a 
                  href="https://wa.me/919341579348"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent text-white border-2 border-white/30 px-12 py-6 rounded-full font-black text-lg hover:bg-white/10 transition-all backdrop-blur-sm flex items-center gap-3"
                >
                  <MessageSquare className="w-5 h-5" /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative overflow-hidden bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-yellow-500 font-black uppercase tracking-[0.4em] text-xs mb-6">Contact Us</h2>
              <h3 className="text-5xl font-bold text-white mb-8 leading-tight">Let's Start Your <br /> Growth Journey</h3>
              <p className="text-lg text-slate-400 mb-12 leading-relaxed">
                Have a project in mind? We'd love to hear from you. Our team is ready to help you scale your business to new heights.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-yellow-500 group-hover:bg-yellow-600 group-hover:text-white transition-all duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Email Us</p>
                    <p className="text-xl font-bold text-white">hello@proximax.in</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-yellow-500 group-hover:bg-yellow-600 group-hover:text-white transition-all duration-300">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Call Us</p>
                    <p className="text-xl font-bold text-white">+91 93415 79348</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-yellow-500 group-hover:bg-yellow-600 group-hover:text-white transition-all duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Visit Us</p>
                    <p className="text-xl font-bold text-white">Simdega, India (Remote)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#121212] p-12 rounded-[3rem] border border-white/5 shadow-2xl">
              <form className="space-y-6" onSubmit={handleWhatsAppSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-yellow-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-yellow-500 transition-colors"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Service Interested In</label>
                  <select 
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-yellow-500 transition-colors appearance-none"
                  >
                    <option className="bg-[#121212]">Select a service</option>
                    {services.map(s => <option key={s.title} className="bg-[#121212]">{s.title}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Your Budget ( ₹/$ )</label>
                  <input 
                    type="text" 
                    placeholder="e.g. ₹50,000 or $600"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-yellow-500 transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Message</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-green-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-green-500 transition-all shadow-[0_0_30px_rgba(22,163,74,0.4)] flex items-center justify-center gap-3 group/submit relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/submit:translate-x-full transition-transform duration-1000" />
                  <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform relative z-10" />
                  <span className="relative z-10">Send to WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] text-slate-500 pt-32 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">P</div>
              <span className="text-2xl font-bold tracking-tighter text-white">PROXIMAX</span>
            </div>
            <p className="text-sm leading-relaxed mb-10 opacity-60">
              Your premier digital growth partner. We combine creativity, technology, and data to deliver results that matter.
            </p>
            <div className="flex gap-5">
              {[
                { Icon: Linkedin, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Instagram, href: "https://www.instagram.com/rajendar_rana_732/" }
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
                  <social.Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.3em] mb-10">Company</h4>
            <ul className="space-y-5 text-sm font-medium">
              {['Home', 'Services', 'About', 'Contact', 'Privacy'].map(item => (
                <li key={item}><a href="#" className="hover:text-yellow-500 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.3em] mb-10">Solutions</h4>
            <ul className="space-y-5 text-sm font-medium">
              {['SEO & GMB', 'Performance', 'Web Design', 'Social Media', 'Branding'].map(item => (
                <li key={item}><a href="#" className="hover:text-yellow-500 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.3em] mb-10">Connect</h4>
            <ul className="space-y-6 text-sm font-medium">
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-yellow-500">
                  <Mail className="w-5 h-5" />
                </div>
                hello@proximax.in
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-yellow-500">
                  <Phone className="w-5 h-5" />
                </div>
                +91 93415 79348
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-yellow-500 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                Simdega, India<br />(Remote)
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] opacity-30">
          <p>© 2026 PROXIMAX Agency. All rights reserved.</p>
          <p>Designed for PROXIMAX</p>
        </div>
      </footer>
    </div>
  );
}
