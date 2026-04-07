import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  X,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Cpu,
  Briefcase,
  GraduationCap,
  Clock,
  FileText,
  Users,
  HelpCircle,
  Mail,
  Phone,
  Calendar,
  Check,
  Instagram,
  Linkedin,
  Twitter
} from 'lucide-react';
import { cn } from '../lib/utils';
import { WhatsAppIcon } from './icons/WhatsApp';

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="glass rounded-2xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-gold-500/20">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-8 flex items-center justify-between text-left group"
      >
        <h4 className="text-xl font-serif italic text-white group-hover:text-gold-500 transition-colors flex items-center gap-4">
          <HelpCircle className={cn("w-5 h-5 transition-colors", isOpen ? "text-gold-500" : "text-slate-600")} />
          {question}
        </h4>
        <div className={cn("w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 transition-transform duration-500", isOpen && "rotate-180 bg-gold-600 text-white")}>
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
              <p className="text-slate-400 font-sans font-light leading-relaxed pl-9">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const iconMap: Record<string, any> = {
  Search, MapPin, Share2, TrendingUp, Layout, MessageSquare, Target, PenTool, Award, Cpu, Briefcase, FileText, Sparkles, Instagram, ArrowRight, Linkedin, Twitter, Mail, Phone, ShieldCheck, GraduationCap, Clock, Users, HelpCircle, CheckCircle2, Check, Menu: X, X, Calendar, WhatsApp: WhatsAppIcon
};

