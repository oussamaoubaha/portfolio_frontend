import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import api from "@/services/api";

const TypingIndicator = () => (
    <div className="flex gap-1 px-3 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl rounded-tl-none w-fit">
        {[0, 1, 2].map((i) => (
            <motion.div
                key={i}
                className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                animate={{ y: [0, -5, 0] }}
                transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut"
                }}
            />
        ))}
    </div>
);

const ChatOrb = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([]);
    const [sessionId, setSessionId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    // Handle open-chat event and click outside
    useEffect(() => {
        const handleOpenChat = () => setIsOpen(true);
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        window.addEventListener("open-chat", handleOpenChat);
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            window.removeEventListener("open-chat", handleOpenChat);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleSend = async () => {
        if (!message.trim() || isLoading) return;

        const userMsg = message.trim();
        setMessage("");
        setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
        setIsLoading(true);

        try {
            const historyPayload = messages.map(m => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [{ text: m.content }]
            }));

            const response = await api.post('/chat', {
                message: userMsg,
                history: historyPayload,
                session_id: sessionId
            });

            if (response.data && response.data.reply) {
                setMessages((prev) => [...prev, { role: "ai", content: response.data.reply }]);
                if (response.data.session_id) {
                    setSessionId(response.data.session_id);
                }
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || "Erreur de connexion";
            setMessages((prev) => [...prev, { role: "ai", content: `Désolé, j'ai rencontré un problème : ${errorMsg}` }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Pulsing Orb Button */}
            <motion.div
                className="fixed bottom-8 right-8 z-50"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                <motion.button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(!isOpen);
                    }}
                    className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-[0_8px_30px_rgb(37,99,235,0.4)] focus:outline-none group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
                    <motion.div
                        className="absolute inset-0 rounded-full bg-blue-400/30 -z-10"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                    />
                </motion.button>
            </motion.div>

            {/* Premium Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={containerRef}
                        initial={{ opacity: 0, scale: 0.5, rotate: -5, y: 100, x: 50 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 5, y: 100, x: 50 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed bottom-28 right-8 w-[350px] md:w-[400px] max-h-[min(600px,80vh)] z-40 flex flex-col bg-white/10 dark:bg-black/30 backdrop-blur-3xl border border-white/20 dark:border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(37,99,235,0.2)] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img
                                        src="/Assistant.png"
                                        alt="Logo"
                                        className="w-10 h-10 rounded-full border border-blue-400/50 shadow-[0_0_12px_rgba(59,130,246,0.4)] object-cover"
                                    />
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white/20 rounded-full animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-slate-900 dark:text-white text-sm font-bold tracking-tight">Assistant OUBA-SYS</h3>
                                    <p className="text-[10px] text-emerald-500 font-semibold uppercase tracking-widest">En ligne</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar" ref={scrollRef}>
                            {messages.length === 0 && (
                                <div className="text-center py-10 px-6">
                                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500">
                                        <img src="/Assistant.png" alt="Logo" className="w-10 h-10 rounded-full object-cover opacity-80" />
                                    </div>
                                    <h4 className="text-slate-900 dark:text-white font-semibold mb-2">Salam!</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                        Je suis <span className="text-blue-500 font-bold">OUBA-SYS</span>, le guide intelligent d'Oussama. Je suis ici pour te parler de son parcours de dev, ses projets, et ses racines.
                                    </p>
                                </div>
                            )}
                            <AnimatePresence mode="popLayout">
                                {messages.map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 15, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        {msg.role === "ai" && (
                                            <img
                                                src="/Assistant.png"
                                                className="w-9 h-9 rounded-full border border-blue-400/30 object-contain flex-shrink-0 self-end mb-1"
                                                style={{ filter: "drop-shadow(0 0-6px rgba(37,99,235,0.6))" }}
                                                alt="AI"
                                            />
                                        )}
                                        <div
                                            className={`max-w-[85%] p-4 text-sm shadow-sm ${msg.role === "user"
                                                ? "bg-blue-600 text-white rounded-2xl rounded-tr-none"
                                                : "bg-white/10 dark:bg-white/5 text-slate-900 dark:text-slate-200 border border-white/10 rounded-2xl rounded-tl-none backdrop-blur-md"
                                                }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {isLoading && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
                                    <img
                                        src="/Assistant.png"
                                        className="w-8 h-8 rounded-full border border-blue-400/30 shadow-[0_0_8px_rgba(59,130,246,0.3)] object-cover animate-pulse self-end mb-1"
                                        alt="AI"
                                    />
                                    <TypingIndicator />
                                </motion.div>
                            )}
                        </div>

                        {/* Modern Input Bar */}
                        <div className="p-5 bg-white/5 border-t border-white/10">
                            <div className="relative flex items-center gap-3">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Posez votre question..."
                                    className="flex-1 bg-white/5 dark:bg-black/20 border border-white/10 rounded-2xl px-5 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all placeholder:text-slate-500"
                                />
                                <motion.button
                                    onClick={handleSend}
                                    disabled={isLoading || !message.trim()}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:grayscale transition-all"
                                >
                                    <Send size={18} />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatOrb;
