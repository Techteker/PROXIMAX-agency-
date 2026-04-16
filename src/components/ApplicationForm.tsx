import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';
import { Send, Instagram, Youtube, Facebook, Music2, Ghost, Upload, CheckCircle2, AlertCircle } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  cityCountry: string;
  niche: string;
  instagramLink: string;
  youtubeLink: string;
  facebookLink: string;
  tiktokLink: string;
  snapchatUsername: string;
  totalFollowers: string;
  averageViews: string;
  engagementRate: string;
  pastCollaborations: string;
  whyJoin: string;
  confirmCorrect: boolean;
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  cityCountry: '',
  niche: '',
  instagramLink: '',
  youtubeLink: '',
  facebookLink: '',
  tiktokLink: '',
  snapchatUsername: '',
  totalFollowers: '',
  averageViews: '',
  engagementRate: '',
  pastCollaborations: '',
  whyJoin: '',
  confirmCorrect: false,
};

export const ApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const niches = [
    'Fashion', 'Fitness', 'Food', 'Tech', 'Education', 'Finance', 'Local Business', 'Lifestyle', 'Gaming', 'Travel'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.confirmCorrect) {
      setError('Please confirm that all information is correct.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Submit to EmailJS
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      if (serviceId && templateId) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.fullName,
            from_email: formData.email,
            phone: formData.phone,
            city: formData.cityCountry,
            niche: formData.niche,
            instagram: formData.instagramLink,
            youtube: formData.youtubeLink,
            facebook: formData.facebookLink,
            tiktok: formData.tiktokLink,
            snapchat: formData.snapchatUsername,
            followers: formData.totalFollowers,
            views: formData.averageViews,
            engagement: formData.engagementRate,
            past_collabs: formData.pastCollaborations,
            why_join: formData.whyJoin
          }
        );
      } else {
        console.warn("EmailJS keys missing");
      }

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error("EmailJS Error:", err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="apply-form" className="py-32 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto glass-card p-12 rounded-[3rem] text-center border-gold-500/30"
        >
          <div className="w-24 h-24 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-8 neon-glow">
            <CheckCircle2 className="text-gold-500 w-12 h-12" />
          </div>
          <h2 className="text-4xl font-display font-bold mb-6">🎉 Application Received!</h2>
          <p className="text-xl text-white/60 mb-10 leading-relaxed">
            Congratulations! Your application has been received. Our team will review and contact you within 24-48 hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-colors"
          >
            Back to Home
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="apply-form" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-bold mb-6"
            >
              Start Your <span className="text-gradient">Journey</span>
            </motion.h2>
            <p className="text-xl text-white/50">Fill out the form below and join the PROXIMAX elite network.</p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass-card p-8 md:p-16 rounded-[3rem] space-y-12 border-white/5"
          >
            {/* Personal Info */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
                  <span className="text-gold-500">01</span>
                </div>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/40 uppercase tracking-wider">Full Name</label>
                  <input
                    required
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/40 uppercase tracking-wider">Email Address</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/40 uppercase tracking-wider">Phone Number</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/40 uppercase tracking-wider">City / Country</label>
                  <input
                    required
                    type="text"
                    name="cityCountry"
                    value={formData.cityCountry}
                    onChange={handleInputChange}
                    placeholder="Mumbai, India"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-white/40 uppercase tracking-wider">Niche</label>
                  <select
                    required
                    name="niche"
                    value={formData.niche}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all appearance-none"
                  >
                    <option value="" disabled className="bg-dark-card">Select your niche</option>
                    {niches.map(n => (
                      <option key={n} value={n} className="bg-dark-card">{n}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-400/10 flex items-center justify-center">
                  <span className="text-gold-400">02</span>
                </div>
                Social Media Links
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/40 mb-2">
                    <Instagram size={16} />
                    <label className="text-sm font-medium uppercase tracking-wider">Instagram Profile Link</label>
                  </div>
                  <input
                    type="url"
                    name="instagramLink"
                    value={formData.instagramLink}
                    onChange={handleInputChange}
                    placeholder="https://instagram.com/username"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/40 mb-2">
                    <Youtube size={16} />
                    <label className="text-sm font-medium uppercase tracking-wider">YouTube Channel Link</label>
                  </div>
                  <input
                    type="url"
                    name="youtubeLink"
                    value={formData.youtubeLink}
                    onChange={handleInputChange}
                    placeholder="https://youtube.com/@channel"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/40 mb-2">
                    <Facebook size={16} />
                    <label className="text-sm font-medium uppercase tracking-wider">Facebook Page Link</label>
                  </div>
                  <input
                    type="url"
                    name="facebookLink"
                    value={formData.facebookLink}
                    onChange={handleInputChange}
                    placeholder="https://facebook.com/page"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/40 mb-2">
                    <Music2 size={16} />
                    <label className="text-sm font-medium uppercase tracking-wider">TikTok Profile Link</label>
                  </div>
                  <input
                    type="url"
                    name="tiktokLink"
                    value={formData.tiktokLink}
                    onChange={handleInputChange}
                    placeholder="https://tiktok.com/@username"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center gap-2 text-white/40 mb-2">
                    <Ghost size={16} />
                    <label className="text-sm font-medium uppercase tracking-wider">Snapchat Username</label>
                  </div>
                  <input
                    type="text"
                    name="snapchatUsername"
                    value={formData.snapchatUsername}
                    onChange={handleInputChange}
                    placeholder="@username"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Performance Data */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-600/10 flex items-center justify-center">
                  <span className="text-gold-600">03</span>
                </div>
                Performance Data
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/40 uppercase tracking-wider">Total Followers</label>
                  <input
                    required
                    type="text"
                    name="totalFollowers"
                    value={formData.totalFollowers}
                    onChange={handleInputChange}
                    placeholder="e.g. 50k"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-gold-600 focus:ring-1 focus:ring-gold-600 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/40 uppercase tracking-wider">Average Views</label>
                  <input
                    required
                    type="text"
                    name="averageViews"
                    value={formData.averageViews}
                    onChange={handleInputChange}
                    placeholder="e.g. 10k"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-gold-600 focus:ring-1 focus:ring-gold-600 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/40 uppercase tracking-wider">Engagement Rate</label>
                  <input
                    type="text"
                    name="engagementRate"
                    value={formData.engagementRate}
                    onChange={handleInputChange}
                    placeholder="e.g. 5%"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-gold-600 focus:ring-1 focus:ring-gold-600 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Extra Info */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <span className="text-white">04</span>
                </div>
                Additional Details
              </h3>
              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="text-sm font-medium text-white/40 uppercase tracking-wider">Upload Insights Screenshot (Optional)</label>
                  <div className="border-2 border-dashed border-white/10 rounded-[2rem] p-12 text-center hover:border-gold-500/50 transition-colors cursor-pointer group">
                    <Upload className="mx-auto text-white/20 mb-4 group-hover:text-gold-500 transition-colors" size={40} />
                    <p className="text-white/40">Click or drag to upload your latest insights</p>
                    <p className="text-xs text-white/20 mt-2">PNG, JPG up to 5MB</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/40 uppercase tracking-wider">Past Brand Collaborations</label>
                  <textarea
                    name="pastCollaborations"
                    value={formData.pastCollaborations}
                    onChange={handleInputChange}
                    placeholder="List some brands you've worked with..."
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-6 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/40 uppercase tracking-wider">Why do you want to join PROXIMAX?</label>
                  <textarea
                    required
                    name="whyJoin"
                    value={formData.whyJoin}
                    onChange={handleInputChange}
                    placeholder="Tell us about your goals as a creator..."
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-6 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-2xl flex items-center gap-4"
                >
                  <AlertCircle size={24} />
                  <p className="font-medium">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <div className="space-y-8 pt-8">
              <label className="flex items-center gap-4 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="confirmCorrect"
                    checked={formData.confirmCorrect}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`w-6 h-6 rounded-md border-2 transition-all ${formData.confirmCorrect ? 'bg-gold-500 border-gold-500' : 'border-white/20 group-hover:border-white/40'}`}>
                    {formData.confirmCorrect && <CheckCircle2 className="text-dark-bg w-full h-full p-0.5" />}
                  </div>
                </div>
                <span className="text-white/60 group-hover:text-white transition-colors">I confirm all information provided is correct and authentic.</span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group relative py-6 bg-neon-gradient rounded-[2rem] font-bold text-2xl neon-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              >
                {isSubmitting ? (
                  <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Join Now 🚀
                    <Send className="w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
