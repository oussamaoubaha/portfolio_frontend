import { motion } from "framer-motion";
import { Database, Brain, Zap } from "lucide-react";

const AIAssistantSection = () => {
    return (
        <section id="ai-architecture" className="py-24 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[100px] rounded-full -z-10" />

            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-slate-900 dark:text-white text-3xl font-bold mb-4">
                            AI Architecture
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Le fonctionnement technique de mon Assistant AI (Gemini) et comment il interagit avec mon portfolio.
                        </p>
                    </motion.div>

                    {/* Grid of 3 columns */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform">
                                <Database size={24} />
                            </div>
                            <h3 className="text-slate-900 dark:text-white text-xl font-semibold mb-3">
                                Base de Connaissances
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                Extraction des données JSON (RAG) pour éviter les hallucinations et garantir des réponses basées sur mon parcours réel.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform">
                                <Brain size={24} />
                            </div>
                            <h3 className="text-slate-900 dark:text-white text-xl font-semibold mb-3">
                                Instructions Système
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                Filtrage intelligent des questions hors-sujet grâce à des prompts système avancés gérant la personnalité et l'expertise.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-slate-900 dark:text-white text-xl font-semibold mb-3">
                                Flux de Données
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                Communication fluide entre React et l'API Gemini, optimisée pour une latence minimale et une expérience utilisateur réactive.
                            </p>
                        </motion.div>
                    </div>

                    {/* Chat Simulation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-8 max-w-2xl mx-auto shadow-2xl"
                    >
                        <div className="flex flex-col gap-6">
                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                                    U
                                </div>
                                <div className="bg-white/10 rounded-2xl rounded-tl-none p-4 text-sm text-slate-200 border border-white/10 max-w-[80%]">
                                    <p>Connais-tu le langage Java ?</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start flex-row-reverse">
                                <div className="w-10 h-10 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-blue-500/20">
                                    AI
                                </div>
                                <div className="bg-blue-600/20 border border-blue-500/30 rounded-2xl rounded-tr-none p-4 text-sm text-blue-50 max-w-[80%]">
                                    <p>Oussama n'a pas listé Java, mais son expertise en C++ et JS lui permet d'apprendre très vite.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5 flex justify-center">
                            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
                                Simulation Technique en temps réel
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AIAssistantSection;
