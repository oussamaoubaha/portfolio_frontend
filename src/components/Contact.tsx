import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, Send, MapPin, Phone, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { SocialIcon } from './SocialIcon/SocialIcon';
import { SOCIAL_LINKS } from '../constants/socialLinks';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', title: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    setStatus('sending');

    try {
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          name:    form.name,
          email:   form.email,
          title:   form.title || `Message de ${form.name}`,
          message: form.message,
          time:    new Date().toLocaleString('fr-FR'),
        },
        { publicKey }
      );

      console.log('EmailJS success:', result);
      setStatus('success');
      setForm({ name: '', email: '', title: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      console.error('EmailJS Error:', err?.text || err?.message || err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />

      <div className="container relative z-10 px-6">
        <div className="grid gap-20 lg:grid-cols-2">
          {/* Left: Info */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 font-display text-5xl font-bold text-white md:text-7xl"
            >
              Travaillons <br />
              <span className="text-gradient">Ensemble</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-12 max-w-md text-lg text-muted-foreground"
            >
              Vous avez un projet en tête ou vous souhaitez simplement discuter de tech ? N'hésitez pas à me contacter.
            </motion.p>

            <div className="space-y-8">
              {[
                { icon: <Mail size={24} />, label: 'Email', value: 'oussama.oubaha24@ump.ac.ma' },
                { icon: <Phone size={24} />, label: 'Téléphone', value: '+212 6 28 84 19 79' },
                { icon: <MapPin size={24} />, label: 'Localisation', value: 'Oujda, Maroc' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-primary border border-white/10">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{item.label}</p>
                    <p className="text-lg font-medium text-white">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <SocialIcon key={social.name} {...social} />
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-morphism rounded-3xl p-8 lg:p-12"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full min-h-[400px] text-center gap-6"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 border border-green-500/30">
                    <CheckCircle size={40} className="text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message envoyé ! ✅</h3>
                    <p className="text-muted-foreground">
                      Votre message a bien été reçu.<br />
                      Je vous répondrai dès que possible !
                    </p>
                  </div>
                </motion.div>
              ) : status === 'error' ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full min-h-[400px] text-center gap-6"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 border border-red-500/30">
                    <AlertCircle size={40} className="text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Erreur d'envoi</h3>
                    <p className="text-muted-foreground">
                      Une erreur s'est produite. Vérifiez la console (F12) pour les détails.<br />
                      Ou contactez-moi directement par email.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground/70 ml-1">Nom *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground/70 ml-1">Email *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium text-foreground/70 ml-1">Sujet</label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="De quoi voulez-vous discuter ?"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground/70 ml-1">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Votre message ici..."
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-primary to-secondary py-5 text-lg font-bold text-white shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Envoyer le message
                        <Send size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
