import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Youtube, Facebook, Music2, Ghost, Users2, CheckCircle2 } from 'lucide-react';

const platforms = [
  { name: 'Instagram Influencers', icon: Instagram, color: 'from-pink-500 to-purple-500' },
  { name: 'YouTubers', icon: Youtube, color: 'from-red-500 to-red-700' },
  { name: 'Facebook Creators', icon: Facebook, color: 'from-blue-600 to-blue-800' },
  { name: 'TikTok Creators', icon: Music2, color: 'from-gray-800 to-black' },
  { name: 'Snapchat Creators', icon: Ghost, color: 'from-yellow-400 to-yellow-600' },
  { name: 'Micro Influencers', icon: Users2, color: 'from-cyan-400 to-blue-500', extra: '1k+ Followers' },
];

const requirements = [
  'Active social media account',
  'Real followers (no fake engagement)',
  'Consistent content posting',
  'Good engagement rate',
];

export const WhoCanApply: React.FC = () => {
  return (
    <section id="who-can-apply" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
              Who Can <span className="text-gradient">Apply</span>?
            </h2>
            <p className="text-xl text-white/50 mb-12 leading-relaxed">
              We're looking for passionate creators across all platforms. Whether you're a micro-influencer 
              just starting out or a seasoned creator with millions of followers, there's a place for you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {platforms.map((platform, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card p-6 rounded-3xl flex items-center gap-4 group hover:bg-white/10 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <platform.icon className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">{platform.name}</h3>
                    {platform.extra && <p className="text-xs text-gold-500 font-medium uppercase tracking-wider">{platform.extra}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 rounded-[3rem] border-gold-500/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 blur-3xl -z-10" />
            
            <h3 className="text-3xl font-display font-bold mb-10 flex items-center gap-4">
              <CheckCircle2 className="text-gold-500 w-8 h-8" />
              Requirements
            </h3>
            
            <div className="space-y-8">
              {requirements.map((req, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex items-start gap-6 group"
                >
                  <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center shrink-0 group-hover:bg-gold-500/20 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-gold-500 neon-glow" />
                  </div>
                  <p className="text-xl text-white/80 font-medium group-hover:text-white transition-colors">{req}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-sm text-white/40 leading-relaxed italic">
                * We use advanced AI tools to verify engagement and follower authenticity. 
                Accounts with fake followers will be automatically rejected.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
