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
  ArrowUpRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { services, SAMPLE_BLOGS } from '../constants';
import { Link } from 'react-router-dom';
import { submitContactInquiry } from '../services/supabaseService';

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="glass-premium rounded-2xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-gold-500/20 relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-gold-600/0 via-gold-600/0 to-gold-600/0 group-hover:from-gold-600/5 group-hover:via-transparent group-hover:to-gold-600/5 transition-all duration-700 pointer-events-none" />
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-8 flex items-center justify-between text-left group"
      >
        <h4 className="text-xl font-serif italic text-white group-hover:text-gold-500 transition-colors flex items-center gap-4">
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
    <>
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
      <section id="home" className="relative pt-48 pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold-600/10 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gold-900/10 rounded-full blur-[150px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gold-500 text-[8px] md:text-[10px] font-display font-black uppercase tracking-luxury mb-6 md:mb-8">
                <Sparkles className="w-3 h-3" />
                Trusted by growing businesses | Limited slots available each month
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif italic text-white mb-6 md:mb-8 tracking-tighter leading-[0.9]">
                Digital Marketing Agency <br /> <span className="text-gradient">India: SEO & Lead Generation</span> <br /> Experts.
              </h1>
              <p className="text-base md:text-xl text-text-muted max-w-xl mb-8 md:mb-12 font-sans font-light leading-relaxed">
                As a premier Digital Marketing Agency India, we provide expert SEO Services India and GMB Optimization to help local businesses dominate search results and grow revenue.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-premium text-white px-8 md:px-12 py-4 md:py-5 text-[10px] md:text-xs flex items-center justify-center gap-3 group"
                >
                  Start Your Growth Today <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-4 px-6 md:px-8 py-4 md:py-5 rounded-full glass-premium border border-white/10">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#050505] bg-gold-600 flex items-center justify-center text-[8px] md:text-[10px] font-bold text-white">
                        {i}
                      </div>
                    ))}
                  </div>
                  <div className="text-left">
                    <p className="text-white font-bold text-xs md:text-sm">50+ Clients</p>
                    <p className="text-[8px] md:text-[10px] text-text-dim uppercase tracking-widest">Trust PROXIMAX</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: 20, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative perspective-2000 mt-12 md:mt-0"
            >
              <motion.div 
                whileHover={{ 
                  rotateY: -15, 
                  rotateX: 10,
                  scale: 1.05,
                  translateZ: 50
                }}
                whileTap={{ scale: 0.95, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className="relative z-10 aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5),0_0_50px_rgba(212,175,55,0.1)] group preserve-3d"
              >
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80" 
                  alt="PROXIMAX Digital Marketing Agency Team working on SEO and GMB optimization in India" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                
                {/* 3D Floating Elements inside the card */}
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div 
                    animate={{ 
                      y: [0, -10, 0],
                      x: [0, 5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-12 right-12 w-24 h-24 bg-gold-500/10 rounded-full blur-2xl"
                  />
                </div>

                {/* Floating Stats Card */}
                <motion.div 
                  style={{ transformStyle: "preserve-3d", translateZ: "100px" }}
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-12 left-12 right-12 glass-premium p-8 rounded-3xl border border-white/10 backdrop-blur-2xl shadow-2xl"
                >
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-gold-500 font-display font-black text-3xl mb-1">98%</p>
                      <p className="text-[10px] text-text-dim uppercase tracking-luxury">Client Retention Rate</p>
                    </div>
                    <div>
                      <p className="text-gold-500 font-display font-black text-3xl mb-1">10x</p>
                      <p className="text-[10px] text-text-dim uppercase tracking-luxury">Potential ROI</p>
                    </div>
                  </div>
                  <p className="text-[8px] text-text-dim/50 mt-4 text-center uppercase tracking-widest">Based on internal campaign performance data</p>
                </motion.div>
              </motion.div>
              
              {/* Decorative Elements with 3D Depth */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold-600/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gold-900/20 rounded-full blur-3xl" />
              
              {/* 3D Orbiting Ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-10%] border border-gold-500/10 rounded-full pointer-events-none"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-gold-500 tracking-luxury mb-8 uppercase text-sm font-black">SEO Services India</h2>
              <h3 className="text-5xl md:text-7xl font-serif italic text-white tracking-tighter leading-none">
                GMB Optimization <br /> <span className="text-gold-500">& Lead Generation.</span>
              </h3>
            </div>
            <p className="text-text-muted max-w-sm font-sans font-light leading-relaxed">
              Our Digital Marketing Agency India builds high-performance systems that generate consistent leads, calls, and customers for your business.
            </p>
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
                className="group relative glass-premium p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 hover:border-gold-500/30 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold-600/0 via-transparent to-transparent group-hover:from-gold-600/5 transition-all duration-700" />
                
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3", service.color)}>
                  <service.icon className="w-8 h-8" />
                </div>
                
                <h4 className="text-2xl font-serif italic text-white mb-4 group-hover:text-gold-500 transition-colors">{service.title}</h4>
                <p className="text-text-muted leading-relaxed font-sans font-light mb-8 line-clamp-2">{service.description}</p>
                
                <div className="flex items-center gap-3 text-gold-500 font-display font-black text-[10px] uppercase tracking-luxury group-hover:gap-5 transition-all">
                  Explore Service <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-600/5 rounded-full blur-[150px] -mr-96 -mt-96" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 relative z-10 group"
              >
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" 
                  alt="Rajendar Rana - Founder and CEO of PROXIMAX Digital Marketing Agency" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-1000" />
                
                <div className="absolute bottom-12 left-12 right-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  >
                    <p className="text-white font-serif italic text-5xl mb-3 tracking-tighter">Rajendar Rana</p>
                    <div className="flex items-center gap-4">
                      <div className="h-px w-8 bg-gold-500" />
                      <p className="text-gold-500 tracking-luxury uppercase text-[10px] font-black">Founder & Visionary</p>
                    </div>
                  </motion.div>
                </div>

                {/* Interactive Overlay */}
                <div className="absolute inset-0 border-[20px] border-white/0 group-hover:border-white/[0.02] transition-all duration-1000 pointer-events-none" />
              </motion.div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-12 -left-12 w-64 h-64 border border-gold-600/10 rounded-full animate-spin-slow" />
              <div className="absolute -bottom-12 -right-12 w-80 h-80 border border-gold-900/5 rounded-full animate-reverse-spin" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gold-600/5 rounded-full blur-[120px] -z-10" />
            </div>

            <div>
              <h2 className="text-gold-500 tracking-luxury mb-8 uppercase text-sm font-black">Lead Generation Agency</h2>
              <h3 className="text-5xl md:text-6xl font-serif italic text-white mb-10 leading-tight tracking-tighter">
                Results-Focused <br /> <span className="text-gold-500">SEO Execution.</span>
              </h3>
              <div className="space-y-8 text-lg text-text-muted font-sans font-light leading-relaxed">
                <p>
                  PROXIMAX is a leading Digital Marketing Agency India created to help businesses generate real results — leads, calls, and customers — through expert SEO Services India.
                </p>
                <p>
                  As a specialized Lead Generation Agency, we focus on measurable outcomes and data-driven GMB Optimization. We turn your online presence into a consistent customer acquisition machine.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-12 mt-16">
                <div>
                  <p className="text-4xl font-display font-black text-white mb-2">50+</p>
                  <p className="text-xs text-text-dim uppercase tracking-luxury">Successful Projects</p>
                </div>
                <div>
                  <p className="text-4xl font-display font-black text-white mb-2">15+</p>
                  <p className="text-xs text-text-dim uppercase tracking-luxury">Expert Strategists</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section id="blog" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div>
              <h2 className="text-gold-500 tracking-luxury mb-8 uppercase text-sm font-black">Insights</h2>
              <h3 className="text-5xl md:text-7xl font-serif italic text-white tracking-tighter leading-none">
                Growth <br /> <span className="text-gold-500">Strategies.</span>
              </h3>
            </div>
            <Link 
              to="/blog" 
              className="group flex items-center gap-4 text-white font-display font-black text-xs uppercase tracking-luxury hover:text-gold-500 transition-colors"
            >
              View All Articles <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold-500 transition-colors"><ArrowUpRight className="w-5 h-5" /></div>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {homeBlogs.map((blog, i) => (
              <Link 
                key={blog.slug}
                to={`/blog/${blog.slug}`}
                className="group block"
              >
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-8 border border-white/5">
                  <img 
                    src={blog.image || blog.banner} 
                    alt={`Blog Post: ${blog.title} - PROXIMAX Insights`}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-6 left-6 px-4 py-2 rounded-full glass-premium text-[10px] font-display font-black text-white uppercase tracking-luxury">
                    {blog.category}
                  </div>
                </div>
                <h4 className="text-2xl font-serif italic text-white mb-4 group-hover:text-gold-500 transition-colors line-clamp-2">{blog.title}</h4>
                <div className="flex items-center gap-6 text-[10px] text-text-dim uppercase tracking-luxury">
                  <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {blog.readTime} min read</span>
                  <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-gold-500 tracking-luxury mb-8 uppercase text-sm font-black">Knowledge Base</h2>
              <h3 className="text-5xl md:text-6xl font-serif italic text-white mb-10 leading-tight tracking-tighter">
                Common <br /> <span className="text-gold-500">Questions.</span>
              </h3>
              <p className="text-lg text-text-muted font-sans font-light leading-relaxed mb-12">
                Everything you need to know about our process, results, and how we can help your business grow.
              </p>
              <div className="glass-premium p-10 rounded-3xl border border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gold-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h4 className="text-white font-serif italic text-2xl mb-4 relative z-10">Still have questions?</h4>
                <p className="text-text-muted mb-8 relative z-10">Our team is ready to help you with any specific inquiries you might have.</p>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gold-500 font-display font-black text-xs uppercase tracking-luxury flex items-center gap-3 group/btn relative z-10"
                >
                  Contact Support <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
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

            <div className="relative">
              <div className="absolute inset-0 bg-gold-600/20 blur-[100px] -z-10 opacity-30" />
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-premium p-12 md:p-16 rounded-[3rem] border border-white/10 relative overflow-hidden"
              >
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
    </>
  );
};

export default AgencyPage;
