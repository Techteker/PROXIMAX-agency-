import React from 'react';
import { motion } from 'motion/react';
import { Shirt, Dumbbell, Utensils, Laptop, GraduationCap, Landmark, MapPin } from 'lucide-react';

const categories = [
  { name: 'Fashion', icon: Shirt, color: 'text-pink-400' },
  { name: 'Fitness', icon: Dumbbell, color: 'text-orange-400' },
  { name: 'Food', icon: Utensils, color: 'text-yellow-400' },
  { name: 'Tech', icon: Laptop, color: 'text-blue-400' },
  { name: 'Education', icon: GraduationCap, color: 'text-emerald-400' },
  { name: 'Finance', icon: Landmark, color: 'text-purple-400' },
  { name: 'Local Business', icon: MapPin, color: 'text-red-400' },
];

export const Categories: React.FC = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            Influencer <span className="text-gradient">Categories</span>
          </motion.h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            We work with creators from all walks of life. Find your niche and start your journey.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="glass-card px-8 py-10 rounded-[2rem] flex flex-col items-center gap-6 group cursor-default"
            >
              <div className={`w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                <cat.icon size={40} />
              </div>
              <span className="text-xl font-bold tracking-tight">{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
