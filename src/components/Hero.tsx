import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, TrendingUp, Users } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Dynamic Colorful Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="dynamic-blob top-[10%] left-[10%] w-96 h-96 bg-gold-500/30 rounded-full mix-blend-screen" />
        <div className="dynamic-blob bottom-[20%] right-[10%] w-[500px] h-[500px] bg-gold-700/20 rounded-full mix-blend-screen" style={{ animationDelay: '-2s' }} />
        <div className="dynamic-blob top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-900/10 rounded-full" />
        
        {/* Light Mode Specific Accents */}
        <div className="hidden dark:hidden root-light:block">
          <div className="absolute top-[15%] right-[15%] w-72 h-72 bg-indigo-500/20 rounded-full blur-[100px] animate-drift" style={{ animationDelay: '-1s' }} />
          <div className="absolute bottom-[25%] left-[15%] w-80 h-80 bg-pink-500/20 rounded-full blur-[100px] animate-drift" style={{ animationDelay: '-3s' }} />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
          >
            <Sparkles className="text-gold-500 w-4 h-4" />
            <span className="text-sm font-medium tracking-wide text-text-main/80 uppercase">Premium Influencer Network</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-8xl font-display font-bold leading-tight mb-8 tracking-tighter text-text-main"
          >
            Join <span className="text-gradient">PROXIMAX</span> <br />
            Influencer Network 💎
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-2xl text-text-muted mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Work with top brands and earn money by promoting products. 
            Scale your reach and monetize your influence with India's most premium agency.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a
              href="#apply-form"
              className="group relative px-10 py-5 bg-neon-gradient rounded-2xl font-bold text-lg neon-glow hover:scale-105 transition-all duration-300 flex items-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              Apply Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <div className="flex items-center gap-4 text-text-muted">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://picsum.photos/seed/influencer${i}/100/100`}
                    alt="Influencer"
                    className="w-10 h-10 rounded-full border-2 border-dark-bg"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <span className="text-sm font-medium">500+ Creators Joined</span>
            </div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
                  {[
            { icon: TrendingUp, label: 'Growth Potential', value: '10x Faster', color: 'text-gold-500' },
            { icon: Users, label: 'Active Brands', value: '200+', color: 'text-gold-400' },
            { icon: Sparkles, label: 'Campaigns', value: '1.2k+', color: 'text-gold-600' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="card-3d glow-border glass-card p-8 rounded-3xl flex items-center gap-6 group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={28} />
              </div>
              <div>
                <p className="text-sm text-text-dim font-medium uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1 text-text-main">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
