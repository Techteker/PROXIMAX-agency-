import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  User, 
  Briefcase, 
  Users, 
  Send, 
  Check, 
  X,
  ChevronDown,
  Globe,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  MapPin,
  GraduationCap,
  DollarSign,
  Sparkles,
  Target
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { cn } from '../lib/utils';

type FormType = 'Contact' | 'Internship' | 'Influencer';

interface FormsSectionProps {
  defaultTab?: FormType;
}

export const FormsSection = ({ defaultTab = 'Contact' }: FormsSectionProps) => {
  const [activeForm, setActiveForm] = useState<FormType>(defaultTab);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const result = await emailjs.sendForm(
        'service_ind0oyk',
        'template_f9lvw8e',
        formRef.current,
        'rjOxQ70915IIF0uSP'
      );

      if (result.text === 'OK') {
        setSubmitStatus('success');
        formRef.current.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formTabs = [
    { id: 'Contact', label: 'Contact Us', icon: MessageSquare },
    { id: 'Internship', label: 'Internship', icon: GraduationCap },
    { id: 'Influencer', label: 'Influencer', icon: Users },
  ];

  return (
    <section id="forms-section" className="py-32 relative overflow-hidden bg-[#050505]">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gold-600/5 rounded-full blur-[200px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-900/10 rounded-full blur-[150px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-600/10 rounded-full blur-[150px] -ml-48 -mb-48" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gold-500 text-[10px] font-display font-black uppercase tracking-luxury mb-8"
          >
            <Sparkles className="w-3 h-3" />
            Connect With Excellence
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif italic text-white mb-6 tracking-tighter leading-none"
          >
            Architect Your <span className="text-gold-500">Future.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-muted max-w-2xl mx-auto font-sans font-light leading-relaxed"
          >
            Whether you're looking for expert services, a career-defining internship, or a creative partnership, we're ready to build with you.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Form Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {formTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveForm(tab.id as FormType);
                  setSubmitStatus('idle');
                }}
                className={cn(
                  "flex items-center gap-3 px-8 py-4 rounded-full font-display font-black text-[10px] uppercase tracking-luxury transition-all duration-500 border",
                  activeForm === tab.id 
                    ? "bg-gold-600 border-gold-600 text-white shadow-xl shadow-gold-600/20" 
                    : "bg-white/5 border-white/10 text-text-dim hover:border-gold-500/30 hover:text-white"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Container */}
          <div className="relative">
            <div className="absolute inset-0 bg-gold-600/20 blur-[120px] -z-10 opacity-30" />
            <motion.div
              key={activeForm}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass-premium p-8 md:p-16 rounded-[3rem] border border-white/10 relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <div className="w-24 h-24 bg-gold-600/20 rounded-full flex items-center justify-center text-gold-500 mb-8 mx-auto">
                      <Check className="w-12 h-12" />
                    </div>
                    <h4 className="text-4xl font-serif italic text-white mb-4">Submission Successful!</h4>
                    <p className="text-text-muted text-lg mb-12 max-w-md mx-auto">
                      Thank you for reaching out to PROXIMAX. Our team will review your details and get back to you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitStatus('idle')}
                      className="bg-gold-600 text-white px-12 py-5 rounded-full font-display font-black text-xs uppercase tracking-luxury hover:bg-gold-700 transition-all shadow-2xl shadow-gold-600/20"
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8"
                  >
                    <input type="hidden" name="form_type" value={activeForm} />
                    
                    {activeForm === 'Contact' && (
                      <div className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury ml-1">Full Name</label>
                            <div className="relative">
                              <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/50" />
                              <input 
                                name="full_name"
                                type="text" required placeholder="John Doe"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors font-sans"
                              />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <label className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury ml-1">Email Address</label>
                            <div className="relative">
                              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/50" />
                              <input 
                                name="email"
                                type="email" required placeholder="john@example.com"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors font-sans"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury ml-1">Phone Number</label>
                            <div className="relative">
                              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/50" />
                              <input 
                                name="phone"
                                type="tel" required placeholder="+91 00000 00000"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors font-sans"
                              />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <label className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury ml-1">Service Required</label>
                            <div className="relative">
                              <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/50" />
                              <select 
                                name="service"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-12 py-5 text-white focus:outline-none focus:border-gold-500 transition-colors font-sans appearance-none"
                              >
                                <option value="" className="bg-[#0a0a0a]">Select a Service</option>
                                <option value="SEO & GMB Optimization" className="bg-[#0a0a0a]">SEO & GMB Optimization</option>
                                <option value="Website Development" className="bg-[#0a0a0a]">Website Development</option>
                                <option value="Social Media Marketing" className="bg-[#0a0a0a]">Social Media Marketing</option>
                                <option value="Performance Ads" className="bg-[#0a0a0a]">Performance Ads</option>
                                <option value="Branding & Design" className="bg-[#0a0a0a]">Branding & Design</option>
                              </select>
                              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim pointer-events-none" />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury ml-1">Budget Range</label>
                          <div className="relative">
                            <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/50" />
                            <input 
                              name="budget"
                              type="text" placeholder="e.g. ₹50k - ₹1L"
                              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors font-sans"
                            />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury ml-1">Message</label>
                          <div className="relative">
                            <MessageSquare className="absolute left-5 top-6 w-4 h-4 text-gold-500/50" />
                            <textarea 
                              name="message"
                              rows={4} required placeholder="Tell us about your project goals..."
                              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors resize-none font-sans"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeForm === 'Internship' && (
                      <div className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury ml-1">Full Name</label>
                            <div className="relative">
                              <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/50" />
                              <input 
                                name="full_name"
                                type="text" required placeholder="John Doe"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors font-sans"
                              />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <label className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury ml-1">Phone (WhatsApp)</label>
                            <div className="relative">
                              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/50" />
                              <input 
                                name="phone"
                                type="tel" required placeholder="+91 00000 00000"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors font-sans"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury ml-1">Email Address</label>
                            <div className="relative">
                              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/50" />
                              <input 
                                name="email"
                                type="email" required placeholder="john@example.com"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors font-sans"
                              />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <label className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury ml-1">College/University</label>
                            <div className="relative">
                              <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/50" />
                              <input 
                                name="college"
                                type="text" required placeholder="Your Institution"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors font-sans"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury ml-1">Select Role</label>
                          <div className="relative">
                            <Target className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/50" />
                            <select 
                              name="role"
                              required
                              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-12 py-5 text-white focus:outline-none focus:border-gold-500 transition-colors font-sans appearance-none"
                            >
                              <option value="" className="bg-[#0a0a0a]">Select a Role</option>
                              <option value="Digital Marketing Intern" className="bg-[#0a0a0a]">Digital Marketing Intern</option>
                              <option value="Sales Intern" className="bg-[#0a0a0a]">Sales Intern</option>
                              <option value="Content Creator" className="bg-[#0a0a0a]">Content Creator</option>
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim pointer-events-none" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury ml-1">Why should we hire you?</label>
                          <div className="relative">
                            <MessageSquare className="absolute left-5 top-6 w-4 h-4 text-gold-500/50" />
                            <textarea 
                              name="message"
                              rows={4} required placeholder="Tell us about your motivation and skills..."
                              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors resize-none font-sans"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeForm === 'Influencer' && (
                      <div className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury ml-1">Full Name</label>
                            <div className="relative">
                              <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/50" />
                              <input 
                                name="full_name"
                                type="text" required placeholder="John Doe"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors font-sans"
                              />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <label className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury ml-1">Email Address</label>
                            <div className="relative">
                              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/50" />
                              <input 
                                name="email"
                                type="email" required placeholder="john@example.com"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors font-sans"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury ml-1">WhatsApp Number</label>
                            <div className="relative">
                              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/50" />
                              <input 
                                name="phone"
                                type="tel" required placeholder="+91 00000 00000"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors font-sans"
                              />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <label className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury ml-1">City</label>
                            <div className="relative">
                              <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/50" />
                              <input 
                                name="city"
                                type="text" required placeholder="Your City"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors font-sans"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury ml-1">Primary Platform</label>
                            <div className="relative">
                              <Globe className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/50" />
                              <select 
                                name="platform"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-12 py-5 text-white focus:outline-none focus:border-gold-500 transition-colors font-sans appearance-none"
                              >
                                <option value="Instagram" className="bg-[#0a0a0a]">Instagram</option>
                                <option value="YouTube" className="bg-[#0a0a0a]">YouTube</option>
                                <option value="Facebook" className="bg-[#0a0a0a]">Facebook</option>
                                <option value="Twitter" className="bg-[#0a0a0a]">Twitter (X)</option>
                              </select>
                              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim pointer-events-none" />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <label className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury ml-1">Profile Link</label>
                            <div className="relative">
                              <Globe className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/50" />
                              <input 
                                name="profile_link"
                                type="url" required placeholder="https://instagram.com/yourprofile"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors font-sans"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury ml-1">Followers Count</label>
                          <div className="relative">
                            <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/50" />
                            <input 
                              name="followers"
                              type="text" required placeholder="e.g. 10k, 50k, 1M"
                              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors font-sans"
                            />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-display font-black text-text-dim uppercase tracking-luxury ml-1">Message</label>
                          <div className="relative">
                            <MessageSquare className="absolute left-5 top-6 w-4 h-4 text-gold-500/50" />
                            <textarea 
                              name="message"
                              rows={4} placeholder="Tell us more about your niche..."
                              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white placeholder:text-text-dim focus:outline-none focus:border-gold-500 transition-colors resize-none font-sans"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    )}

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gold-600 text-white py-6 rounded-full font-display font-black text-xs uppercase tracking-luxury hover:bg-gold-700 transition-all shadow-xl shadow-gold-600/20 flex items-center justify-center gap-3 group/submit disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      )}
                      {isSubmitting ? 'Processing...' : `Submit ${activeForm} Application`}
                    </button>
                    
                    {submitStatus === 'error' && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-500 text-center text-xs font-medium"
                      >
                        Something went wrong. Please try again or contact us directly.
                      </motion.p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
