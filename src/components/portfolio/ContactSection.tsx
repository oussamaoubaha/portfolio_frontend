import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { Github, Linkedin, Mail, Phone, Send } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { toast } from "sonner";
import ScrollReveal from "@/components/ui/ScrollReveal";

const easing = [0.16, 1, 0.3, 1] as const;

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  const socials = useMemo(
    () => [
      {
        label: "LinkedIn",
        href: portfolioData.social.linkedin,
        icon: Linkedin,
      },
      { label: "GitHub", href: portfolioData.social.github, icon: Github },
      {
        label: "Email",
        href: `mailto:${portfolioData.email}`,
        icon: Mail,
      },
      { label: "WhatsApp", href: portfolioData.social.whatsapp, icon: Phone },
    ],
    []
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Merci de remplir tous les champs.");
      return;
    }
    setSending(true);
    try {
      const subject = encodeURIComponent("Contact — Portfolio Oussama Oubaha");
      const body = encodeURIComponent(
        `Nom: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`
      );
      window.location.href = `mailto:${portfolioData.email}?subject=${subject}&body=${body}`;
      toast.success("Ouverture de votre client mail…");
      setName("");
      setEmail("");
      setMessage("");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section id="contact" className="py-24">
        <div className="container mx-auto px-6">
          <div ref={ref} className="max-w-6xl mx-auto">
            <ScrollReveal direction="up" delay={0}>
              <div className="mb-14">
                <p className="label-tag text-hero-muted mb-3">Contact</p>
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground">
                  Parlons de votre projet.
                </h2>
                <p className="text-muted-foreground mt-3 max-w-2xl">
                  Une opportunité de stage, une mission ou simplement une question — je réponds
                  rapidement.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ScrollReveal direction="up" delay={0.1}>
                <div className="glass-card p-8" data-cursor="card">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-6">
                    Envoyer un message
                  </h3>
                  <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                      <label className="label-tag text-muted-foreground block mb-2">
                        Nom
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-input bg-background/40 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label className="label-tag text-muted-foreground block mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-input bg-background/40 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
                        placeholder="vous@mail.com"
                      />
                    </div>
                    <div>
                      <label className="label-tag text-muted-foreground block mb-2">
                        Message
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-input bg-background/40 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 transition resize-none"
                        placeholder="Décrivez votre besoin…"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium transition hover:opacity-95 disabled:opacity-60"
                      data-cursor="link"
                      data-magnetic
                    >
                      <Send size={16} />
                      {sending ? "Envoi…" : "Envoyer"}
                    </button>
                  </form>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.2}>
                <div className="glass-card p-8" data-cursor="card">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-6">
                    Me retrouver
                  </h3>

                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="label-tag text-muted-foreground">Email</p>
                        <p className="text-foreground font-medium">{portfolioData.email}</p>
                      </div>
                      <a
                        href={`mailto:${portfolioData.email}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
                        data-cursor="link"
                      >
                        <Mail size={16} />
                        Écrire
                      </a>
                    </div>

                    <div>
                      <p className="label-tag text-muted-foreground mb-3">Réseaux</p>
                      <div className="grid grid-cols-2 gap-3">
                        {socials.map((s) => {
                          const Icon = s.icon;
                          return (
                            <a
                              key={s.label}
                              href={s.href}
                              target="_blank"
                              rel="noreferrer"
                              className="group inline-flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
                              data-cursor="link"
                            >
                              <span className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 grid place-items-center group-hover:border-primary/40 transition">
                                <Icon size={18} className="text-hero-foreground/90" />
                              </span>
                              <span className="text-sm text-foreground">{s.label}</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-2">
                      <p className="label-tag text-muted-foreground mb-2">Localisation</p>
                      <p className="text-muted-foreground">{portfolioData.location}</p>
                    </div>

                    <div className="mt-2 rounded-2xl border border-white/10 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 p-6">
                      <p className="text-foreground font-semibold">
                        Disponible pour un stage
                      </p>
                      <p className="text-muted-foreground mt-1">
                        Fin d'études • 2 mois • Full‑stack / Web
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

