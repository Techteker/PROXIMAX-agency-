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
    { name: 'Case Studies', path: '/case-studies', type: 'link' },
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
              className="btn-premium text-white px-6 lg:px-8 py-3 text-xs"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-white" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-[#050505]/60 backdrop-blur-sm"
            />
            
            {/* Menu Card */}
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-24 left-6 right-6 glass-premium rounded-[2.5rem] border border-white/10 p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold-600/5 to-transparent pointer-events-none" />
              
              <div className="relative z-10 flex flex-col gap-6">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    {item.type === 'link' ? (
                      <Link 
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          "text-2xl font-serif italic block",
                          location.pathname === item.path ? "text-gold-500" : "text-white"
                        )}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <button 
                        onClick={() => handleNavClick(item)}
                        className="text-2xl font-serif italic text-white text-left w-full"
                      >
                        {item.name}
                      </button>
                    )}
                  </motion.div>
                ))}
                
                <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[8px] tracking-luxury text-text-dim uppercase">Email</p>
                      <p className="text-white text-xs">hello@proximax.in</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold-500">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[8px] tracking-luxury text-text-dim uppercase">Call</p>
                      <p className="text-white text-xs">+91 93415 79348</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (location.pathname !== '/') {
                      navigate('/');
                      setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
                    } else {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="btn-premium w-full text-white py-4 text-[10px] mt-4"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
