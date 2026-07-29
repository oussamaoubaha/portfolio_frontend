import React from 'react';
import { motion } from 'framer-motion';

interface QuickChipsProps {
  onChipClick: (text: string) => void;
}

const QuickChips: React.FC<QuickChipsProps> = ({ onChipClick }) => {
  const chips = [
    "Ses compétences 💻",
    "Ses projets 🚀",
    "Disponible pour stage? 📋",
    "Le contacter 📬"
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
      {chips.map((chip, i) => (
        <motion.button
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + i * 0.1 }}
          onClick={() => onChipClick(chip)}
          className="whitespace-nowrap rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary transition-all hover:bg-primary/20 active:scale-95"
        >
          {chip}
        </motion.button>
      ))}
    </div>
  );
};

export default QuickChips;
