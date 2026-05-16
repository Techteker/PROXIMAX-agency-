import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Mail, Phone, MapPin, Moon, Sun } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Check initial theme
    const isLight = document.documentElement.classList.contains('light');
    setTheme(isLight ? 'light' : 'dark');
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  const navItems = [
    { name: 'Home', path: '/', type: 'link' },
    { name: 'Pricing', path: '/pricing', type: 'link' },
    { name: 'Services', path: '/#services', type: 'anchor' },
    { name: 'Blog', path: '/blog', type: 'link' },
    { name: 'Case Studies', path: '/case-studies', type: 'link' },
    { name: 'FAQ', path: '/#faq', type: 'anchor' },
    { name: 'About', path: '/#about', type: 'anchor' },
    { name: 'Contact', path: '/#contact', type: 'anchor' },
    { name: 'Careers', path: '/careers', type: 'link' },
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
        "fixed top-0 w-full z-50 transition-all duration-500 px-6 py-4 md:px-12 md:py-8",
        isScrolled ? "bg-black/95 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center transition-all duration-500">
          <Link to="/" className="flex flex-col group cursor-pointer" aria-label="PROXIMAX - Best Digital Marketing Agency">
            <div className="flex items-center">
              <span className="text-2xl md:text-3xl font-display font-black tracking-tighter text-white">PROXIM</span>
              <span className="text-2xl md:text-3xl font-display font-black tracking-tighter text-yellow-400">AX</span>
            </div>
            <span className="text-[9px] md:text-[10px] font-display font-black tracking-[0.2em] text-white/50 -mt-1 uppercase">Best Digital Marketing Agency</span>
          </Link>

          <div className="flex items-center gap-6">
            {/* Toggle Button - Visible on all sizes */}
            <button 
              className="p-2 text-white hover:text-yellow-400 transition-colors group" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="flex flex-col gap-1.5 items-end">
                <div className={cn("h-0.5 bg-current transition-all duration-300", isMenuOpen ? "w-6 rotate-45 translate-y-2" : "w-8")} />
                <div className={cn("h-0.5 bg-current transition-all duration-300", isMenuOpen ? "opacity-0" : "w-6")} />
                <div className={cn("h-0.5 bg-current transition-all duration-300", isMenuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-4")} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Unified Menu Container */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-40">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-bg/60 backdrop-blur-sm"
            />
            
            {/* Menu Card */}
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-24 left-6 right-6 md:left-auto md:right-10 md:w-[450px] card-3d glass-premium rounded-[2.5rem] border border-white/10 p-10 shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold-600/5 to-transparent pointer-events-none" />
              
              <div className="relative z-10 flex flex-col gap-8">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-white/5 pb-4"
                  >
                    {item.type === 'link' ? (
                      <Link 
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        aria-label={`Navigate to ${item.name}`}
                        className={cn(
                          "text-3xl font-serif italic block transition-all duration-300",
                          location.pathname === item.path ? "text-gold-500 translate-x-2" : "text-text-main hover:text-gold-500 hover:translate-x-2"
                        )}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <button 
                        onClick={() => handleNavClick(item)}
                        aria-label={`Scroll to ${item.name} section`}
                        className="text-3xl font-serif italic text-text-main text-left w-full hover:text-gold-500 hover:translate-x-2 transition-all duration-300"
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
                      <p className="text-text-main text-xs">hello@proximax.in</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold-500">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[8px] tracking-luxury text-text-dim uppercase">Call</p>
                      <p className="text-text-main text-xs">+91 93415 79348</p>
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
