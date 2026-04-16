import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import emailjs from '@emailjs/browser';
import { 
  CheckCircle2, 
  Check, 
  Award, 
  Target, 
  Cpu, 
  ArrowRight, 
  GraduationCap, 
  Users, 
  Clock, 
  Briefcase, 
  FileText, 
  Sparkles, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  ShieldCheck, 
  HelpCircle, 
  Menu, 
  X, 
  Calendar 
} from 'lucide-react';
import { submitInternshipApplication } from '../services/supabaseService';

import { cn } from '../lib/utils';
import { WhatsAppIcon } from './icons/WhatsApp';

import { 
  internshipRoles as roles, 
  internshipBenefits as benefits,
  internshipLearningPoints as learningPoints
} from '../constants';

const InternshipPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    college: '',
    role: 'Digital Marketing Intern',
    motivation: ''
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const encode = (data: any) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // 1. Submit to Supabase (Non-blocking)
      submitInternshipApplication({
        fullName: formData.name,
        email: formData.email,
        whatsapp: formData.phone,
        city: formData.college, // Using college field for city as per schema or vice versa
        position: formData.role,
        message: formData.motivation
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
      }
      
      alert("Application Submitted Successfully!");
      setIsSubmitted(true);
      setFormData({ name: '', phone: '', email: '', college: '', role: 'Digital Marketing Intern', motivation: '' });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitError("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#050505]">
      <Helmet>
        <title>Digital Marketing Internship in India 2026 | PROXIMAX Academy</title>
        <meta name="description" content="Join the best digital marketing internship in India. Gain hands-on experience in SEO, GMB optimization, and performance marketing with PROXIMAX. Apply now for 2026!" />
        <meta name="keywords" content="digital marketing internship india, best seo internship, gmb optimization training india, proximax academy internship" />
        <link rel="canonical" href="https://proximax.in/internship" />
      </Helmet>
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gold-900/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-serif italic text-white mb-8 tracking-tighter leading-[0.9]">
              Digital Marketing <br /> <span className="text-gradient">Internship – Learn & Earn.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-sans font-light leading-relaxed">
              Work on real client projects, develop practical skills, and earn performance-based stipends while building your professional portfolio.
            </p>
            <button 
              onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-premium text-white px-12 py-5 text-xs"
            >
              Apply Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* About Internship */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-gold-500 font-display font-black uppercase tracking-[0.5em] text-[10px] mb-8">Why Join Us</h2>
              <h3 className="text-5xl font-serif italic text-white mb-8 leading-tight">Practical <br /> Skill Development. <br /> True Growth.</h3>
              <p className="text-lg text-slate-400 leading-relaxed font-sans font-light mb-8">
                At PROXIMAX, we focus on real-world execution. You won't just learn theory — you'll manage actual campaigns and generate real results for real clients.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-gold-500">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="text-sm text-white font-medium">Flexible Timing</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-gold-500">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="text-sm text-white font-medium">Remote Work</span>
                </div>
              </div>
            </motion.div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden glass border border-white/10 p-8 flex flex-col justify-center">
                <div className="space-y-6">
                  {benefits.map((b: any, i: number) => {
                    const Icon = b.icon || Award;
                    return (
                      <div key={i} className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-gold-500/30 transition-all">
                        <div className="w-12 h-12 rounded-full bg-gold-600/20 flex items-center justify-center text-gold-500">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white font-serif italic text-xl">{b.title}</span>
                          {b.subtitle && (
                            <span className="text-text-dim text-[10px] uppercase tracking-widest mt-1">
                              {b.subtitle}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Available */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-gold-500 font-display font-black uppercase tracking-[0.5em] text-[10px] mb-8">Open Positions</h2>
            <h3 className="text-6xl font-serif italic text-white tracking-tighter">Internship Roles</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roles.map((role: any, i: number) => {
              const Icon = role.icon || Target;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-10 rounded-3xl border border-white/5 hover:border-gold-500/30 transition-all group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gold-600/10 flex items-center justify-center text-gold-500 mb-8 group-hover:bg-gold-600 group-hover:text-white transition-all duration-500">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-serif italic text-white mb-4">{role.title}</h4>
                  <p className="text-slate-500 leading-relaxed font-sans font-light">{role.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What You Will Learn */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white/5 rounded-[3rem] p-16 md:p-24 border border-white/5">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-gold-500 font-display font-black uppercase tracking-[0.5em] text-[10px] mb-8">Curriculum</h2>
                <h3 className="text-5xl font-serif italic text-white mb-10 leading-tight">Digital Marketing <br /> Internship Curriculum</h3>
                <div className="space-y-6">
                  {learningPoints.map((point: string, i: number) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-gold-600/20 flex items-center justify-center text-gold-500 shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-slate-300 font-sans font-light">{point}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-12">
                  <a href="/" className="text-gold-500 hover:text-gold-400 transition-colors flex items-center gap-2 font-display font-black text-[10px] uppercase tracking-widest">
                    View Agency Services <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="aspect-square glass rounded-3xl p-8 flex flex-col justify-end">
                    <div className="text-4xl font-serif italic text-white mb-2">1-3</div>
                    <div className="text-[10px] font-display font-black text-slate-600 uppercase tracking-widest">Months Duration</div>
                  </div>
                  <div className="aspect-[4/5] bg-gold-600 rounded-3xl p-8 flex flex-col justify-end">
                    <div className="text-4xl font-serif italic text-white mb-2">100%</div>
                    <div className="text-[10px] font-display font-black text-gold-100 uppercase tracking-widest">Practical Work</div>
                  </div>
                </div>
                <div className="space-y-6 pt-12">
                  <div className="aspect-[4/5] glass rounded-3xl p-8 flex flex-col justify-end">
                    <div className="text-4xl font-serif italic text-white mb-2">Remote</div>
                    <div className="text-[10px] font-display font-black text-slate-600 uppercase tracking-widest">Work Location</div>
                  </div>
                  <div className="aspect-square glass rounded-3xl p-8 flex flex-col justify-end border-gold-500/30">
                    <div className="text-4xl font-serif italic text-white mb-2">Elite</div>
                    <div className="text-[10px] font-display font-black text-slate-600 uppercase tracking-widest">Mentorship</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-gold-500 font-display font-black uppercase tracking-[0.5em] text-[10px] mb-8">Prerequisites</h2>
          <h3 className="text-5xl font-serif italic text-white mb-16">What You Need</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { t: "Smartphone/Laptop", i: Cpu },
              { t: "Stable Internet", i: ArrowRight },
              { t: "Eagerness to Learn", i: GraduationCap },
              { t: "Basic Communication", i: Users }
            ].map((req, i) => (
              <div key={i} className="glass px-10 py-8 rounded-2xl border border-white/5 flex items-center gap-6">
                <req.i className="w-6 h-6 text-gold-500" />
                <span className="text-white font-medium">{req.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-form" className="py-32 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="glass p-12 md:p-16 rounded-[3rem] border border-white/10 relative overflow-hidden">
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0a0a0a] p-12 text-center"
              >
                <div className="w-24 h-24 bg-gold-600/20 rounded-full flex items-center justify-center text-gold-500 mb-8">
                  <Check className="w-12 h-12" />
                </div>
                <h3 className="text-4xl font-serif italic text-white mb-6">Application Received!</h3>
                <p className="text-slate-400 text-lg leading-relaxed mb-10">
                  Thank you for applying to PROXIMAX. <br />
                  Our team will review your profile and contact you if you're a good fit for the program.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-gold-500 font-display font-black text-xs uppercase tracking-widest hover:text-gold-400 transition-colors"
                >
                  Submit Another Application
                </button>
              </motion.div>
            ) : null}

            <div className="text-center mb-16">
              <h2 className="text-gold-500 font-display font-black uppercase tracking-[0.5em] text-[10px] mb-6">Apply Now</h2>
              <h3 className="text-5xl font-serif italic text-white tracking-tighter">Start Your Journey Today</h3>
            </div>

            <form 
              className="space-y-8" 
              onSubmit={handleSubmit}
              name="internship"
            >
              <input type="hidden" name="form_type" value="Internship" />
              {submitError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-2xl text-center">
                  {submitError}
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-display font-black text-slate-600 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    name="name"
                    type="text" required placeholder="Your Name"
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-display font-black text-slate-600 uppercase tracking-widest ml-1">Phone (WhatsApp)</label>
                  <input 
                    name="phone"
                    type="tel" required placeholder="+91 00000 00000"
                    value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-display font-black text-slate-600 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    name="email"
                    type="email" required placeholder="you@example.com"
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-display font-black text-slate-600 uppercase tracking-widest ml-1">College/University</label>
                  <input 
                    name="college"
                    type="text" required placeholder="Your Institution"
                    value={formData.college} onChange={(e) => setFormData({...formData, college: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-display font-black text-slate-600 uppercase tracking-widest ml-1">Select Role</label>
                <select 
                  name="role"
                  value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-gold-500 transition-colors appearance-none"
                >
                  {roles.map((role: any, i: number) => <option key={i} className="bg-[#0a0a0a]">{role.title}</option>)}
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-display font-black text-slate-600 uppercase tracking-widest ml-1">Why should we hire you?</label>
                <textarea 
                  name="message"
                  rows={4} required placeholder="Tell us about your motivation..."
                  value={formData.motivation} onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-gold-500 transition-colors resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className={`btn-premium w-full text-white py-6 text-xs flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
                {!isSubmitting && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>
          </div>
        </div>
      </section>
      {/* SEO Section (Hidden visually but kept for SEO) */}
      <section className="sr-only" aria-hidden="false">
        <div className="max-w-7xl mx-auto px-6">
          <h2>Digital Marketing Internship in India - PROXIMAX</h2>
          <p>
            Join the best digital marketing internship program in India. We offer hands-on experience in SEO services, GMB optimization, social media management, and performance marketing. 
            Our internship with certificate is designed for students and graduates looking to build a career in the digital marketing industry. 
            Learn from GMB experts and SEO specialists while working on real-world projects.
          </p>
          <ul>
            <li>Digital Marketing Internship with Certificate</li>
            <li>SEO Internship India</li>
            <li>GMB Optimization Training</li>
            <li>Social Media Marketing Internship</li>
            <li>Performance Marketing Experience</li>
            <li>Lead Generation Strategies for Local Business</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default InternshipPage;
