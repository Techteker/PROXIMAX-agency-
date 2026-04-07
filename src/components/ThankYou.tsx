import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const ThankYou: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl glass-premium p-16 md:p-24 rounded-[4rem] border border-white/10 relative"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-24 h-24 bg-gold-600/20 rounded-full flex items-center justify-center text-gold-500 mx-auto mb-12 shadow-2xl shadow-gold-600/20"
        >
          <Check className="w-12 h-12" />
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-serif italic text-white mb-8 tracking-tighter">Thank You!</h1>
        <p className="text-xl text-text-muted mb-16 font-sans font-light leading-relaxed">
          Your inquiry has been received. Our elite strategy team will review your project and contact you within 24 hours to discuss your digital growth.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link 
            to="/"
            className="bg-gold-600 text-white px-12 py-5 rounded-full font-display font-black text-xs uppercase tracking-luxury hover:bg-gold-700 transition-all shadow-2xl shadow-gold-600/20 flex items-center justify-center gap-3 group"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link 
            to="/blog"
            className="bg-white/5 text-white border border-white/10 px-12 py-5 rounded-full font-display font-black text-xs uppercase tracking-luxury hover:bg-white/10 transition-all flex items-center justify-center gap-3 group"
          >
            Explore Insights <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYou;
