import React from 'react';
import { motion } from 'framer-motion';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  text: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ role, text }) => {
  const isBot = role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div className={`flex max-w-[85%] items-end gap-3 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        {isBot && (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-[10px] font-bold text-white shadow-lg overflow-hidden ring-2 ring-primary/20">
            <img src="/Assistant.webp" alt="OS" loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </div>
        )}
        <div
          className={`px-5 py-3 text-sm leading-relaxed shadow-xl transition-all hover:scale-[1.01] ${
            isBot
              ? 'rounded-2xl rounded-bl-none bg-white/10 border border-white/10 text-slate-100'
              : 'rounded-2xl rounded-br-none bg-gradient-to-r from-primary to-secondary text-white font-medium'
          }`}
        >
          {text}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