const AgencyPage = () => {
  const [heroData, setHeroData] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [agencyFaqs, setAgencyFaqs] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [homeBlogs, setHomeBlogs] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Select a service',
    budget: '',
    message: ''
  });

  useEffect(() => {
    fetch('/api/home').then(res => res.json()).then(data => setHeroData(data.hero));
    fetch('/api/services').then(res => res.json()).then(data => setServices(data));
    fetch('/api/faq').then(res => res.json()).then(data => setAgencyFaqs(data));
    fetch('/api/testimonials').then(res => res.json()).then(data => setTestimonials(data));
    fetch('/api/blogs?limit=3').then(res => res.json()).then(data => setHomeBlogs(data.blogs));
  }, []);

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

  return (
    <>
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
                  <div className="relative z-10">
                    <div className="w-24 h-24 rounded-full bg-gold-600 text-white flex items-center justify-center mb-8 shadow-2xl shadow-gold-500/20 mx-auto">
                      {(() => {
                        const Icon = iconMap[selectedService.icon] || Target;
                        return <Icon className="w-12 h-12" />;
                      })()}
                    </div>
                    <h2 className="text-4xl font-serif italic text-white mb-4 tracking-tight">{selectedService.title}</h2>
                    <p className="text-gold-400 font-display font-black uppercase tracking-[0.3em] text-[10px]">Service Exploration</p>
                  </div>
                </div>

                <div className="p-12 lg:p-16">
                  <h3 className="text-3xl font-serif italic text-white mb-6 leading-tight">{selectedService.headline}</h3>
                  <p className="text-slate-400 mb-10 leading-relaxed font-sans">{selectedService.description}</p>
                  
                  <div className="space-y-10">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 font-display">Core Services</h4>
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
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 tracking-luxury mb-10 relative overflow-hidden group">
              <Sparkles className="w-3 h-3 animate-pulse" />
              The Gold Standard of Digital
            </div>
            <h1 className="text-7xl md:text-9xl font-serif italic leading-[0.85] text-white mb-10 tracking-tighter">
              Best Digital <br />
              <span className="text-gradient">Marketing Agency</span> <br />
              in India.
            </h1>
            <p className="text-xl text-text-muted mb-12 max-w-lg leading-relaxed font-sans font-light">
              PROXIMAX is the leading digital marketing agency in India for local business growth. We specialize in expert SEO services, GMB optimization, and lead generation for Real Estate, Jewellery, and Fashion brands.
            </p>
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                title="Get a Free Digital Marketing Growth Strategy for Your Local Business"
                className="bg-gold-600 text-white px-12 py-5 rounded-full font-display font-black text-xs uppercase tracking-luxury hover:bg-gold-700 transition-all shadow-2xl shadow-gold-600/20 flex items-center gap-3 group"
              >
                Get Free Growth Strategy <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                title="Request a Free SEO & GMB Audit for Your Business"
                className="bg-white/5 text-white border border-white/10 px-12 py-5 rounded-full font-display font-black text-xs uppercase tracking-luxury hover:bg-white/10 transition-all flex items-center gap-3"
              >
                Free SEO Audit <Search className="w-4 h-4" />
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
                className="absolute top-[15%] right-16 z-20 glass-premium p-5 rounded-2xl border border-white/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                <Cpu className="w-8 h-8 text-gold-500" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-[15%] left-16 z-20 glass-premium p-5 rounded-2xl border border-white/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                <ShieldCheck className="w-8 h-8 text-gold-500" />
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                className="absolute top-[45%] right-24 z-20 glass-premium p-4 rounded-xl border border-white/20 backdrop-blur-2xl"
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
                  <span className="tracking-luxury text-gold-500 mb-12 block drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">The Agency of</span>
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
                    <p className="text-lg font-display font-black text-text-muted uppercase tracking-[0.8em]">Local Business Growth</p>
                    <div className="h-[2px] w-12 bg-gold-500/40" />
                  </div>
                </motion.div>
              </div>
              
              {/* Luxury Overlays - High Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-transparent to-[#010101]/60 opacity-90" />
              
              {/* Premium Badge - Large */}
              <div className="absolute top-12 left-12">
                <div className="glass-premium px-8 py-4 rounded-full border border-white/30 flex items-center gap-4 backdrop-blur-3xl shadow-2xl">
                  <div className="w-3 h-3 rounded-full bg-gold-500 animate-ping" />
                  <span className="tracking-luxury text-white">Elite Standard</span>
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
            <div className="absolute -bottom-10 -left-10 glass-premium p-10 rounded-[2rem] z-20 shadow-2xl border border-white/10 backdrop-blur-2xl">
              <div className="text-6xl font-serif italic text-gold-500 mb-1 tracking-tighter">98%</div>
              <div className="text-text-dim tracking-luxury">Client Retention</div>
              <div className="mt-4 flex gap-1">
                {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-1 rounded-full bg-gold-500/40" />)}
              </div>
            </div>

            {/* Floating Element - Awards */}
            <div className="absolute -top-10 -right-10 glass-premium p-8 rounded-[2rem] z-20 shadow-2xl border border-white/10 backdrop-blur-2xl hidden lg:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-600/20 flex items-center justify-center text-gold-500">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl font-serif italic text-white">Award Winning</div>
                  <div className="text-text-dim tracking-luxury">Excellence in Design</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 border-y border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16">
            {[
              { label: 'Successful Projects', value: '250+', icon: Briefcase },
              { label: 'Cities Dominated', value: '15+', icon: MapPin },
              { label: 'Marketing Experts', value: '12+', icon: Users },
              { label: 'Industry Awards', value: '08', icon: Award }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gold-600/10 flex items-center justify-center text-gold-500 mx-auto mb-6 group-hover:bg-gold-600 group-hover:text-white transition-all duration-500">
                  <stat.icon className="w-6 h-6" />
                </div>
                <h4 className="text-5xl font-serif italic text-white mb-2 tracking-tighter">{stat.value}</h4>
                <p className="text-[10px] font-display font-black uppercase tracking-luxury text-text-dim">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-32">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="h-px w-12 bg-gold-500" />
                <span className="tracking-luxury text-gold-500">Our Expertise</span>
              </motion.div>
              <h2 className="text-6xl md:text-8xl font-serif italic text-white leading-[0.9] tracking-tighter">Precision Solutions <br /> for Digital Dominance</h2>
            </div>
            <p className="text-xl text-text-muted max-w-md font-sans font-light leading-relaxed">
              We don't just provide services; we engineer growth engines tailored to your business's unique DNA.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div 
                  onClick={() => setSelectedService(service)}
                  className="glass-premium p-12 rounded-[3rem] border border-white/5 hover:border-gold-500/30 transition-all duration-700 h-full cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold-600/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-gold-600/20 transition-all duration-700" />
                  
                  <div className="w-16 h-16 rounded-2xl bg-gold-600/10 flex items-center justify-center text-gold-500 mb-10 group-hover:bg-gold-600 group-hover:text-white transition-all duration-500">
                    {React.createElement(iconMap[service.icon] || Target, { className: "w-8 h-8" })}
                  </div>
                  
                  <h3 className="text-3xl font-serif italic text-white mb-6 group-hover:text-gold-400 transition-colors">{service.title}</h3>
                  <p className="text-text-muted mb-10 leading-relaxed font-sans font-light">{service.description}</p>
                  
                  <div className="flex items-center gap-4 text-gold-500 group-hover:gap-6 transition-all duration-500">
                    <span className="text-[10px] font-display font-black uppercase tracking-luxury">Explore Solution</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why PROXIMAX Section */}
      <section className="py-60 bg-[#050505] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-gold-500" />
                <span className="tracking-luxury text-gold-500">The PROXIMAX Edge</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-serif italic text-white leading-[0.9] tracking-tighter mb-12">Why We Are the <br /> <span className="text-gradient">Gold Standard</span></h2>
              <p className="text-xl text-text-muted mb-16 font-sans font-light leading-relaxed">
                In a sea of mediocrity, we represent the pinnacle of digital craftsmanship. Our approach combines data-driven precision with artistic intuition.
              </p>
              
              <div className="space-y-10">
                {[
                  { title: 'Local Market Mastery', desc: 'Deep understanding of Indian consumer behavior and local search dynamics.' },
                  { title: 'Performance First', desc: 'Every strategy is measured by its impact on your bottom line and growth.' },
                  { title: 'Elite Technology', desc: 'Leveraging cutting-edge AI and proprietary tools for unmatched results.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="w-12 h-12 rounded-full bg-gold-600/10 flex items-center justify-center text-gold-500 group-hover:bg-gold-600 group-hover:text-white transition-all duration-500 shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-serif italic text-white mb-2">{item.title}</h4>
                      <p className="text-text-dim font-sans font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/10 relative group">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
                  alt="Luxury Office" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
                
                <div className="absolute bottom-12 left-12 right-12 glass-premium p-10 rounded-[2rem] border border-white/10 backdrop-blur-2xl">
                  <p className="text-2xl font-serif italic text-white mb-6 leading-relaxed">
                    "Our mission is to redefine digital excellence for Indian businesses, one success story at a time."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold-500/20" />
                    <div>
                      <div className="text-white font-display font-black text-xs uppercase tracking-luxury">Founder & CEO</div>
                      <div className="text-gold-500 text-[10px] tracking-widest uppercase">PROXIMAX Digital</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-48 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-32">
            <div>
              <h2 className="text-gold-500 font-display font-black uppercase tracking-[0.5em] text-[10px] mb-8">Common Queries</h2>
              <h3 className="text-6xl font-serif italic text-white tracking-tighter mb-12">Frequently <br /> Asked Questions</h3>
              <p className="text-xl text-slate-500 font-sans font-light leading-relaxed mb-16 max-w-md">
                Everything you need to know about our process, results, and how we help your business grow.
              </p>
              
              <div className="glass p-12 rounded-[2.5rem] border border-white/5">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-full bg-gold-600 flex items-center justify-center text-white">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-white font-serif italic text-2xl">Still have questions?</h4>
                    <p className="text-slate-500 text-sm">We're here to help you 24/7.</p>
                  </div>
                </div>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-5 rounded-full border border-gold-500/30 text-gold-500 font-display font-black text-xs uppercase tracking-widest hover:bg-gold-600 hover:text-white transition-all"
                >
                  Contact Support
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {agencyFaqs.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-60 bg-[#080808] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="tracking-luxury text-gold-500 mb-8 block">Voices of Success</span>
              <h2 className="text-6xl md:text-8xl font-serif italic text-white tracking-tighter leading-none">Client Perspectives</h2>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-premium p-12 rounded-[3rem] border border-white/5 relative group"
              >
                <div className="absolute top-10 right-10 text-gold-500/20 group-hover:text-gold-500/40 transition-colors">
                  <Sparkles className="w-12 h-12" />
                </div>
                
                <div className="flex text-gold-500 mb-8">
                  {[...Array(5)].map((_, i) => <Sparkles key={i} className="w-3 h-3 fill-current" />)}
                </div>
                
                <p className="text-xl text-text-muted mb-10 leading-relaxed font-sans font-light italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-gold-600/20 border border-gold-500/20 flex items-center justify-center text-gold-500 font-serif italic text-xl">
                    {testimonial.author[0]}
                  </div>
                  <div>
                    <div className="text-white font-display font-black text-xs uppercase tracking-luxury">{testimonial.author}</div>
                    <div className="text-gold-500 text-[10px] tracking-widest uppercase">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Insights Section */}
      <section className="py-60 bg-[#050505] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-32">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="h-px w-12 bg-gold-500" />
                <span className="tracking-luxury text-gold-500">The Journal</span>
              </motion.div>
              <h2 className="text-6xl md:text-8xl font-serif italic text-white leading-[0.9] tracking-tighter">Latest Insights <br /> & Strategies</h2>
            </div>
            <Link 
              to="/blog"
              className="group flex items-center gap-4 text-gold-500 hover:gap-6 transition-all duration-500"
            >
              <span className="text-[10px] font-display font-black uppercase tracking-luxury">View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {homeBlogs.map((blog, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Link to={`/blog/${blog.slug}`} className="block relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] hover:border-gold-500/30 transition-all duration-700">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img 
                      src={blog.banner} 
                      alt={blog.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
                    <div className="absolute top-6 left-6">
                      <div className="glass-premium px-4 py-2 rounded-full border border-white/20 backdrop-blur-xl">
                        <span className="text-[10px] font-display font-black text-gold-500 uppercase tracking-widest">{blog.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-10">
                    <div className="flex items-center gap-4 mb-6 text-text-dim text-[10px] font-display font-black uppercase tracking-luxury">
                      <Calendar className="w-3 h-3 text-gold-500" />
                      {new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h3 className="text-2xl font-serif italic text-white mb-6 group-hover:text-gold-400 transition-colors line-clamp-2">{blog.title}</h3>
                    <p className="text-text-muted font-sans font-light leading-relaxed line-clamp-3 mb-8">{blog.excerpt}</p>
                    <div className="flex items-center gap-3 text-gold-500 group-hover:gap-5 transition-all duration-500">
                      <span className="text-[10px] font-display font-black uppercase tracking-luxury">Read Article</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-60 bg-[#050505] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-gold-500" />
                <span className="tracking-luxury text-gold-500">Get In Touch</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-serif italic text-white leading-[0.9] tracking-tighter mb-12">Let's Build <br /> <span className="text-gradient">Something</span> <br /> Extraordinary</h2>
              <p className="text-xl text-text-muted mb-16 font-sans font-light leading-relaxed max-w-md">
                Ready to take your business to the next level? Fill out the form and our strategy team will reach out within 24 hours.
              </p>
              
              <div className="space-y-12">
                <div className="flex items-center gap-8 group">
                  <div className="w-16 h-16 rounded-full glass-premium flex items-center justify-center text-gold-500 group-hover:bg-gold-600 group-hover:text-white transition-all duration-500">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury mb-1">Email Us</p>
                    <p className="text-2xl font-serif italic text-white">hello@proximax.in</p>
                  </div>
                </div>
                <div className="flex items-center gap-8 group">
                  <div className="w-16 h-16 rounded-full glass-premium flex items-center justify-center text-gold-500 group-hover:bg-gold-600 group-hover:text-white transition-all duration-500">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury mb-1">Call Us</p>
                    <p className="text-2xl font-serif italic text-white">+91 93415 79348</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gold-600/10 blur-[100px] rounded-full" />
              <form 
                onSubmit={handleSubmit}
                className="relative glass-premium p-12 md:p-16 rounded-[3rem] border border-white/10 space-y-8"
              >
                {isSubmitted && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-xl rounded-[3rem] p-12 text-center"
                  >
                    <div className="w-20 h-20 bg-gold-600/20 rounded-full flex items-center justify-center text-gold-500 mb-8">
                      <Check className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-serif italic text-white mb-4">Message Sent!</h3>
                    <p className="text-text-muted font-sans font-light">We'll get back to you shortly.</p>
                  </motion.div>
                )}

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury ml-1">Full Name</label>
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
                    <label className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury ml-1">Email Address</label>
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
                  <label className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury ml-1">Service Interested In</label>
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
                  <label className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury ml-1">Your Budget</label>
                  <input 
                    type="text" 
                    placeholder="e.g. ₹50,000 or $600"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-gold-500 transition-colors font-sans"
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury ml-1">Message</label>
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
                  className={`w-full bg-gold-600 text-white py-5 rounded-full font-display font-black text-xs uppercase tracking-luxury hover:bg-gold-700 transition-all shadow-xl shadow-gold-600/20 flex items-center justify-center gap-3 group/submit ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AgencyPage;
