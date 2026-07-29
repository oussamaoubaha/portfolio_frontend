import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import QuickChips from './QuickChips';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const { messages, isTyping, handleSend } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const onSend = async (text: string) => {
    const message = text || inputText;
    if (!message.trim()) return;
    
    setInputText('');
    await handleSend(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend(inputText);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 flex h-[600px] w-[400px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-2xl border border-primary/25 bg-[#0D1B2A]/95 shadow-2xl backdrop-blur-xl md:bottom-24 md:right-0"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-[#0f1f35] to-[#152a45] px-4 py-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary p-[2px]">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0D1B2A] overflow-hidden">
                    <img src="/Assistant.webp" alt="Assistant" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  </div>
                  <div className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-[#0D1B2A] bg-green-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Assistant OUBA-SYS</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-medium text-green-500 uppercase tracking-wider">En Ligne</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Fermer la fenêtre de chat"
                className="text-white/50 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 no-scrollbar space-y-4 bg-[#0D1B2A]/30"
            >
              {/* Welcome Message */}
              <div className="flex w-full justify-start mb-2">
                <div className="flex items-start gap-3 max-w-[90%]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary p-[1.5px] shadow-lg overflow-hidden">
                    <div className="h-full w-full overflow-hidden rounded-full bg-primary/10">
                      <img src="/Assistant.webp" alt="Assistant" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-2xl rounded-tl-none bg-white/10 border border-white/10 p-5 text-sm leading-relaxed text-slate-100 shadow-xl backdrop-blur-sm">
                      <span className="text-lg">Salam! 👋</span> <br /><br />
                      Je suis <strong className="text-primary">OUBA-SYS</strong>, le guide intelligent d'Oussama. <br /><br />
                      Je suis ici pour te parler de son parcours de dev, ses projets, et ses compétences. Pose-moi n'importe quelle question !
                    </div>
                    <QuickChips onChipClick={onSend} />
                  </div>
                </div>
              </div>

              {messages.map((msg, i) => (
                <MessageBubble key={i} role={msg.role} text={msg.text} />
              ))}
              
              {isTyping && <TypingIndicator />}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/[0.05] border-t border-primary/20">
              <div className="relative flex items-center gap-2">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  aria-label="Votre message"
                  placeholder="Posez votre question..."
                  rows={1}
                  className="w-full resize-none rounded-xl border border-white/20 bg-white/5 py-4 pl-5 pr-14 text-sm text-white placeholder:text-slate-400 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 no-scrollbar transition-all shadow-inner"
                />
                <button
                  onClick={() => onSend(inputText)}
                  disabled={!inputText.trim() || isTyping}
                  aria-label="Envoyer le message"
                  className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-secondary text-white shadow-lg transition-all hover:scale-110 active:scale-90 disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat avec l'assistant"}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-xl shadow-primary/20 ring-4 ring-primary/10 transition-all"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageSquare size={24} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Badge */}
        <div className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-[#050A14] bg-green-500 shadow-sm" />
        
        {/* Pulse Ring */}
        <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/20 opacity-75" />
      </motion.button>
    </div>
  );
};

export default ChatWidget;
