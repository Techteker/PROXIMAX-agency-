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
  Search, MapPin, Share2, TrendingUp, Layout, MessageSquare, Target, PenTool, Award, Cpu, Briefcase, FileText, Sparkles, Instagram, ArrowRight, Linkedin, Twitter, Mail, Phone, ShieldCheck, GraduationCap, Clock, Users, HelpCircle, CheckCircle2, Check, Menu: X, X, Calendar
};

const AgencyPage = () => {
  const [heroData, setHeroData] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [agencyFaqs, setAgencyFaqs] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
      <section id="home" className="relative min-h-screen flex items-center pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-[#050505]">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gold-600/10 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gold-900/10 rounded-full blur-[150px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px w-12 bg-gold-500" />
                <span className="text-gold-500 font-display font-black uppercase tracking-[0.5em] text-[10px]">Digital Excellence Agency</span>
              </div>
              
              <h1 className="text-7xl md:text-[10rem] font-serif italic text-white leading-[0.85] tracking-tighter mb-12">
                {heroData?.title || "Elevate Your Digital Presence"}
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-400 font-sans font-light leading-relaxed mb-16 max-w-2xl">
                {heroData?.subtitle || "We craft high-performance digital strategies that transform local businesses into market leaders."}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gold-600 text-white px-12 py-6 rounded-full font-display font-black text-xs uppercase tracking-widest hover:bg-gold-700 transition-all shadow-2xl shadow-gold-600/20 flex items-center gap-4 group"
                >
                  Start Your Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
                
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-[#050505] bg-slate-800 flex items-center justify-center overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Client" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="flex items-center gap-3 pl-8">
                    <div className="flex text-gold-500">
                      {[1, 2, 3, 4, 5].map(i => <Sparkles key={i} className="w-3 h-3 fill-current" />)}
                    </div>
                    <span className="text-[10px] font-display font-black text-white uppercase tracking-widest">500+ Success Stories</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-48 bg-[#0a0a0a] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-32">
            <div className="max-w-2xl">
              <h2 className="text-gold-500 font-display font-black uppercase tracking-[0.5em] text-[10px] mb-8">Our Expertise</h2>
              <h3 className="text-6xl md:text-8xl font-serif italic text-white tracking-tighter leading-[0.9]">
                Strategic <br /> <span className="text-gold-600">Solutions</span>
              </h3>
            </div>
            <p className="text-xl text-slate-500 max-w-md font-sans font-light leading-relaxed">
              We don't just provide services; we build engines for sustainable business growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-[3rem] overflow-hidden">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Target;
              return (
                <div 
                  key={i} 
                  className="group p-16 bg-[#0a0a0a] hover:bg-gold-600 transition-all duration-700 cursor-pointer relative overflow-hidden"
                  onClick={() => setSelectedService(service)}
                >
                  <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="w-16 h-16 rounded-2xl bg-gold-600/10 flex items-center justify-center text-gold-500 mb-12 group-hover:bg-white group-hover:text-gold-600 transition-all duration-500">
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <h4 className="text-3xl font-serif italic text-white mb-6 group-hover:text-white transition-colors">{service.title}</h4>
                  <p className="text-slate-500 font-sans font-light leading-relaxed group-hover:text-gold-100 transition-colors mb-10">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center gap-3 text-[10px] font-display font-black text-gold-500 uppercase tracking-widest group-hover:text-white transition-colors">
                    Explore Service <div className="w-8 h-px bg-current" />
                  </div>
                </div>
              );
            })}
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

      {/* Testimonials */}
      <section id="about" className="py-48 bg-[#0a0a0a] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-32">
            <h2 className="text-gold-500 font-display font-black uppercase tracking-[0.5em] text-[10px] mb-8">Success Stories</h2>
            <h3 className="text-7xl font-serif italic text-white tracking-tighter">Client Voices</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="glass p-12 rounded-[3rem] border border-white/5 relative"
              >
                <div className="text-gold-500 mb-10 flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => <Sparkles key={star} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-xl text-white font-serif italic leading-relaxed mb-12">"{t.content}"</p>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-slate-800 overflow-hidden border-2 border-gold-500/30">
                    <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt={t.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-white font-display font-black text-xs uppercase tracking-widest">{t.author}</h4>
                    <p className="text-gold-500 text-[10px] font-display font-black uppercase tracking-widest opacity-60">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-48 bg-[#050505] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div>
              <h2 className="text-gold-500 font-display font-black uppercase tracking-[0.5em] text-[10px] mb-8">Get In Touch</h2>
              <h3 className="text-7xl md:text-8xl font-serif italic text-white tracking-tighter mb-12 leading-[0.9]">
                Let's Build <br /> <span className="text-gold-600">Something</span> <br /> Extraordinary
              </h3>
              <p className="text-xl text-slate-500 font-sans font-light leading-relaxed mb-16 max-w-md">
                Ready to take your business to the next level? Fill out the form and our strategy team will reach out within 24 hours.
              </p>
              
              <div className="space-y-12">
                <div className="flex items-center gap-8 group">
                  <div className="w-16 h-16 rounded-full glass flex items-center justify-center text-gold-500 group-hover:bg-gold-600 group-hover:text-white transition-all duration-500">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-display font-black text-slate-600 uppercase tracking-widest mb-1">Email Us</p>
                    <p className="text-xl text-white font-serif italic">hello@proximax.in</p>
                  </div>
                </div>
                <div className="flex items-center gap-8 group">
                  <div className="w-16 h-16 rounded-full glass flex items-center justify-center text-gold-500 group-hover:bg-gold-600 group-hover:text-white transition-all duration-500">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-display font-black text-slate-600 uppercase tracking-widest mb-1">Call Us</p>
                    <p className="text-xl text-white font-serif italic">+91 93415 79348</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gold-600/10 blur-[100px] rounded-full" />
              <form 
                onSubmit={handleSubmit}
                className="relative glass p-12 md:p-16 rounded-[3rem] border border-white/10 space-y-8"
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
                    <p className="text-slate-400 font-sans font-light">We'll get back to you shortly.</p>
                  </motion.div>
                )}

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
    </>
  );
};

export default AgencyPage;
