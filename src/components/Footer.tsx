import React from 'react';
import { Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-bg text-text-dim pt-20 md:pt-32 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-20 md:mb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 lg:gap-20">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gold-600 rounded-full flex items-center justify-center text-white font-display font-bold text-2xl shadow-2xl shadow-gold-600/20 shrink-0">P</div>
              <span className="text-2xl font-display font-black tracking-tighter text-text-main">PROXIMAX</span>
            </div>
            <p className="text-sm leading-relaxed text-text-muted font-sans font-light max-w-sm">
              PROXIMAX is a results-driven digital marketing agency in India. We build high-performance systems that generate consistent leads, calls, and customers for local businesses.
            </p>
            <div className="flex gap-6">
              {[
                { Icon: Linkedin, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Instagram, href: "https://www.instagram.com/rajendar_rana_732/" }
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-gold-500 transition-all hover:scale-110">
                  <social.Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-text-main tracking-luxury mb-8 md:mb-10 text-sm font-bold uppercase">Company</h4>
            <ul className="space-y-4 md:space-y-6 tracking-luxury">
              {[
                { name: 'Home', type: 'link', path: '/' },
                { name: 'Services', type: 'anchor', id: 'services' },
                { name: 'Blog', type: 'link', path: '/blog' },
                { name: 'Case Studies', type: 'link', path: '/case-studies' },
                { name: 'Careers', type: 'link', path: '/careers' },
                { name: 'FAQ', type: 'anchor', id: 'faq' },
                { name: 'About', type: 'anchor', id: 'about' },
                { name: 'Contact', type: 'anchor', id: 'contact' }
              ].map(item => (
                <li key={item.name}>
                  {item.type === 'link' ? (
                    <Link to={item.path} className="hover:text-gold-500 transition-colors text-left text-sm">
                      {item.name}
                    </Link>
                  ) : (
                    <button 
                      onClick={() => handleNavClick(item.id!)}
                      className="hover:text-gold-500 transition-colors text-left text-sm"
                    >
                      {item.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-text-main tracking-luxury mb-8 md:mb-10 text-sm font-bold uppercase">Solutions</h4>
            <ul className="space-y-4 md:space-y-6 tracking-luxury">
              {['SEO & GMB Dominance', 'High-ROI Performance Marketing', 'Conversion-Focused Web Design', 'Authority-Building Social Media', 'Strategic Brand Positioning'].map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-gold-500 transition-colors text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-text-main tracking-luxury mb-8 md:mb-10 text-sm font-bold uppercase">Connect</h4>
            <ul className="space-y-6 md:space-y-8 text-sm font-sans font-light">
              <li className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-full glass-premium flex items-center justify-center text-gold-500 shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-text-muted break-all">hello@proximax.in</span>
              </li>
              <li className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-full glass-premium flex items-center justify-center text-gold-500 shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-text-muted">+91 93415 79348</span>
              </li>
              <li className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-full glass-premium flex items-center justify-center text-gold-500 mt-1 shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-text-muted leading-relaxed">Simdega, India<br />(Remote)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-[10px] tracking-widest uppercase font-bold">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 opacity-50">
          <p className="text-center md:text-left">© {new Date().getFullYear()} PROXIMAX Agency. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4">
            <Link to="/privacy-policy" className="hover:text-gold-500 transition-colors">Privacy Policy</Link>
            <Link to="/terms-conditions" className="hover:text-gold-500 transition-colors">Terms & Conditions</Link>
            <Link to="/refund-policy" className="hover:text-gold-500 transition-colors">Refund Policy</Link>
            <Link to="/shipping-policy" className="hover:text-gold-500 transition-colors">Shipping Policy</Link>
            <Link to="/compliance" className="hover:text-gold-500 transition-colors">Compliance</Link>
          </div>
        </div>
        <p className="opacity-50 text-center tracking-[0.2em]">Designed for Digital Excellence</p>
      </div>
    </footer>
  );
};
