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
import { services, SAMPLE_BLOGS, REVIEWS } from '../constants';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { submitContactInquiry, fetchFounderInfo } from '../services/supabaseService';

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
  const [founder, setFounder] = useState<any>(null);
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

  const [showPopup, setShowPopup] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  
  const nextReview = () => {
    setReviewIndex((prev) => (prev + 1) % REVIEWS.length);
  };
  
  const prevReview = () => {
    setReviewIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  useEffect(() => {
    const timer = setInterval(nextReview, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('proximax_popup_seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 5000); // 5 second delay for first time visitors
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    localStorage.setItem('proximax_popup_seen', 'true');
  };

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
    // 1. Initial Fetch
    fetchFounderInfo()
      .then(data => {
        setFounder(data);
      })
      .catch(err => console.error("Error fetching founder info:", err));

    // 2. Real-time Subscription
    const channel = supabase
      .channel('founder-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'founder_info'
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          setFounder(payload.new as any);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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
                      <h4 className="tracking-luxury text-text-dim mb-4">Core Focus Areas</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedService.detailedServices.map((s: string, i: number) => (
                          <div key={i} className="flex items-center gap-3 text-white font-medium text-sm">
                            <CheckCircle2 className="w-4 h-4 text-gold-500" />
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedService.results && (
                      <div>
                        <h4 className="tracking-luxury text-text-dim mb-4">Key Outcomes</h4>
                        <div className="space-y-3">
                          {selectedService.results.map((r: string, i: number) => (
                            <div key={i} className="flex items-center gap-4 text-gold-500/80 font-serif italic text-lg leading-tight">
                              <span className="text-2xl">👉</span>
                              {r}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button 
                        onClick={() => {
                          setSelectedService(null);
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full bg-gold-600 text-white py-5 rounded-full font-display font-black text-xs uppercase tracking-widest hover:bg-gold-700 transition-all shadow-xl shadow-gold-600/20 flex items-center justify-center gap-3"
                      >
                        Get Free Consultation
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedService(null);
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full bg-white/5 text-white py-5 rounded-full font-display font-black text-xs uppercase tracking-widest hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-3 group/explore"
                      >
                        {selectedService.cta || 'Explore Strategy'} <ArrowUpRight className="w-4 h-4 group-hover:scale-125 transition-transform" />
                      </button>
                    </div>
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
            <div className="absolute top-0 left-0 w-80 h-80 bg-white/[0.15] blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/[0.15] blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />
            
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
      <section id="services" className="py-32 relative bg-white">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex justify-between items-start mb-16">
            <div>
              <h2 className="text-5xl md:text-7xl font-sans font-black text-black uppercase tracking-tight mb-4">What We Offer</h2>
              <p className="text-black/60 text-lg font-medium">We’re Here To Help Turn Your Ideas Into Something Amazing.</p>
            </div>
            <div className="hidden md:flex w-16 h-16 rounded-full bg-black items-center justify-center text-white">
              <ArrowUpRight className="w-8 h-8" />
            </div>
          </div>
 
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedService(service)}
                className="group relative cursor-pointer"
              >
                <div className="relative bg-white p-12 rounded-[2.5rem] border border-black/5 shadow-premium h-full flex flex-col items-start overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                  {/* Pastel Glow Backgrounds */}
                  <div className={cn(
                    "absolute -top-32 -left-32 w-80 h-80 blur-[100px] opacity-30 transition-all duration-700 group-hover:scale-150 group-hover:opacity-50",
                    index % 3 === 0 ? "bg-yellow-100" : index % 3 === 1 ? "bg-orange-100" : "bg-pink-100"
                  )} />
                  
                  <div className="relative mb-10">
                    <div className="w-20 h-20 text-black flex items-center justify-center rounded-2xl bg-black/5 group-hover:bg-black group-hover:text-white transition-colors duration-500">
                      <service.icon strokeWidth={1.5} className="w-10 h-10" />
                    </div>
                  </div>
                  
                  <h4 className="text-3xl font-sans font-black text-black mb-6 leading-tight">{service.title}</h4>
                  <p className="text-black/60 leading-relaxed text-lg mb-10 font-sans font-light">{service.description}</p>
                  
                  <div className="mt-auto flex items-center gap-3 text-black font-black text-xs uppercase tracking-[0.2em] group/btn">
                    <span>Learn More</span>
                    <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover/btn:bg-yellow-400 group-hover/btn:border-yellow-400 transition-all duration-300">
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section (Founder) */}
      <section id="about" className="py-32 relative bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex justify-between items-start mb-20">
            <div>
              <h2 className="text-5xl md:text-7xl font-sans font-black text-white uppercase tracking-tight mb-4">
                The Mind Behind <br />
                <span className="relative inline-block">
                  <span className="relative z-10">PROXIMAX</span>
                  <div className="absolute bottom-2 left-0 w-full h-4 bg-yellow-400 -z-10 -rotate-1" />
                </span>
              </h2>
              <p className="text-white/60 text-lg font-medium">Get To Know The Heart And Soul Of PROXIMAX—Our Founder.</p>
            </div>
            <div className="hidden md:flex w-16 h-16 rounded-full bg-white items-center justify-center text-black">
              <ArrowUpRight className="w-8 h-8" />
            </div>
          </div>

          <div className="flex flex-col items-center mb-20">
            <h4 className="text-white font-black uppercase text-xs tracking-[0.4em] mb-4 flex items-center gap-4">
              <span className="w-8 h-px bg-yellow-400" />
              THE MIND BEHIND PROXIMAX
            </h4>
            <h2 className="text-4xl md:text-6xl font-sans font-black text-white uppercase tracking-tighter text-center">
              DRIVEN BY PASSION & RESULTS
            </h2>
          </div>

          <div className="bg-white rounded-[4rem] overflow-hidden grid lg:grid-cols-[1.2fr_0.8fr] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
            <div className="p-12 md:p-24 flex flex-col justify-center">
              <div className="relative mb-8">
                <h3 className="font-signature text-7xl text-black leading-none relative z-10">
                  {founder?.name || "Rajendar Rana"}
                </h3>
                <motion.div 
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute -bottom-6 -right-12 w-32 h-16 text-yellow-400 rotate-12"
                >
                  <svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M5 25C20 5 40 45 60 25C80 5 95 25 90 20M90 20L80 15M90 20L85 30" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                </motion.div>
              </div>
              
              <p className="text-black font-black uppercase text-xs tracking-[0.3em] mb-12 border-b border-black/5 pb-6 flex items-center gap-4">
                <span className="w-8 h-px bg-yellow-400" />
                A DIGITAL VISIONARY FROM INDIA
              </p>
              
              <div className="space-y-8 text-black/80 text-xl leading-relaxed font-sans font-light">
                <p>
                  He followed his passion for digital marketing straight out of his academic years. Instead of taking the conventional career route, he dived into mastering the depths of social media and SEO strategies.
                </p>
                <p>
                  Starting by helping local businesses improve their online presence, his hard work and expertise eventually led to the creation of PROXIMAX, a company dedicated to helping brands thrive in the digital era.
                </p>
              </div>
            </div>
            
            <div className="relative min-h-[500px] lg:min-h-full bg-yellow-400 flex items-center justify-center p-12 lg:p-20">
              <div className="relative w-full h-full max-w-lg">
                <div className="absolute -top-6 -left-6 w-full h-full border-[12px] border-white rounded-[3rem]" />
                <div className="relative aspect-[4/5] bg-white rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform duration-700">
                  <img 
                    src={founder?.image_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"} 
                    alt={founder?.name || "Founder of PROXIMAX"} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section id="reviews" className="py-32 relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center mb-24">
            <h4 className="text-black font-black uppercase text-xs tracking-[0.4em] mb-4 flex items-center gap-4">
              <span className="w-8 h-px bg-yellow-400" />
              TRUSTED BY THE CLIENTS
            </h4>
            <h2 className="text-5xl md:text-7xl font-sans font-black text-black uppercase tracking-tight text-center">
              WHAT OUR CLIENTS SAYS
            </h2>
          </div>

          <div className="relative">
            <div className="overflow-hidden py-10 px-4 md:px-0">
              <motion.div 
                className="flex gap-8"
                animate={{ x: `-${reviewIndex * (100 / (typeof window !== 'undefined' && window.innerWidth > 768 ? 2 : 1))}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                {REVIEWS.map((review, i) => (
                  <div key={i} className="w-full md:w-[calc(50%-1rem)] shrink-0">
                    <motion.div 
                      className="relative bg-white border border-black/5 rounded-[3rem] p-12 shadow-xl overflow-hidden hover:shadow-2xl transition-all h-full flex flex-col"
                    >
                      {/* Yellow Quote Icon */}
                      <div className="absolute top-8 right-8 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                        <div className="text-black font-black text-4xl mt-2 leading-none font-serif">””</div>
                      </div>

                      {/* Card Glow */}
                      <div className={cn(
                        "absolute -top-20 -left-20 w-64 h-64 blur-[80px] opacity-20",
                        i % 2 === 0 ? "bg-yellow-200" : "bg-pink-100"
                      )} />

                      <div className="relative z-10 flex flex-col items-center text-center h-full">
                        <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-black/5 shadow-inner">
                          <img src={review.logo} alt={review.brand} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="text-2xl font-sans font-black text-black mb-1">{review.brand}</h4>
                        <p className="text-black/40 text-xs font-black mb-6 uppercase tracking-[0.2em]">{review.niche}</p>
                        
                        <div className="flex gap-1 mb-8 text-yellow-400">
                          {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} fill="currentColor" stroke="none" />)}
                        </div>
                        
                        <p className="text-black/70 text-lg leading-relaxed font-sans font-light italic">
                          "{review.text}"
                        </p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-20">
              <button 
                onClick={prevReview}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border border-black/5 shadow-xl flex items-center justify-center text-black hover:bg-black hover:text-white transition-all group"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 rotate-180 group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-20">
              <button 
                onClick={nextReview}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border border-black/5 shadow-xl flex items-center justify-center text-black hover:bg-black hover:text-white transition-all group"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="flex justify-center flex-wrap gap-2 mt-16 max-w-2xl mx-auto">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setReviewIndex(i)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-500",
                  reviewIndex === i ? "bg-yellow-400 w-8" : "bg-black/10 hover:bg-black/20"
                )}
              />
            ))}
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
                  whileHover={{ scale: 1.02, y: -10 }}
                  className="w-[400px] shrink-0 preserve-3d transition-all duration-500"
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
      <section id="contact" className="py-32 relative bg-black overflow-hidden perspective-2000">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10" />
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: '40px 40px' 
        }} />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
            <div>
              <h4 className="text-yellow-400 font-black uppercase text-xs tracking-[0.4em] mb-6 flex items-center gap-4">
                <span className="w-8 h-px bg-yellow-400" />
                GET IN TOUCH
              </h4>
              <h2 className="text-6xl md:text-8xl font-sans font-black text-white uppercase tracking-tight">
                LET'S <span className="text-yellow-400 underline decoration-yellow-400/30 underline-offset-8">CONNECT</span>
              </h2>
            </div>
            <p className="text-white/40 text-lg md:text-xl max-w-sm mt-4 font-sans font-light leading-relaxed">
              We'd Love To Hear From You. Whether You're Curious About Our Services, Features, Or Even Press—We're Ready To Lead You Into The Future Of Marketing.
            </p>
          </div>

          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 md:gap-20">
            <div className="space-y-8">
              {[
                { label: 'CALL US', value: '+91 93415 79348', icon: Phone },
                { label: 'EMAIL ID', value: 'hello@proximax.in', icon: Mail },
                { label: 'VISIT US', value: 'Simdega, Jharkhand (Remote)', icon: MapPin }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-8 bg-white/5 border border-white/5 rounded-3xl p-10 hover:bg-white/10 transition-all duration-500 group"
                >
                  <div className="w-20 h-20 bg-yellow-400 rounded-2xl flex items-center justify-center text-black shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-yellow-400/20">
                    <item.icon className="w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-[10px] uppercase tracking-[0.4em] mb-2 opacity-40">{item.label}</h4>
                    <p className="text-white text-xl font-sans font-light tracking-tight">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-12 md:p-16 rounded-[4rem] text-black"
              >
                <div className="text-center mb-10">
                  <h3 className="text-3xl font-black uppercase mb-2">TAKE YOUR BUSINESS TO NEW HEIGHTS!</h3>
                  <p className="text-black/60 font-medium text-sm">Start Your Journey By Filling Out The Form!</p>
                  <div className="w-full h-px bg-black/10 mt-6" />
                </div>
                
                {submitStatus === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-8 mx-auto">
                      <Check className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-black uppercase mb-4">Message Sent!</h4>
                    <p className="text-black/60 mb-8 font-medium">One of our especialistas will reach out in 24 hours.</p>
                    <button onClick={() => setSubmitStatus('idle')} className="text-black font-black uppercase tracking-widest text-sm border-b-2 border-yellow-400 pb-1">RETRY</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <h3 className="text-2xl md:text-3xl font-sans font-black mb-10 text-black uppercase">TAKE YOUR BUSINESS TO NEW HEIGHTS!</h3>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-black/40 font-black uppercase text-[10px] tracking-[0.2em] ml-2">Your Name</label>
                        <input 
                          required name="name" placeholder="Eg. John Doe" value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-black/5 border-none rounded-2xl px-8 py-5 text-black placeholder:text-black/30 focus:ring-2 focus:ring-yellow-400 outline-none transition-all font-sans font-medium"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-black/40 font-black uppercase text-[10px] tracking-[0.2em] ml-2">Phone Number</label>
                        <input 
                          required name="phone" placeholder="Eg. +91 91234 56789"
                          className="w-full bg-black/5 border-none rounded-2xl px-8 py-5 text-black placeholder:text-black/30 focus:ring-2 focus:ring-yellow-400 outline-none transition-all font-sans font-medium"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-black/40 font-black uppercase text-[10px] tracking-[0.2em] ml-2">Email ID</label>
                      <input 
                        required type="email" name="email" placeholder="Eg. hello@proximax.in" value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-black/5 border-none rounded-2xl px-8 py-5 text-black placeholder:text-black/30 focus:ring-2 focus:ring-yellow-400 outline-none transition-all font-sans font-medium"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-black/40 font-black uppercase text-[10px] tracking-[0.2em] ml-2">Tell Us About Your Project</label>
                      <textarea 
                        required name="message" rows={4} placeholder="Your Message..." value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-black/5 border-none rounded-2xl px-8 py-5 text-black placeholder:text-black/30 focus:ring-2 focus:ring-yellow-400 outline-none transition-all font-sans font-medium resize-none"
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-black text-white hover:bg-yellow-400 hover:text-black font-black uppercase py-6 rounded-2xl transition-all duration-500 shadow-xl shadow-black/10 flex items-center justify-center gap-3 group"
                    >
                      {isSubmitting ? 'Sending...' : 'SEND MESSAGE'}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Conversion Lead Popup */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 sm:p-10 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePopup}
              className="absolute inset-0 bg-bg/80 backdrop-blur-xl pointer-events-auto"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50, rotateX: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="relative w-full max-w-4xl glass-luxury rounded-[4rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden pointer-events-auto perspective-2000"
            >
              <div className="absolute inset-0 bg-grain opacity-[0.05]" />
              <button 
                onClick={closePopup}
                className="absolute top-8 right-8 w-12 h-12 rounded-full glass-premium border border-white/10 flex items-center justify-center text-white hover:text-gold-500 hover:scale-110 transition-all z-20"
              >
                <X size={20} />
              </button>

              <div className="grid md:grid-cols-2">
                {/* Visual Side */}
                <div className="relative overflow-hidden hidden md:block">
                  <img 
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop" 
                    className="w-full h-full object-cover grayscale brightness-50"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-bg via-transparent to-transparent" />
                  <div className="absolute inset-0 p-16 flex flex-col justify-end">
                    <div className="glass-premium p-8 rounded-3xl border border-white/10 backdrop-blur-2xl">
                      <p className="text-gold-500 font-black tracking-luxury text-[10px] mb-4">Limited Opportunity</p>
                      <h4 className="text-3xl font-serif italic text-white mb-4">Stop Losing Potential Clients Today.</h4>
                      <div className="flex items-center gap-4 text-[10px] text-text-dim uppercase tracking-widest font-black italic">
                        <TrendingUp size={16} className="text-gold-500" />
                        Avg. +200% Growth in 90 Days
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Side */}
                <div className="p-12 sm:p-16 relative">
                  <div className="mb-10">
                    <h3 className="text-4xl font-serif italic text-white mb-4">Scale Your Business.</h3>
                    <p className="text-text-muted font-sans font-light">Get a custom growth blueprint from our senior architects.</p>
                  </div>

                  {submitStatus === 'success' ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-20"
                    >
                      <div className="w-20 h-20 rounded-full bg-gold-600/20 border border-gold-600/30 flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 className="text-gold-500 w-10 h-10" />
                      </div>
                      <h4 className="text-3xl font-serif italic text-white mb-4">Success!</h4>
                      <p className="text-text-muted font-sans font-light">One of our specialists will contact you within 24 hours.</p>
                      <button 
                        onClick={closePopup}
                        className="mt-10 btn-premium px-10 py-5 text-[11px]"
                      >
                        Great, Thank You
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <input 
                          required
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-text-dim focus:border-gold-500 transition-colors outline-none text-sm"
                        />
                        <input 
                          required
                          name="phone"
                          placeholder="WhatsApp No."
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-text-dim focus:border-gold-500 transition-colors outline-none text-sm"
                        />
                      </div>
                      <input 
                        required
                        name="email"
                        type="email"
                        placeholder="Business Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-text-dim focus:border-gold-500 transition-colors outline-none text-sm"
                      />
                      <select 
                        required
                        name="service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-gold-500 transition-colors outline-none text-sm appearance-none"
                      >
                        <option value="" disabled className="bg-bg">Target Growth Area</option>
                        <option value="Lead Generation" className="bg-bg">Lead Generation</option>
                        <option value="Advanced SEO" className="bg-bg">Advanced SEO</option>
                        <option value="GMB Optimization" className="bg-bg">GMB Optimization</option>
                        <option value="Full Digital Scaling" className="bg-bg">Full Digital Scaling</option>
                      </select>
                      
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gold-600 text-white py-5 rounded-xl font-display font-black text-[11px] uppercase tracking-luxury hover:bg-gold-700 transition-all shadow-xl shadow-gold-600/20 disabled:opacity-50 mt-4 flex items-center justify-center gap-3"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>Deploy My Blueprint <Zap size={14} /></>
                        )}
                      </button>
                      <p className="text-[9px] text-text-dim text-center uppercase tracking-widest font-black italic">No Spam. Pure Growth Protocol.</p>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AgencyPage;
