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
    <footer className="bg-[#050505] text-text-dim pt-32 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-gold-600 rounded-full flex items-center justify-center text-white font-display font-bold text-2xl shadow-2xl shadow-gold-600/20">P</div>
            <span className="text-2xl font-display font-black tracking-tighter text-white">PROXIMAX</span>
          </div>
          <p className="text-sm leading-relaxed mb-10 text-text-muted font-sans font-light">
            PROXIMAX is a results-driven digital marketing agency in India. We build high-performance systems that generate consistent leads, calls, and customers for local businesses.
          </p>
          <div className="flex gap-6">
            {[
              { Icon: Linkedin, href: "#" },
              { Icon: Twitter, href: "#" },
              { Icon: Instagram, href: "https://www.instagram.com/rajendar_rana_732/" }
            ].map((social, i) => (
              <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-gold-500 transition-colors">
                <social.Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white tracking-luxury mb-10">Company</h4>
          <ul className="space-y-6 tracking-luxury">
            {[
              { name: 'Home', type: 'link', path: '/' },
              { name: 'Services', type: 'anchor', id: 'services' },
              { name: 'Blog', type: 'link', path: '/blog' },
              { name: 'Internship', type: 'link', path: '/internship' },
              { name: 'Influencer', type: 'link', path: '/influencer-apply' },
              { name: 'FAQ', type: 'anchor', id: 'faq' },
              { name: 'About', type: 'anchor', id: 'about' },
              { name: 'Contact', type: 'anchor', id: 'contact' }
            ].map(item => (
              <li key={item.name}>
                {item.type === 'link' ? (
                  <Link to={item.path} className="hover:text-gold-500 transition-colors text-left">
                    {item.name}
                  </Link>
                ) : (
                  <button 
                    onClick={() => handleNavClick(item.id!)}
                    className="hover:text-gold-500 transition-colors text-left"
                  >
                    {item.name}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white tracking-luxury mb-10">Solutions</h4>
          <ul className="space-y-6 tracking-luxury">
            {['SEO & GMB Dominance', 'High-ROI Performance Marketing', 'Conversion-Focused Web Design', 'Authority-Building Social Media', 'Strategic Brand Positioning'].map(item => (
              <li key={item}><a href="#" className="hover:text-gold-500 transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white tracking-luxury mb-10">Connect</h4>
          <ul className="space-y-8 text-sm font-sans font-light">
            <li className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full glass-premium flex items-center justify-center text-gold-500">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-text-muted">hello@proximax.in</span>
            </li>
            <li className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full glass-premium flex items-center justify-center text-gold-500">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-text-muted">+91 93415 79348</span>
            </li>
            <li className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full glass-premium flex items-center justify-center text-gold-500 mt-1">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-text-muted">Simdega, India<br />(Remote)</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 tracking-luxury opacity-30">
        <p>© {new Date().getFullYear()} PROXIMAX Agency. All rights reserved.</p>
        <p>Designed for Digital Excellence</p>
      </div>
    </footer>
  );
};
