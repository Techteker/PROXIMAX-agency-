import React from 'react';
import { Instagram, Twitter, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-black text-white pt-32 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24">
          <div className="space-y-10 lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-sans font-black tracking-tighter">
                PROXIMAX<span className="text-yellow-400">.</span>
              </span>
            </div>
            <p className="text-lg font-sans font-black leading-tight max-w-xs uppercase">
              Building the future of <br />
              digital success<span className="text-yellow-400">.</span>
            </p>
            <div className="space-y-4">
              <p className="text-white/40 text-sm font-medium leading-relaxed max-w-xs">
                Specializing in Local SEO, Lead Generation, and Google Ads for businesses in Ranchi, Jharkhand, and throughout India.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-10">Quick Links</h4>
            <ul className="space-y-6">
              {[
                { name: 'Ranchi SEO Services', id: 'services' },
                { name: 'Client Testimonials', id: 'reviews' },
                { name: 'About PROXIMAX', id: 'about' },
                { name: 'Contact Agency', id: 'contact' }
              ].map(item => (
                <li key={item.name}>
                  <button 
                    onClick={() => handleNavClick(item.id)}
                    aria-label={`Go to ${item.name} section`}
                    className="text-white/60 hover:text-yellow-400 transition-colors text-sm font-medium uppercase tracking-wider text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
              <li><Link to="/blog" className="text-white/60 hover:text-yellow-400 transition-colors text-sm font-medium uppercase tracking-wider">Growth Insights Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-10">Connect</h4>
            <ul className="space-y-6">
              <li className="flex flex-col gap-1">
                <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Email Our Team</span>
                <a href="mailto:hello@proximax.in" className="text-white hover:text-yellow-400 transition-colors">hello@proximax.in</a>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Call Ranchi HQ</span>
                <a href="tel:+919341579348" className="text-white hover:text-yellow-400 transition-colors">+91 93415 79348</a>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Our Presence</span>
                <span className="text-white">Ranchi & Simdega, Jharkhand, India</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-10">Follow Our Growth</h4>
            <div className="space-y-10">
              <div className="flex gap-4">
                {[
                  { Icon: Instagram, href: "https://www.instagram.com/rajendar_rana_732/", label: "Follow PROXIMAX on Instagram" },
                  { Icon: Linkedin, href: "#", label: "Connect with PROXIMAX on LinkedIn" },
                  { Icon: Twitter, href: "#", label: "Follow PROXIMAX on Twitter" }
                ].map((social) => (
                  <a 
                    key={social.label} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={social.label}
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300"
                  >
                    <social.Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Subscribe</p>
                <div className="flex gap-2">
                  <input type="email" placeholder="Email" className="bg-transparent border-b border-white/20 py-2 text-sm focus:outline-none focus:border-yellow-400 w-full" />
                  <button className="text-yellow-400" aria-label="Subscribe to newsletter">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
        <p>© {new Date().getFullYear()} PROXIMAX. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms-conditions" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link to="/compliance" className="hover:text-white transition-colors">Compliance</Link>
          <Link to="/admin/login" className="opacity-0 cursor-default">Admin</Link>
        </div>
      </div>
    </footer>
  );
};
