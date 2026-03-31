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
  Check,
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
    icon: MessageSquare,
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
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Select a service',
    budget: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          service: 'Select a service',
          budget: '',
          message: ''
        });
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert("Failed to send inquiry. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-400 selection:bg-gold-500/30 selection:text-white">
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
              initial={{ opacity: 0, y: 50, scale: 0.8, rotate: -2 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: 50, scale: 0.8, rotate: 2 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl max-h-full overflow-y-auto"
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
                <div className="relative aspect-square lg:aspect-auto bg-[#0f0f0f] p-12 flex flex-col justify-center items-center text-center overflow-hidden">
                  {/* Magic Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-600/20 to-transparent z-0" />
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gold-600/10 rounded-full blur-[100px] animate-pulse" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-600/5 rounded-full blur-[100px]" />
                  
                  {/* Magic Color Glow */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 180, 270, 360],
                      backgroundColor: ["rgba(179, 155, 107, 0.1)", "rgba(137, 109, 77, 0.15)", "rgba(113, 90, 67, 0.1)"]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 z-0 blur-[120px]"
                  />
                  
                  <div className="relative z-10">
                    <div className="w-24 h-24 rounded-full bg-gold-600 text-white flex items-center justify-center mb-8 shadow-2xl shadow-gold-500/20 mx-auto">
                      <selectedService.icon className="w-12 h-12" />
                    </div>
                    <h2 className="text-4xl font-serif italic text-white mb-4 tracking-tight">{selectedService.title}</h2>
                    <p className="text-gold-400 font-display font-black uppercase tracking-[0.3em] text-[10px]">Service Exploration</p>
                  </div>
                </div>

                {/* Right Side: Content */}
                <div className="p-12 lg:p-16">
                  <h3 className="text-3xl font-serif italic text-white mb-6 leading-tight">{selectedService.headline}</h3>
                  <p className="text-slate-400 mb-10 leading-relaxed font-sans">{selectedService.description}</p>
                  
                  <div className="space-y-10">
                    {/* Services List */}
                    <div>
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 font-display">Core Services</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedService.detailedServices.map((s, i) => (
                          <div key={i} className="flex items-center gap-3 text-white font-medium text-sm">
                            <CheckCircle2 className="w-4 h-4 text-gold-500" />
                            {s}
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
                      className="w-full bg-gold-600 text-white py-5 rounded-full font-display font-black text-sm uppercase tracking-widest hover:bg-gold-700 transition-all shadow-xl shadow-gold-600/20 flex items-center justify-center gap-3"
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
        "fixed top-0 w-full z-50 transition-all duration-500 px-6 py-6",
        scrolled ? "bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-white font-display font-bold text-2xl shadow-2xl shadow-gold-500/20 group-hover:scale-110 transition-transform">P</div>
            <span className="text-2xl font-display font-black tracking-tighter text-white">PROXIMAX</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Services', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-[10px] font-display font-black uppercase tracking-[0.3em] text-slate-500 hover:text-gold-500 transition-colors"
              >
                {item}
              </a>
            ))}
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gold-600 text-white px-8 py-3 rounded-full text-[10px] font-display font-black uppercase tracking-widest hover:bg-gold-700 transition-all shadow-2xl shadow-gold-600/20"
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
                className="w-full bg-gold-600 text-white py-5 rounded-full font-display font-black text-xs uppercase tracking-widest hover:bg-gold-700 transition-all shadow-xl shadow-gold-600/20"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative pt-48 pb-32 overflow-hidden">
        {/* Premium Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Main Glows */}
          <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-gold-600/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-gold-900/10 rounded-full blur-[120px]" />
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]" />
          
          {/* Radial Center Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(179,155,107,0.05)_0%,transparent_70%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-[10px] font-display font-black uppercase tracking-[0.4em] mb-10 relative overflow-hidden group">
              <Sparkles className="w-3 h-3 animate-pulse" />
              The Gold Standard of Digital
            </div>
            <h1 className="text-7xl md:text-9xl font-serif italic leading-[0.85] text-white mb-10 tracking-tighter">
              Grow Your <br />
              <span className="text-gradient">Local Business</span> <br />
              with Leads.
            </h1>
            <p className="text-xl text-slate-400 mb-12 max-w-lg leading-relaxed font-sans font-light">
              We help Real Estate, Jewellery, and Fashion brands dominate their local market with expert SEO and GMB strategies.
            </p>
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gold-600 text-white px-12 py-5 rounded-full font-display font-black text-xs uppercase tracking-widest hover:bg-gold-700 transition-all shadow-2xl shadow-gold-600/20 flex items-center gap-3 group"
              >
                Get Free Growth Strategy <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/5 text-white border border-white/10 px-12 py-5 rounded-full font-display font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Our Portfolio
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative"
          >
            {/* Premium Glow Behind Banner */}
            <div className="absolute -inset-4 bg-gold-600/10 blur-[60px] rounded-[3rem] opacity-50" />
            
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.9)] group aspect-square bg-[#010101]">
              {/* Premium Animated Background */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.25, 1],
                    rotate: [0, 8, 0],
                    opacity: [0.5, 0.7, 0.5]
                  }}
                  transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-br from-gold-900/50 via-black to-gold-800/40"
                />
                
                {/* Liquid Gold Accents - High Intensity */}
                <motion.div 
                  animate={{ 
                    x: [-40, 40, -40],
                    y: [-40, 40, -40],
                    opacity: [0.2, 0.35, 0.2]
                  }}
                  transition={{ duration: 25, repeat: Infinity }}
                  className="absolute -top-60 -left-60 w-[250%] h-[250%] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)]"
                />

                {/* Floating Geometric Outlines - Intricate Grid */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      rotate: i % 2 === 0 ? 360 : -360,
                      opacity: [0.03, 0.1, 0.03],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 30 + i * 10,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute border border-gold-500/10 rounded-full"
                    style={{
                      width: `${400 + i * 200}px`,
                      height: `${400 + i * 200}px`,
                      top: '50%',
                      left: '50%',
                      marginLeft: `-${200 + i * 100}px`,
                      marginTop: `-${200 + i * 100}px`,
                    }}
                  />
                ))}
                
                {/* Scanline Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />

                {/* Animated Particles/Glows - Volumetric */}
                <motion.div 
                  animate={{ 
                    y: [0, -200, 0],
                    x: [0, 80, 0],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{ duration: 15, repeat: Infinity }}
                  className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-600/25 rounded-full blur-[140px]"
                />
                <motion.div 
                  animate={{ 
                    y: [0, 200, 0],
                    x: [0, -80, 0],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 22, repeat: Infinity, delay: 5 }}
                  className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-gold-500/20 rounded-full blur-[180px]"
                />

                {/* Star Particles - Denser */}
                {[...Array(40)].map((_, i) => (
                  <motion.div
                    key={`star-${i}`}
                    animate={{
                      opacity: [0.1, 1, 0.1],
                      scale: [0.8, 1.8, 0.8]
                    }}
                    transition={{
                      duration: 1.5 + Math.random() * 4,
                      repeat: Infinity,
                      delay: Math.random() * 10
                    }}
                    className="absolute w-[1px] h-[1px] bg-gold-100 rounded-full"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </div>

              {/* Floating Icons with Enhanced Glassmorphism */}
              <motion.div
                animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[15%] right-16 z-20 glass p-5 rounded-2xl border border-white/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                <Cpu className="w-8 h-8 text-gold-500" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-[15%] left-16 z-20 glass p-5 rounded-2xl border border-white/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                <ShieldCheck className="w-8 h-8 text-gold-500" />
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                className="absolute top-[45%] right-24 z-20 glass p-4 rounded-xl border border-white/20 backdrop-blur-2xl"
              >
                <Target className="w-6 h-6 text-gold-400" />
              </motion.div>

              {/* Animated Text Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <span className="text-[14px] font-display font-black uppercase tracking-[1.5em] text-gold-500 mb-12 block drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">The Agency of</span>
                </motion.div>
                
                <div className="relative group">
                  <motion.h2 
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.8, delay: 0.8, ease: "easeOut" }}
                    className="text-9xl md:text-[10rem] font-serif italic text-white mb-16 tracking-tighter leading-none relative"
                  >
                    <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-white via-gold-100 to-gold-500 drop-shadow-[0_0_40px_rgba(212,175,55,0.4)]">
                      PROXIMAX
                    </span>
                    
                    {/* Digital Glitch Layers */}
                    <motion.span
                      animate={{
                        x: [-2, 2, -2],
                        opacity: [0, 0.3, 0],
                      }}
                      transition={{
                        duration: 0.2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 2
                      }}
                      className="absolute inset-0 z-0 text-gold-500/30 blur-[2px] translate-x-1"
                    >
                      PROXIMAX
                    </motion.span>
                    
                    {/* Shimmer Effect - High Velocity */}
                    <motion.div
                      animate={{
                        x: ['-200%', '300%']
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 0.5
                      }}
                      className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-30deg] blur-md"
                    />
                  </motion.h2>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="flex flex-col gap-10"
                >
                  <div className="h-px w-64 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto opacity-70" />
                  <div className="flex items-center justify-center gap-6">
                    <div className="h-[2px] w-12 bg-gold-500/40" />
                    <p className="text-lg font-display font-black text-slate-300 uppercase tracking-[0.8em]">Local Business Growth</p>
                    <div className="h-[2px] w-12 bg-gold-500/40" />
                  </div>
                </motion.div>
              </div>
              
              {/* Luxury Overlays - High Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-transparent to-[#010101]/60 opacity-90" />
              
              {/* Premium Badge - Large */}
              <div className="absolute top-12 left-12">
                <div className="glass px-8 py-4 rounded-full border border-white/30 flex items-center gap-4 backdrop-blur-3xl shadow-2xl">
                  <div className="w-3 h-3 rounded-full bg-gold-500 animate-ping" />
                  <span className="text-[12px] font-display font-black uppercase tracking-[0.5em] text-white">Elite Standard</span>
                </div>
              </div>

              {/* Bottom Right Seal - Large */}
              <div className="absolute bottom-12 right-12">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="relative w-24 h-24 flex items-center justify-center"
                >
                  <div className="absolute inset-0 border-2 border-gold-500/30 rounded-full border-dashed" />
                  <Award className="w-10 h-10 text-gold-500/70" />
                </motion.div>
              </div>
            </div>
            
            {/* Floating Stats - Enhanced Glassmorphism */}
            <div className="absolute -bottom-10 -left-10 glass p-10 rounded-[2rem] z-20 shadow-2xl border border-white/10 backdrop-blur-2xl">
              <div className="text-6xl font-serif italic text-gold-500 mb-1 tracking-tighter">98%</div>
              <div className="text-[10px] font-display font-black text-slate-500 uppercase tracking-[0.3em]">Client Retention</div>
              <div className="mt-4 flex gap-1">
                {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-1 rounded-full bg-gold-500/40" />)}
              </div>
            </div>

            {/* Floating Element - Awards */}
            <div className="absolute -top-10 -right-10 glass p-8 rounded-[2rem] z-20 shadow-2xl border border-white/10 backdrop-blur-2xl hidden lg:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-600/20 flex items-center justify-center text-gold-500">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl font-serif italic text-white">Award Winning</div>
                  <div className="text-[8px] font-display font-black text-slate-500 uppercase tracking-[0.2em]">Excellence in Design</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* USPs Section */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-12">
            {[
              { title: "Lead-Focused", desc: "We don't just get traffic; we get you customers." },
              { title: "GMB Experts", desc: "Dominate local search and show up when customers need you." },
              { title: "Niche Expertise", desc: "Specialized marketing for Real Estate, Jewellery, and Fashion." },
              { title: "Data-Driven", desc: "Transparent reporting and measurable ROI for every campaign." },
              { title: "Personalized", desc: "Dedicated experts who understand your local business goals." }
            ].map((usp, i) => (
              <div key={i} className="text-center">
                <div className="text-gold-500 font-display font-black uppercase tracking-widest text-[10px] mb-4">{usp.title}</div>
                <p className="text-slate-400 text-xs leading-relaxed">{usp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <h2 className="text-gold-500 font-display font-black uppercase tracking-[0.5em] text-[10px] mb-8 flex items-center gap-4">
                <div className="h-px w-8 bg-gold-500" /> Our Expertise
              </h2>
              <h3 className="text-6xl md:text-7xl font-serif italic text-white leading-[0.9] tracking-tighter">Bespoke Solutions for <br /> Digital Dominance</h3>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-slate-500 max-w-sm mb-4 font-sans font-light leading-relaxed"
            >
              We transcend traditional marketing. Our methodologies are rooted in data and refined by aesthetic intuition.
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
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedService(service)}
                className="group p-12 bg-[#0a0a0a] rounded-2xl border border-white/5 hover:border-gold-500/30 transition-all duration-700 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold-500/5 rounded-full blur-[80px] group-hover:bg-gold-500/10 transition-all duration-700" />
                
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-12 group-hover:bg-gold-600 group-hover:text-white transition-all duration-500">
                  <service.icon className="w-8 h-8" />
                </div>

                <h4 className="text-2xl font-serif italic text-white mb-6 group-hover:text-gold-400 transition-colors">{service.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-10 font-sans font-light">
                  {service.description}
                </p>
                
                <div className="flex items-center gap-4 text-[10px] font-display font-black uppercase tracking-widest text-gold-500 group-hover:gap-6 transition-all">
                  Explore Service <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="about" className="py-48 relative overflow-hidden bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex justify-center"
            >
              <div className="bg-white p-10 rounded-[30px] shadow-[0_30px_60px_rgba(0,0,0,0.4)] text-center max-w-[450px] w-full border border-gold-500/20 relative overflow-hidden group">
                {/* Decorative Elements */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold-500/10 rounded-full blur-[60px]" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gold-500/10 rounded-full blur-[60px]" />
                
                <div className="relative mb-10 rounded-[20px] overflow-hidden border-[6px] border-[#f8f8f8] shadow-inner group">
                  <img 
                    src="1000077645.png" 
                    alt="Rajendar Rana" 
                    className="w-full h-auto transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://picsum.photos/seed/founder/800/1000";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                
                <h2 className="text-4xl font-serif italic text-[#1a1a1a] mb-3 tracking-tight">Rajendar Rana</h2>
                <p className="text-gold-600 font-display font-black uppercase tracking-[0.3em] text-[11px] mb-10">Founder & CEO | Digital Strategist</p>
                
                <a 
                  href="#contact" 
                  className="inline-block bg-[#1a1a1a] text-gold-500 px-12 py-5 rounded-xl transition-all duration-500 hover:bg-gold-600 hover:text-white font-display font-black uppercase tracking-[0.4em] text-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-gold-500/20 hover:-translate-y-1"
                >
                  Contact Me
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-gold-500 font-display font-black uppercase tracking-[0.5em] text-[10px] mb-8">About PROXIMAX</h2>
              <h3 className="text-6xl font-serif italic text-white mb-10 leading-[0.9] tracking-tighter">Your Partner in <br /> Local Growth</h3>
              <p className="text-xl text-slate-500 mb-10 leading-relaxed font-sans font-light">
                PROXIMAX is a premier digital marketing agency dedicated to helping local businesses scale. We combine technical SEO mastery with creative strategy to deliver consistent leads and sustainable growth for our clients.
              </p>
              <blockquote className="border-l-2 border-gold-500 pl-10 py-4 mb-16">
                <p className="text-2xl text-white italic font-serif leading-relaxed opacity-90">
                  "Leads That Matter. Growth That Lasts. We don't just build websites; we build monuments of digital influence."
                </p>
              </blockquote>
              
              <div className="grid grid-cols-2 gap-16 mb-16">
                <div>
                  <div className="text-5xl font-serif italic text-white mb-3">10+</div>
                  <div className="text-[10px] font-display font-black text-slate-600 uppercase tracking-widest">Years of Vision</div>
                </div>
                <div>
                  <div className="text-5xl font-serif italic text-white mb-3">500+</div>
                  <div className="text-[10px] font-display font-black text-slate-600 uppercase tracking-widest">Masterpieces Delivered</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
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
                    className="w-16 h-16 rounded-full glass flex items-center justify-center text-slate-400 hover:bg-gold-600 hover:text-white transition-all duration-500"
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
          <div className="bg-gradient-to-br from-gold-600 to-gold-800 rounded-[3rem] p-16 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-gold-900/40">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]" />
            
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-serif italic text-white mb-10 tracking-tighter">Ready to Scale <br /> Your Influence?</h2>
              <p className="text-gold-100 text-xl mb-12 max-w-2xl mx-auto opacity-90 leading-relaxed font-sans font-light">
                Join an elite circle of brands that have transformed their digital presence with PROXIMAX. Let's build your legacy together.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-gold-700 px-12 py-5 rounded-full font-display font-black text-xs uppercase tracking-widest hover:bg-gold-50 transition-all shadow-2xl"
                >
                  Request Consultation
                </button>
                <a 
                  href="https://wa.me/919341579348"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent text-white border border-white/30 px-12 py-5 rounded-full font-display font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-sm flex items-center gap-3"
                >
                  <MessageSquare className="w-4 h-4" /> Direct Inquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative overflow-hidden bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-32">
            <div>
              <h2 className="text-gold-500 font-display font-black uppercase tracking-[0.5em] text-[10px] mb-8">Get In Touch</h2>
              <h3 className="text-6xl font-serif italic text-white mb-10 leading-[0.9] tracking-tighter">Let's Begin Your <br /> Growth Journey</h3>
              <p className="text-xl text-slate-500 mb-16 leading-relaxed font-sans font-light">
                Whether you're looking to redefine your brand or scale your performance, our team is ready to deliver excellence.
              </p>
              
              <div className="space-y-10">
                <div className="flex items-center gap-8 group">
                  <div className="w-16 h-16 rounded-full glass flex items-center justify-center text-gold-500 group-hover:bg-gold-600 group-hover:text-white transition-all duration-500">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-display font-black text-slate-600 uppercase tracking-widest mb-1">Email</p>
                    <p className="text-xl font-serif italic text-white">hello@proximax.in</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 group">
                  <div className="w-16 h-16 rounded-full glass flex items-center justify-center text-gold-500 group-hover:bg-gold-600 group-hover:text-white transition-all duration-500">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-display font-black text-slate-600 uppercase tracking-widest mb-1">Phone</p>
                    <p className="text-xl font-serif italic text-white">+91 93415 79348</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 group">
                  <div className="w-16 h-16 rounded-full glass flex items-center justify-center text-gold-500 group-hover:bg-gold-600 group-hover:text-white transition-all duration-500">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-display font-black text-slate-600 uppercase tracking-widest mb-1">Location</p>
                    <p className="text-xl font-serif italic text-white">Simdega, India (Remote)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#0a0a0a] p-12 rounded-2xl border border-white/5 shadow-2xl relative">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0a0a0a] rounded-2xl p-12 text-center"
                >
                  <div className="w-20 h-20 bg-gold-600/20 rounded-full flex items-center justify-center text-gold-500 mb-6">
                    <Check className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-serif italic text-white mb-4">Thank You!</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Your inquiry has been sent successfully. <br />
                    We'll get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-gold-500 font-display font-black text-[10px] uppercase tracking-widest hover:text-gold-400 transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : null}

              <form className={`space-y-8 ${isSubmitted ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-display font-black text-slate-600 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-gold-500 transition-colors font-sans"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-display font-black text-slate-600 uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-gold-500 transition-colors font-sans"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-display font-black text-slate-600 uppercase tracking-widest ml-1">Service Interested In</label>
                  <select 
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-gold-500 transition-colors appearance-none font-sans"
                  >
                    <option className="bg-[#0a0a0a]">Select a service</option>
                    {services.map(s => <option key={s.title} className="bg-[#0a0a0a]">{s.title}</option>)}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-display font-black text-slate-600 uppercase tracking-widest ml-1">Your Budget</label>
                  <input 
                    type="text" 
                    placeholder="e.g. ₹50,000 or $600"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-gold-500 transition-colors font-sans"
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-display font-black text-slate-600 uppercase tracking-widest ml-1">Message</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-gold-500 transition-colors resize-none font-sans"
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gold-600 text-white py-5 rounded-full font-display font-black text-xs uppercase tracking-widest hover:bg-gold-700 transition-all shadow-xl shadow-gold-600/20 flex items-center justify-center gap-3 group/submit ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] text-slate-600 pt-32 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 bg-gold-600 rounded-full flex items-center justify-center text-white font-display font-bold text-2xl">P</div>
              <span className="text-2xl font-display font-black tracking-tighter text-white">PROXIMAX</span>
            </div>
            <p className="text-sm leading-relaxed mb-10 opacity-60 font-sans font-light">
              Your premier digital growth partner. We combine creativity, technology, and data to deliver results that matter.
            </p>
            <div className="flex gap-6">
              {[
                { Icon: Linkedin, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Instagram, href: "https://www.instagram.com/rajendar_rana_732/" }
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-gold-500 transition-colors">
                  <social.Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-display font-black text-[10px] uppercase tracking-[0.4em] mb-10">Company</h4>
            <ul className="space-y-6 text-[10px] font-display font-black uppercase tracking-widest">
              {['Home', 'Services', 'About', 'Contact', 'Privacy'].map(item => (
                <li key={item}><a href="#" className="hover:text-gold-500 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display font-black text-[10px] uppercase tracking-[0.4em] mb-10">Solutions</h4>
            <ul className="space-y-6 text-[10px] font-display font-black uppercase tracking-widest">
              {['SEO & GMB', 'Performance', 'Web Design', 'Social Media', 'Branding'].map(item => (
                <li key={item}><a href="#" className="hover:text-gold-500 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display font-black text-[10px] uppercase tracking-[0.4em] mb-10">Connect</h4>
            <ul className="space-y-8 text-sm font-sans font-light">
              <li className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-gold-500">
                  <Mail className="w-5 h-5" />
                </div>
                hello@proximax.in
              </li>
              <li className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-gold-500">
                  <Phone className="w-5 h-5" />
                </div>
                +91 93415 79348
              </li>
              <li className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-gold-500 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                Simdega, India<br />(Remote)
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-display font-black uppercase tracking-[0.3em] opacity-30">
          <p>© 2026 PROXIMAX Agency. All rights reserved.</p>
          <p>Designed for Digital Excellence</p>
        </div>
      </footer>
    </div>
  );
}
