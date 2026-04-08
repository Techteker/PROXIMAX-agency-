import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Mail, Phone, MapPin } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', type: 'link' },
    { name: 'Services', path: '/#services', type: 'anchor' },
    { name: 'Blog', path: '/blog', type: 'link' },
    { name: 'FAQ', path: '/#faq', type: 'anchor' },
    { name: 'About', path: '/#about', type: 'anchor' },
    { name: 'Contact', path: '/#contact', type: 'anchor' },
    { name: 'Internship', path: '/internship', type: 'link' },
    { name: 'Influencer', path: '/influencer-apply', type: 'link' },
  ];

  const handleNavClick = (item: any) => {
    setIsMenuOpen(false);
    if (item.type === 'anchor') {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const id = item.path.split('#')[1];
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const id = item.path.split('#')[1];
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 px-6 py-6",
        isScrolled ? "bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center glass-premium px-8 py-4 rounded-full border border-white/10 backdrop-blur-xl">
          <Link to="/" className="flex items-center gap-3 group cursor-pointer" aria-label="PROXIMAX - Best Digital Marketing Agency">
            <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-white font-display font-bold text-2xl shadow-2xl shadow-gold-500/20 group-hover:scale-110 transition-transform" aria-hidden="true">P</div>
            <span className="text-2xl font-display font-black tracking-tighter text-white">PROXIMAX</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => (
              item.type === 'link' ? (
                <Link 
                  key={item.name} 
                  to={item.path}
                  className={cn(
                    "tracking-luxury transition-colors text-xs lg:text-sm",
                    location.pathname === item.path ? "text-gold-500" : "text-text-dim hover:text-gold-500"
                  )}
                >
                  {item.name}
                </Link>
              ) : (
                <button 
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="tracking-luxury transition-colors text-xs lg:text-sm text-text-dim hover:text-gold-500"
                >
                  {item.name}
                </button>
              )
            ))}
            <button 
              onClick={() => {
                if (location.pathname !== '/') {
                  navigate('/');
                  setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
                } else {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-gold-600 text-white px-6 lg:px-8 py-3 rounded-full tracking-luxury hover:bg-gold-700 transition-all shadow-2xl shadow-gold-600/20 text-xs"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-40 bg-[#050505] pt-32 px-10 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-8">
              {navItems.map((item) => (
                item.type === 'link' ? (
                  <Link 
                    key={item.name} 
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "text-4xl font-serif italic",
                      location.pathname === item.path ? "text-gold-500" : "text-white"
                    )}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button 
                    key={item.name}
                    onClick={() => handleNavClick(item)}
                    className="text-4xl font-serif italic text-white text-left"
                  >
                    {item.name}
                  </button>
                )
              ))}
              
              <div className="mt-12 pt-12 border-t border-white/10 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gold-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-luxury text-text-dim uppercase">Email Us</p>
                    <p className="text-white">hello@proximax.in</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gold-500">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-luxury text-text-dim uppercase">Call Us</p>
                    <p className="text-white">+91 93415 79348</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
