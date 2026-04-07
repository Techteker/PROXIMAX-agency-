import React from 'react';
import { motion } from 'motion/react';

export const FloatingBubbles: React.FC = () => {
  const bubbles = Array.from({ length: 20 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((_, i) => {
        const size = Math.random() * 100 + 50;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;
        const left = Math.random() * 100;

        return (
          <motion.div
            key={i}
            initial={{ y: '110vh', opacity: 0, x: `${left}vw` }}
            animate={{
              y: '-20vh',
              opacity: [0, 0.3, 0.3, 0],
              x: [`${left}vw`, `${left + (Math.random() * 10 - 5)}vw`],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: 'linear',
            }}
            className="absolute rounded-full bg-gold-500/10 blur-xl"
            style={{
              width: size,
              height: size,
            }}
          />
        );
      })}
    </div>
  );
};
