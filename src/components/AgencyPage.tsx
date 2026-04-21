import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import emailjs from '@emailjs/browser';
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
  ArrowRight,
  CheckCircle2,
  Check,
  Mail,
  Phone,
  X,
  Clock,
  Briefcase,
  Users,
  HelpCircle,
  Sparkles,
  ArrowUpRight,
  Zap,
  Globe,
  Star
} from 'lucide-react';
import { cn } from '../lib/utils';
import { services, SAMPLE_BLOGS } from '../constants';
import { Link } from 'react-router-dom';
import { submitContactInquiry } from '../services/supabaseService';

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="card-3d glow-border glass-premium rounded-2xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-gold-500/20 relative group">
      <div className="absolute inset-0 bg-grain opacity-[0.05] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-gold-600/0 via-gold-600/0 to-gold-600/0 group-hover:from-gold-600/5 group-hover:via-transparent group-hover:to-gold-600/5 transition-all duration-700 pointer-events-none" />
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-8 flex items-center justify-between text-left group"
      >
        <h4 className="text-xl font-serif italic text-text-main group-hover:text-gold-500 transition-colors flex items-center gap-4">
          <HelpCircle className={cn("w-5 h-5 transition-colors", isOpen ? "text-gold-500" : "text-text-dim")} />
          {question}
        </h4>
        <div className={cn("w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-text-dim transition-transform duration-500", isOpen && "rotate-180 bg-gold-600 text-white")}>
          <ChevronRight className="w-5 h-5" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-8 pb-8 pt-0">
              <div className="h-px w-full bg-white/5 mb-8" />
              <p className="text-text-muted font-sans font-light leading-relaxed pl-9">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AgencyPage = () => {
  const [homeBlogs, setHomeBlogs] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'SEO (On-page & Off-page)',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const encode = (data: any) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. Submit to Supabase (Non-blocking)
      submitContactInquiry({
        name: formData.name,
        email: formData.email,
        whatsapp: formData.phone,
        businessType: formData.service,
        message: formData.message
      }).catch(err => console.warn("Supabase submission failed:", err));

      // 2. Submit to EmailJS (Primary for user feedback)
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      
      if (serviceId && templateId && e.target) {
        await emailjs.sendForm(
          serviceId,
          templateId,
          e.target as HTMLFormElement
        );
      } else {
        console.warn("EmailJS keys missing or form target invalid");
        // We still consider it a success if Supabase worked, or we can throw if we want strict EmailJS
      }
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', service: 'SEO (On-page & Off-page)', budget: '', message: '' });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetch('/api/blogs')
      .then(async res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          console.error("Expected JSON but got:", text.substring(0, 100));
          throw new TypeError("Oops, we haven't got JSON!");
        }
        return res.json();
      })
      .then(data => {
        if (data && data.blogs) {
          setHomeBlogs(data.blogs.slice(0, 3));
        } else if (Array.isArray(data)) {
          setHomeBlogs(data.slice(0, 3));
        } else {
          setHomeBlogs(SAMPLE_BLOGS.slice(0, 3));
        }
      })
      .catch(err => {
        console.error("Error fetching home blogs, using sample data:", err);
        setHomeBlogs(SAMPLE_BLOGS.slice(0, 3));
      });
  }, []);

  return (
    <div className="relative min-h-screen bg-bg">
      {/* Global Grain Texture */}
      <div className="fixed inset-0 pointer-events-none z-[100] bg-grain opacity-[0.03] mix-blend-overlay" />
      
      <Helmet>
        <title>PROXIMAX | Best Digital Marketing Agency in India | SEO & GMB Experts</title>
        <meta name="description" content="Scale your business with PROXIMAX, the best digital marketing agency in India. We specialize in expert SEO, GMB optimization, and lead generation for Real Estate, Jewellery, and Fashion brands." />
        <meta name="keywords" content="digital marketing agency india, best seo agency india, gmb optimization services, lead generation for real estate, performance marketing india, social media marketing agency" />
        <link rel="canonical" href="https://proximax.in" />
      </Helmet>
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
              className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl max-h-full overflow-y-auto glass-premium"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-8 right-8 p-3 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-square lg:aspect-auto bg-[#0f0f0f] p-12 flex flex-col justify-center items-center text-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-600/20 to-transparent z-0" />
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gold-600/10 rounded-full blur-[100px] animate-pulse" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-600/5 rounded-full blur-[100px]" />
                  
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
                    <p className="text-gold-400 tracking-luxury">Service Exploration</p>
                  </div>
                </div>

                <div className="p-12 lg:p-16">
                  <h3 className="text-3xl font-serif italic text-white mb-6 leading-tight">{selectedService.headline}</h3>
                  <p className="text-text-muted mb-10 leading-relaxed font-sans">{selectedService.description}</p>
                  
                  <div className="space-y-10">
                    <div>
                      <h4 className="tracking-luxury text-text-dim mb-4">Core Services</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedService.detailedServices.map((s: string, i: number) => (
                          <div key={i} className="flex items-center gap-3 text-white font-medium text-sm">
                            <CheckCircle2 className="w-4 h-4 text-gold-500" />
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>

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

      {/* Hero Section */}
      <section id="home" className="relative pt-48 pb-32 overflow-hidden perspective-2000">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gold-600/10 rounded-full blur-[180px] animate-pulse-glow" />
          <motion.div 
            style={{ y: '20%' }}
            className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gold-900/10 rounded-full blur-[150px] animate-drift" 
          />
          
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] mix-blend-overlay" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100, rotateY: 30 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass-premium border border-white/20 text-gold-500 text-[10px] md:text-[11px] font-display font-black uppercase tracking-[0.3em] mb-10 shadow-2xl shadow-gold-500/10"
              >
                <div className="w-2 h-2 rounded-full bg-gold-500 animate-ping" />
                <span className="italic">Leading ROI Specialist in India</span>
              </motion.div>

              <h1 className="text-6xl sm:text-8xl lg:text-[10rem] font-serif italic text-text-main mb-12 tracking-tighter leading-[0.8] drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                Defining <br /> <span className="text-gradient drop-shadow-none">Digital</span> <br /> High-End.
              </h1>

              <p className="text-xl md:text-2xl text-text-muted max-w-xl mb-16 font-sans font-extralight leading-relaxed border-l-2 border-gold-600/30 pl-8">
                We engineer elite marketing systems that transform Indian businesses into global giants. Through algorithmic SEO and conversion science, we don't just grow—we dominate.
              </p>

              <div className="flex flex-col sm:flex-row gap-8">
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-premium group relative flex items-center justify-center gap-4 px-12 py-6 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 text-[11px] md:text-[12px]">Request Exclusive Strategy</span>
                  <ArrowUpRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
                
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map(i => (
                      <motion.div 
                        key={i} 
                        whileHover={{ y: -5, scale: 1.1 }}
                        className="w-12 h-12 rounded-full border-2 border-[#050505] bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-[11px] font-bold text-white shadow-2xl"
                      >
                        {i*25}+
                      </motion.div>
                    ))}
                  </div>
                  <div className="text-left group-hover:translate-x-2 transition-transform">
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-gold-500 text-gold-500" />)}
                    </div>
                    <p className="text-white font-bold text-sm tracking-tight">Top-Rated Agency</p>
                    <p className="text-[9px] text-text-dim uppercase tracking-[0.2em] font-black">Clutch & G2 Verified</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotateX: -20 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:block"
            >
              {/* Complex 3D Scene */}
              <div className="relative w-full aspect-square preserve-3d">
                <motion.div
                  animate={{ 
                    rotateY: [0, 10, 0],
                    rotateX: [0, -5, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-full h-full preserve-3d scale-110"
                >
                  {/* Floating Dashboard Layers */}
                  <motion.div
                    whileHover={{ translateZ: 100, rotateY: -10 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80%] glass-luxury rounded-[4rem] border border-white/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] p-12 overflow-hidden card-3d"
                  >
                    <div className="absolute inset-0 bg-grain opacity-[0.05]" />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold-600/10 rounded-full blur-[100px]" />
                    
                    <div className="flex justify-between items-center mb-12">
                      <div className="space-y-1">
                        <p className="text-[10px] tracking-[0.3em] text-gold-500 font-black uppercase italic">Live Performance</p>
                        <h3 className="text-4xl font-serif italic text-white leading-none">Organic Growth Matrix</h3>
                      </div>
                      <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500">
                        <TrendingUp size={32} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-12">
                      <div className="glass-premium p-8 rounded-3xl border border-white/10 group cursor-pointer hover:bg-white/5 transition-all">
                        <p className="text-text-dim text-[10px] uppercase font-black tracking-widest mb-2">Conversions</p>
                        <p className="text-4xl font-display font-black text-white group-hover:text-gold-500 transition-colors">+428%</p>
                      </div>
                      <div className="glass-premium p-8 rounded-3xl border border-white/10 group cursor-pointer hover:bg-white/5 transition-all">
                        <p className="text-text-dim text-[10px] uppercase font-black tracking-widest mb-2">Revenue ROI</p>
                        <p className="text-4xl font-display font-black text-white group-hover:text-gold-500 transition-colors">12.5x</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5">
                          <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
                            <p className="text-xs text-white/80 font-medium">Campaign Alpha-0{i} Active</p>
                          </div>
                          <span className="text-[10px] font-black text-gold-500/60 uppercase italic">98% Efficient</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Satellite Elements with Different Depths */}
                  <motion.div 
                    animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-10 -right-10 translate-z-[150px] glass-premium p-8 rounded-[2.5rem] border border-white/20 shadow-2xl backdrop-blur-3xl"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <Zap className="text-gold-500 animate-pulse" size={24} />
                      <p className="text-sm font-serif italic text-white">Quantum Scaling</p>
                    </div>
                    <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ width: ['0%', '100%', '0%'] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="h-full bg-gold-500" 
                      />
                    </div>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-20 -left-10 translate-z-[200px] glass-premium px-10 py-8 rounded-[3rem] border border-white/30 shadow-2xl shadow-gold-600/20"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-gold-600 flex items-center justify-center text-white">
                        <Globe size={28} />
                      </div>
                      <div>
                        <p className="text-2xl font-display font-black text-white mb-1">GLOBAL</p>
                        <p className="text-[10px] text-gold-500 font-bold uppercase tracking-[0.2em]">Dominance</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industry Expertise Section (Luxury Marquee) */}
      <section className="py-20 relative overflow-hidden bg-bg">
        <div className="absolute inset-0 bg-grain opacity-[0.02]" />
        
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="glass-luxury rounded-[2.5rem] border border-white/10 py-12 relative overflow-hidden group shadow-[0_0_80px_-40px_rgba(255,255,255,0.2)]">
            {/* Premium Corner Shadows/Glows */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/[0.07] blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/[0.07] blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />
            
            <div className="absolute inset-0 bg-gradient-to-r from-bg via-transparent to-bg z-10 pointer-events-none" />
            
            <div className="flex animate-marquee-right whitespace-nowrap gap-16 items-center">
              {[1, 2].map((set) => (
                <div key={set} className="flex gap-16 items-center shrink-0">
                  <span className="text-white/40 font-display font-black text-xs uppercase tracking-widest hover:text-gold-500 transition-colors cursor-default">Real Estate Marketing</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-600/30" />
                  <span className="text-white/40 font-display font-black text-xs uppercase tracking-widest hover:text-gold-500 transition-colors cursor-default">Jewelry Growth Experts</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-600/30" />
                  <span className="text-white/40 font-display font-black text-xs uppercase tracking-widest hover:text-gold-500 transition-colors cursor-default">Fashion Brand Scaling</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-600/30" />
                  <span className="text-white/40 font-display font-black text-xs uppercase tracking-widest hover:text-gold-500 transition-colors cursor-default">E-commerce Dominance</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-600/30" />
                  <span className="text-white/40 font-display font-black text-xs uppercase tracking-widest hover:text-gold-500 transition-colors cursor-default">Medical SEO Services</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-600/30" />
                  <span className="text-white/40 font-display font-black text-xs uppercase tracking-widest hover:text-gold-500 transition-colors cursor-default">B2B Lead Generation</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-600/30" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>      {/* Services Section */}
      <section id="services" className="py-32 relative perspective-2000">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           <motion.div 
             animate={{ 
               scale: [1, 1.2, 1],
               x: [0, 50, 0],
               y: [0, -50, 0]
             }}
             transition={{ duration: 20, repeat: Infinity }}
             className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-gold-600/5 rounded-full blur-[120px]" 
           />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="h-px w-12 bg-gold-500" />
                <h2 className="text-gold-500 tracking-[0.4em] uppercase text-[10px] font-black italic">Next-Gen SEO Ecosystem</h2>
              </motion.div>
              <h3 className="text-6xl md:text-8xl font-serif italic text-text-main tracking-tighter leading-none">
                Elite Algorithmic <br /> <span className="text-gold-500">Mastery.</span>
              </h3>
            </div>
            <p className="text-text-muted max-w-sm font-sans font-extralight text-lg leading-relaxed border-l border-white/10 pl-8">
              We don't just optimize; we redefine visibility. Our proprietary growth stacks generate consistent, high-value customer acquisitions.
            </p>
          </div>
 
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                whileHover={{ y: -15 }}
                onClick={() => setSelectedService(service)}
                className="group relative cursor-pointer"
              >
                {/* 3D Deep Card */}
                <div className="relative glass-premium p-10 md:p-14 rounded-[4rem] border border-white/40 transition-all duration-700 group-hover:border-gold-500/30 shadow-2xl h-full flex flex-col items-start preserve-3d">
                  <div className="absolute inset-0 bg-grain opacity-[0.03] pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Floating Icon Layer */}
                  <div className="relative mb-12 translate-z-50 shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
                    <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center text-white relative z-10", service.color)}>
                      <service.icon className="w-10 h-10" />
                    </div>
                    <div className="absolute inset-0 bg-gold-600/20 blur-2xl group-hover:blur-3xl transition-all" />
                  </div>
                  
                  <div className="translate-z-40">
                    <h4 className="text-3xl font-serif italic text-white mb-6 group-hover:text-gold-500 transition-colors leading-tight">{service.title}</h4>
                    <p className="text-text-muted leading-relaxed font-sans font-extralight mb-10 group-hover:text-text-main transition-colors">{service.description}</p>
                  </div>
                  
                  <div className="mt-auto pt-8 border-t border-white/5 w-full translate-z-30">
                    <div className="flex items-center justify-between group/btn">
                      <span className="text-[10px] font-display font-black text-gold-500/60 uppercase tracking-[0.2em] group-hover:text-gold-500 transition-colors italic">Deep Exploration</span>
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gold-600 transition-colors">
                        <ArrowUpRight className="w-4 h-4 text-white group-hover:scale-125 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold-600/5 blur-[50px] rounded-full group-hover:bg-gold-600/10 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="py-32 relative overflow-hidden perspective-2000">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-600/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="relative group">
              {/* Complex 3D Photo Frame */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ rotateY: -10, rotateX: 5 }}
                className="relative z-10 preserve-3d"
              >
                <div className="aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/10 relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] card-3d">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" 
                    alt="Founder of PROXIMAX" 
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-12 left-12 right-12 translate-z-50">
                    <p className="text-white font-serif italic text-6xl mb-3 tracking-tighter drop-shadow-2xl">Rajendar Rana</p>
                    <div className="flex items-center gap-4">
                      <motion.div 
                        animate={{ width: [0, 48, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="h-1 bg-gold-500" 
                      />
                      <p className="text-gold-500 tracking-[0.3em] uppercase text-[11px] font-black italic">The Architect of Growth</p>
                    </div>
                  </div>
                </div>

                {/* Floating Meta Pods */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-12 -left-12 glass-premium p-8 rounded-[2.5rem] border border-white/20 shadow-2xl translate-z-60 backdrop-blur-2xl"
                >
                  <Users className="text-gold-500 mb-2" size={24} />
                  <p className="text-2xl font-display font-black text-white">500+</p>
                  <p className="text-[8px] text-text-dim uppercase tracking-widest font-black">Strategy Sessions</p>
                </motion.div>
              </motion.div>

              {/* Background Geometric Aura */}
              <div className="absolute -inset-10 border border-gold-600/10 rounded-[5rem] -z-10 animate-spin-slow opacity-20" />
              <div className="absolute -inset-20 border border-dashed border-gold-900/10 rounded-[6rem] -z-10 animate-reverse-spin opacity-10" />
            </div>

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px w-12 bg-gold-600" />
                  <h2 className="text-gold-600 tracking-[0.4em] uppercase text-[10px] font-black italic">Strategic Integrity</h2>
                </div>
                <h3 className="text-6xl md:text-7xl font-serif italic text-text-main mb-12 leading-none tracking-tighter">
                  Results-Obsessed <br /> <span className="text-gold-500">Execution.</span>
                </h3>
                <div className="space-y-10 text-xl text-text-muted font-sans font-extralight leading-relaxed border-l-2 border-gold-500/10 pl-10">
                  <p>
                    PROXIMAX was born from a singular vision: to bridge the gap between Indian ambition and global excellence through technical SEO supremacy.
                  </p>
                  <p>
                    We don't sell 'services'—we deploy custom-engineered lead generation engines. Our methodology is rooted in data, refined by experience, and proven through consistent multimillion-rupee growth for our partners.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-16 mt-20">
                  <div className="group cursor-default">
                    <p className="text-6xl font-display font-black text-white mb-2 group-hover:text-gold-500 transition-colors">150%</p>
                    <p className="text-[10px] text-text-dim uppercase tracking-[0.2em] font-black italic">Avg. Annual Scalability</p>
                  </div>
                  <div className="group cursor-default">
                    <p className="text-6xl font-display font-black text-white mb-2 group-hover:text-gold-500 transition-colors">24/7</p>
                    <p className="text-[10px] text-text-dim uppercase tracking-[0.2em] font-black italic">Algorithmic Monitoring</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section id="blog" className="py-32 relative overflow-hidden bg-bg/50">
        <div className="absolute inset-0 bg-grain opacity-[0.02]" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-gold-500" />
                <h2 className="text-gold-500 tracking-[0.4em] uppercase text-[10px] font-black italic">The Growth Vault</h2>
              </div>
              <h3 className="text-6xl md:text-8xl font-serif italic text-text-main tracking-tighter leading-none">
                Elite <br /> <span className="text-gold-500">Insights.</span>
              </h3>
            </div>
            <Link 
              to="/blog" 
              className="btn-premium px-10 py-5 text-[11px] flex items-center justify-center gap-4 group"
            >
              Access Complete Repository <ArrowUpRight className="w-5 h-5 group-hover:scale-125 transition-transform" />
            </Link>
          </div>

          <div className="relative overflow-hidden group/marquee">
            <div className="absolute inset-0 bg-gradient-to-r from-bg via-transparent to-bg z-10 pointer-events-none" />
            
            <div className="flex animate-marquee-right hover:[animation-play-state:paused] whitespace-nowrap gap-12 items-stretch py-20">
              {[...homeBlogs, ...homeBlogs].map((blog, i) => (
                <motion.div 
                  key={`${blog.slug}-${i}`}
                  className="w-[400px] shrink-0 preserve-3d"
                >
                  <Link to={`/blog/${blog.slug}`} className="block group h-full">
                    <div className="glass-premium p-8 rounded-[4rem] border border-white/5 transition-all duration-700 group-hover:border-gold-500/30 shadow-2xl relative overflow-hidden h-full card-3d">
                      <div className="absolute inset-0 bg-grain opacity-[0.02]" />
                      
                      <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden mb-10 border border-white/10 group-hover:scale-[1.02] transition-transform duration-700">
                        <img 
                          src={blog.image || blog.banner} 
                          alt={blog.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 brightness-75 group-hover:brightness-100"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg/90 to-transparent" />
                        <div className="absolute bottom-6 left-6 px-5 py-2 rounded-full glass-luxury text-[9px] font-black text-gold-500 uppercase tracking-widest leading-none flex items-center justify-center">
                          {blog.category}
                        </div>
                      </div>
                      
                      <div className="space-y-6 whitespace-normal">
                        <h4 className="text-3xl font-serif italic text-white group-hover:text-gold-500 transition-colors leading-[1.1]">{blog.title}</h4>
                        <div className="flex items-center justify-between text-[10px] text-text-dim uppercase tracking-[0.2em] font-black italic">
                          <span className="flex items-center gap-2 min-h-0"><Clock size={14} className="text-gold-600 shrink-0" /> {blog.readTime} MIN READ</span>
                          <ArrowRight className="w-5 h-5 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-gold-500 shrink-0" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-40 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-32 items-start">
            <div className="lg:sticky lg:top-40">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-gold-600" />
                <h2 className="text-gold-600 tracking-[0.4em] uppercase text-[10px] font-black italic">Technical FAQ</h2>
              </div>
              <h3 className="text-6xl md:text-7xl font-serif italic text-text-main mb-12 tracking-tighter leading-tight">
                Decoded <br /> <span className="text-gold-500">Excellence.</span>
              </h3>
              <p className="text-xl text-text-muted font-sans font-extralight leading-relaxed mb-16 max-w-sm">
                Transparent answers to high-stakes questions. We believe in clarity before collaboration.
              </p>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="glass-luxury p-12 rounded-[3.5rem] border border-white/10 relative overflow-hidden group shadow-2xl shadow-gold-900/10"
              >
                <div className="absolute inset-0 bg-gold-600/5 group-hover:bg-gold-600/10 transition-colors" />
                <Zap className="text-gold-500 mb-8" size={40} />
                <h4 className="text-white font-serif italic text-3xl mb-4">Immediate Consultation?</h4>
                <p className="text-text-dim text-sm mb-10 leading-relaxed font-sans font-light">Skip the line and connect with a senior growth architect directly.</p>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-4 text-gold-500 font-display font-black text-[11px] uppercase tracking-luxury group/btn"
                >
                  Secure Your Slot <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:bg-gold-600 group-hover/btn:border-gold-600 transition-all"><ArrowRight size={16} className="text-white" /></div>
                </button>
              </motion.div>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: "How long does it take to see results?",
                  a: "Typically between 7–30 days depending on the strategy used. Paid ads show results almost immediately, while SEO and GMB optimization build long-term momentum."
                },
                {
                  q: "Do you guarantee results?",
                  a: "We focus on measurable outcomes. We continuously optimize your campaigns to improve performance and ensure you get the best possible return on investment."
                },
                {
                  q: "How many leads can I expect?",
                  a: "Depending on your niche and budget, businesses can generate 20–50+ high-quality leads per month using our proven systems."
                },
                {
                  q: "What is your pricing?",
                  a: "Our plans are customized to your business needs and start from ₹2,999 depending on your specific requirements and growth goals."
                },
                {
                  q: "Is this suitable for small businesses?",
                  a: "Yes, especially for local businesses looking to grow. Our systems are designed to help small to medium enterprises dominate their local market."
                }
              ].map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gold-600/5 rounded-full blur-[200px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-gold-500 tracking-luxury mb-8 uppercase text-sm font-black">Get Started</h2>
              <h3 className="text-5xl md:text-7xl font-serif italic text-white mb-10 leading-tight tracking-tighter">
                Let's Grow Your <br /> <span className="text-gold-500">Business.</span>
              </h3>
              <p className="text-xl text-text-muted font-sans font-light leading-relaxed mb-16">
                Fill out the form and receive a customized strategy along with a free consultation. We respond within 24 hours.
              </p>
              
              <div className="space-y-12">
                <div className="flex items-center gap-8 group">
                  <div className="w-16 h-16 rounded-full glass-premium flex items-center justify-center text-gold-500 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-luxury text-text-dim uppercase mb-1">Email Us</p>
                    <p className="text-2xl text-white font-serif italic">hello@proximax.in</p>
                  </div>
                </div>
                <div className="flex items-center gap-8 group">
                  <div className="w-16 h-16 rounded-full glass-premium flex items-center justify-center text-gold-500 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-luxury text-text-dim uppercase mb-1">Call Us</p>
                    <p className="text-2xl text-white font-serif italic">+91 93415 79348</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative perspective-2000">
              <div className="absolute inset-0 bg-gold-600/20 blur-[100px] -z-10 opacity-30 animate-pulse-glow" />
              <motion.div 
                initial={{ opacity: 0, y: 30, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                whileHover={{ rotateY: 5, rotateX: -5 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="glass-premium p-12 md:p-16 rounded-[4rem] border border-white/10 relative overflow-hidden card-3d group/form shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
              >
                <div className="absolute inset-0 bg-grain opacity-[0.03] pointer-events-none" />
                
                {submitStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-gold-600/20 rounded-full flex items-center justify-center text-gold-500 mb-8 mx-auto">
                      <Check className="w-10 h-10" />
                    </div>
                    <h4 className="text-3xl font-serif italic text-white mb-4">Strategy Requested!</h4>
                    <p className="text-text-muted mb-8">We've received your details and will contact you within 24 hours with your custom growth plan.</p>
                    <button 
                      onClick={() => setSubmitStatus('idle')}
                      className="text-gold-500 font-display font-black text-xs uppercase tracking-luxury"
                    >
                      Send Another Request
                    </button>
                  </motion.div>
                ) : (
                  <form 
                    name="contact"
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >
                    <input type="hidden" name="form_type" value="Contact" />
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label htmlFor="contactName" className="text-text-dim tracking-luxury ml-1">Full Name</label>
                        <input 
                          id="contactName"
                          name="name"
                          type="text" 
                          required
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors font-sans"
                        />
                      </div>
                      <div className="space-y-3">
                        <label htmlFor="contactEmail" className="text-text-dim tracking-luxury ml-1">Email Address</label>
                        <input 
                          id="contactEmail"
                          name="email"
                          type="email" 
                          required
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors font-sans"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label htmlFor="contactPhone" className="text-text-dim tracking-luxury ml-1">Phone Number</label>
                        <input 
                          id="contactPhone"
                          name="phone"
                          type="tel" 
                          required
                          placeholder="+91 00000 00000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors font-sans"
                        />
                      </div>
                      <div className="space-y-3">
                        <label htmlFor="contactService" className="text-text-dim tracking-luxury ml-1">Select Service</label>
                        <div className="relative">
                          <select 
                            id="contactService"
                            name="service"
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-gold-500 transition-colors font-sans appearance-none"
                          >
                            {services.map(service => (
                              <option key={service.id} value={service.title} className="bg-[#050505]">
                                {service.title}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gold-500">
                            <ChevronRight className="w-4 h-4 rotate-90" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="contactBudget" className="text-text-dim tracking-luxury ml-1">Budget Range</label>
                      <input 
                        id="contactBudget"
                        name="budget"
                        type="text" 
                        placeholder="e.g. ₹5k - ₹50k"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors font-sans"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <label htmlFor="contactMessage" className="text-text-dim tracking-luxury ml-1">Message</label>
                      <textarea 
                        id="contactMessage"
                        name="message"
                        rows={4}
                        required
                        placeholder="Tell us about your business goals..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors resize-none font-sans"
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gold-600 text-white py-5 rounded-full font-display font-black text-xs uppercase tracking-widest hover:bg-gold-700 transition-all shadow-xl shadow-gold-600/20 flex items-center justify-center gap-3 group/submit disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      )}
                      {isSubmitting ? 'Sending...' : 'Get More Leads Now'}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgencyPage;
