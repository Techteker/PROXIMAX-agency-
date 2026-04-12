import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, Send } from 'lucide-react';
import { submitInfluencerApplication } from '../services/supabaseService';

import { influencerBenefits as benefits } from '../constants';

const InfluencerApplyPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    city: '',
    platform: 'Instagram',
    profileLink: '',
    followers: '',
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
    setSubmitStatus('idle');
    try {
      // 1. Submit to Supabase
      await submitInfluencerApplication(formData);

      // 2. Submit to EmailJS (optional backup)
      try {
        await (window as any).emailjs.sendForm(
          'service_ind0oyk',
          'template_f9lvw8e',
          e.target
        );
      } catch (emailError) {
        console.warn("EmailJS Backup failed, but Supabase succeeded:", emailError);
      }
      
      alert("Application Submitted Successfully!");
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        whatsapp: '',
        city: '',
        platform: 'Instagram',
        profileLink: '',
        followers: '',
        message: ''
      });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-gold-500/30">
      <Helmet>
        <title>Influencer Marketing Agency India | Join PROXIMAX Network</title>
        <meta name="description" content="Join the top influencer marketing agency in India. PROXIMAX connects creators with premium brands for high-impact collaborations. Apply now to grow your influence!" />
        <meta name="keywords" content="influencer marketing agency india, join influencer network india, brand collaborations for creators, proximax influencer network" />
        <link rel="canonical" href="https://proximax.in/influencer-apply" />
      </Helmet>
      {/* Header / Banner */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold-600/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gold-900/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-serif italic text-white mb-8 tracking-tighter leading-[0.9]">
              Partner with <br /> <span className="text-gold-500">PROXIMAX as an Influencer.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Join our exclusive network and get access to paid collaborations, affiliate opportunities, and brand growth support.
            </p>
            <button 
              onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gold-600 text-white px-12 py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-gold-700 transition-all shadow-2xl shadow-gold-600/20"
            >
              Apply Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-gold-500 tracking-widest uppercase text-sm font-bold mb-4">Why Partner With Us?</h2>
            <h3 className="text-4xl md:text-5xl font-serif italic text-white">Exclusive Benefits for Creators</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 p-8 rounded-2xl border border-white/5 hover:border-gold-500/30 transition-all flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-gold-600/20 flex items-center justify-center text-gold-500 shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg text-gray-200 font-medium">{benefit.title}</span>
                  {benefit.subtitle && (
                    <span className="text-text-dim text-[10px] uppercase tracking-widest mt-1">
                      {benefit.subtitle}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Form Section */}
      <section id="apply-form" className="py-32">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white/5 p-12 md:p-16 rounded-[3rem] border border-white/10 relative overflow-hidden backdrop-blur-xl">
            <div className="text-center mb-16">
              <h2 className="text-gold-500 tracking-widest uppercase text-sm font-bold mb-6">Application Form</h2>
              <h3 className="text-5xl font-serif italic text-white tracking-tighter">Join Our Network</h3>
            </div>

            <form 
              className="space-y-8" 
              onSubmit={handleSubmit}
              name="influencer"
            >
              <input type="hidden" name="form_type" value="Influencer" />
              {submitStatus === 'success' && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-8 rounded-2xl text-center mb-12">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-4" />
                  <h4 className="text-xl font-serif italic mb-2">Application Received!</h4>
                  <p className="text-sm opacity-80">Thank you for joining our network. Our team will review your profile and contact you soon.</p>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-2xl text-center mb-12">
                  Something went wrong. Please try again later.
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-gray-400 text-sm ml-1">Full Name</label>
                  <input 
                    name="name"
                    type="text" required placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-gray-400 text-sm ml-1">Email Address</label>
                  <input 
                    name="email"
                    type="email" required placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-gray-400 text-sm ml-1">WhatsApp Number</label>
                  <input 
                    name="phone"
                    type="tel" required placeholder="+91 00000 00000"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-gray-400 text-sm ml-1">City</label>
                  <input 
                    name="city"
                    type="text" required placeholder="Your City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-gray-400 text-sm ml-1">Primary Platform</label>
                  <select 
                    name="platform"
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-gold-500 transition-colors appearance-none"
                  >
                    <option value="Instagram" className="bg-[#0a0a0a]">Instagram</option>
                    <option value="YouTube" className="bg-[#0a0a0a]">YouTube</option>
                    <option value="Twitter" className="bg-[#0a0a0a]">Twitter (X)</option>
                    <option value="LinkedIn" className="bg-[#0a0a0a]">LinkedIn</option>
                    <option value="Other" className="bg-[#0a0a0a]">Other</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-gray-400 text-sm ml-1">Profile Link</label>
                  <input 
                    name="profile"
                    type="url" required placeholder="https://instagram.com/yourprofile"
                    value={formData.profileLink}
                    onChange={(e) => setFormData({ ...formData, profileLink: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-gray-400 text-sm ml-1">Followers Count</label>
                <input 
                  name="followers"
                  type="text" required placeholder="e.g. 10k, 50k, 1M"
                  value={formData.followers}
                  onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>

              <div className="space-y-3">
                <label className="text-gray-400 text-sm ml-1">Message (Optional)</label>
                <textarea 
                  name="message"
                  rows={4} placeholder="Tell us more about your niche and audience..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-500 transition-colors resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold-600 text-white py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-gold-700 transition-all shadow-xl shadow-gold-600/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                {isSubmitting ? 'Sending Application...' : 'Apply Now'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfluencerApplyPage;
