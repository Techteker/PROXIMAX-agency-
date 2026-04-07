import React from 'react';
import { motion } from 'motion/react';
import { DollarSign, TrendingUp, Handshake, Target, Rocket, Zap } from 'lucide-react';

const benefits = [
  {
    icon: DollarSign,
    title: 'Paid Brand Deals',
    description: 'Get access to high-paying collaborations with top-tier brands across all niches.',
    color: 'from-green-400 to-emerald-600',
    emoji: '💰'
  },
  {
    icon: TrendingUp,
    title: 'Grow Followers & Reach',
    description: 'Our expert team helps you optimize your content for maximum engagement and growth.',
    color: 'from-blue-400 to-indigo-600',
    emoji: '📈'
  },
  {
    icon: Handshake,
    title: 'Collaborate with Top Brands',
    description: 'Work directly with industry leaders and household names to build your portfolio.',
    color: 'from-purple-400 to-pink-600',
    emoji: '🤝'
  },
  {
    icon: Target,
    title: 'Niche-Based Campaigns',
    description: 'Receive campaign invites tailored specifically to your audience and content style.',
    color: 'from-orange-400 to-red-600',
    emoji: '🎯'
  },
  {
    icon: Rocket,
    title: 'Personal Brand Growth',
    description: 'Beyond just deals, we help you build a sustainable long-term career as a creator.',
    color: 'from-cyan-400 to-blue-600',
    emoji: '🚀'
  },
  {
    icon: Zap,
    title: 'Early Access Campaigns',
    description: 'Be the first to promote new products and services before they hit the mainstream.',
    color: 'from-yellow-400 to-orange-600',
    emoji: '🔥'
  }
];

export const Benefits: React.FC = () => {
  return (
    <section id="benefits" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            Why Join <span className="text-gradient">PROXIMAX</span>?
          </motion.h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            We don't just manage influencers; we build creators into brands. 
            Here's what you get when you join our elite network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-10 rounded-[2.5rem] relative group overflow-hidden"
            >
              {/* Hover Background Glow */}
              <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  {benefit.title}
                  <span className="text-xl">{benefit.emoji}</span>
                </h3>
                <p className="text-white/50 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
