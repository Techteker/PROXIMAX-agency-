import React from 'react';
import { Diamond, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-card border-t border-white/10 pt-24 pb-12 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gold-500/5 blur-[120px] -z-10 rounded-full" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand */}
          <div className="space-y-8">
            <a href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-neon-gradient rounded-xl flex items-center justify-center neon-glow group-hover:scale-110 transition-transform duration-300">
                <Diamond className="text-white w-6 h-6 fill-white/20" />
              </div>
              <span className="text-2xl font-display font-bold tracking-tighter">
                PROXI<span className="text-gold-500">MAX</span>
              </span>
            </a>
            <p className="text-white/50 leading-relaxed max-w-xs">
              India's leading influencer marketing agency connecting premium creators with top-tier brands.
            </p>
            <div className="flex items-center gap-4">
              {[Instagram, Twitter, Linkedin].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-gold-500 hover:bg-white/10 transition-all duration-300"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {['Benefits', 'Who Can Apply', 'Requirements', 'Apply Now'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/ /g, '-')}`} className="text-white/40 hover:text-gold-500 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-8">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gold-500 group-hover:scale-110 transition-transform">
                  <Mail size={18} />
                </div>
                <span className="text-white/60">hello@proximax.agency</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gold-400 group-hover:scale-110 transition-transform">
                  <Phone size={18} />
                </div>
                <span className="text-white/60">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gold-600 group-hover:scale-110 transition-transform">
                  <MapPin size={18} />
                </div>
                <span className="text-white/60">Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>

          {/* SEO Keywords */}
          <div>
            <h4 className="text-lg font-bold mb-8">Popular Searches</h4>
            <div className="flex flex-wrap gap-2">
              {[
                'influencer signup India',
                'become influencer earn money',
                'brand collaboration platform',
                'influencer marketing India',
                'premium creator network',
                'monetize influence',
                'micro influencer deals'
              ].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white/30 hover:text-white/60 transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:row items-center justify-between gap-8">
          <p className="text-sm text-white/20">
            © {new Date().getFullYear()} PROXIMAX Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-xs text-white/20">
            <a href="#" className="hover:text-white/40 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/40 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white/40 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
