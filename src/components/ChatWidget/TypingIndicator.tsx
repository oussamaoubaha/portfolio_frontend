import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex w-full justify-start mb-4">
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-[10px] font-bold text-white/50 border border-white/10">
          ...
        </div>
        <div className="flex gap-1.5 px-4 py-3 rounded-2xl rounded-bl-none bg-white/5 border border-white/10">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
              className="h-1.5 w-1.5 rounded-full bg-primary/60"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
