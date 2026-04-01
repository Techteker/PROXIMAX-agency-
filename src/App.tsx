import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Menu,
  X,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  MessageSquare
} from 'lucide-react';
import { cn } from './lib/utils';

// Import components
import AgencyPage from './components/AgencyPage';
import InternshipPage from './components/InternshipPage';
import BlogListPage from './components/BlogListPage';
import BlogPostPage from './components/BlogPostPage';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/#services' },
    { name: 'FAQ', path: '/#faq' },
    { name: 'Blog', path: '/blog' },
    { name: 'Internship', path: '/internship' },
    { name: 'Contact', path: '/#contact' }
  ];

  const handleNavClick = (path: string) => {
    setIsMenuOpen(false);
    if (path.startsWith('/#')) {
      const id = path.substring(2);
      if (location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-500 px-6 py-6",
      scrolled ? "bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-white font-display font-bold text-2xl shadow-2xl shadow-gold-500/20 group-hover:scale-110 transition-transform">P</div>
          <span className="text-2xl font-display font-black tracking-tighter text-white">PROXIMAX</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path}
              onClick={() => handleNavClick(item.path)}
              className={cn(
                "text-[10px] font-display font-black uppercase tracking-[0.3em] transition-colors",
                location.pathname === item.path ? "text-gold-500" : "text-slate-500 hover:text-gold-500"
              )}
            >
              {item.name}
            </Link>
          ))}
          <Link 
            to="/#contact"
            onClick={() => handleNavClick('/#contact')}
            className="bg-gold-600 text-white px-8 py-3 rounded-full text-[10px] font-display font-black uppercase tracking-widest hover:bg-gold-700 transition-all shadow-2xl shadow-gold-600/20"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-40 bg-[#050505] pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path}
                  className="text-3xl font-bold text-white"
                  onClick={() => handleNavClick(item.path)}
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                to="/#contact"
                onClick={() => handleNavClick('/#contact')}
                className="w-full bg-gold-600 text-white py-5 rounded-full font-display font-black text-xs uppercase tracking-widest hover:bg-gold-700 transition-all shadow-xl shadow-gold-600/20 text-center"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/#services' },
    { name: 'FAQ', path: '/#faq' },
    { name: 'Blog', path: '/blog' },
    { name: 'Internship', path: '/internship' },
    { name: 'Contact', path: '/#contact' },
    { name: 'Privacy', path: '/privacy' }
  ];

  return (
    <footer className="bg-[#050505] text-slate-600 pt-32 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-gold-600 rounded-full flex items-center justify-center text-white font-display font-bold text-2xl">P</div>
            <span className="text-2xl font-display font-black tracking-tighter text-white">PROXIMAX</span>
          </div>
          <p className="text-sm leading-relaxed mb-10 opacity-60 font-sans font-light">
            Your premier digital growth partner. We combine creativity, technology, and data to deliver results that matter.
          </p>
          <div className="flex gap-6">
            {[
              { Icon: Linkedin, href: "#" },
              { Icon: Twitter, href: "#" },
              { Icon: Instagram, href: "https://www.instagram.com/rajendar_rana_732/" }
            ].map((social, i) => (
              <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-gold-500 transition-colors">
                <social.Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-display font-black text-[10px] uppercase tracking-[0.4em] mb-10">Company</h4>
          <ul className="space-y-6 text-[10px] font-display font-black uppercase tracking-widest">
            {navItems.map(item => (
              <li key={item.name}>
                <Link to={item.path} className="hover:text-gold-500 transition-colors">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-display font-black text-[10px] uppercase tracking-[0.4em] mb-10">Solutions</h4>
          <ul className="space-y-6 text-[10px] font-display font-black uppercase tracking-widest">
            {['SEO & GMB', 'Performance', 'Web Design', 'Social Media', 'Branding'].map(item => (
              <li key={item}><a href="#" className="hover:text-gold-500 transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-display font-black text-[10px] uppercase tracking-[0.4em] mb-10">Connect</h4>
          <ul className="space-y-8 text-sm font-sans font-light">
            <li className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-gold-500">
                <Mail className="w-5 h-5" />
              </div>
              hello@proximax.in
            </li>
            <li className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-gold-500">
                <Phone className="w-5 h-5" />
              </div>
              +91 93415 79348
            </li>
            <li className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-gold-500 mt-1">
                <MapPin className="w-5 h-5" />
              </div>
              Simdega, India<br />(Remote)
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-display font-black uppercase tracking-[0.3em] opacity-30">
        <p>© 2026 PROXIMAX Agency. All rights reserved.</p>
        <p>Designed for Digital Excellence</p>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#050505] text-slate-400 selection:bg-gold-500/30 selection:text-white">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<AgencyPage />} />
          <Route path="/internship" element={<InternshipPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>

        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/919341579348" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group"
        >
          <MessageSquare className="w-8 h-8" />
          <span className="absolute right-full mr-4 px-4 py-2 bg-white text-emerald-600 text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-emerald-100">
            Chat with us on WhatsApp
          </span>
        </a>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
