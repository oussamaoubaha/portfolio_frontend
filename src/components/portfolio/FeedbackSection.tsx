import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Send, Star } from "lucide-react";
import api from "@/services/api";
import { useApprovedFeedback } from "@/hooks/usePortfolioData";
import { toast } from "sonner";

const FeedbackSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: feedbackList, refetch } = useApprovedFeedback();

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/reviews', {
        author: name.trim(),
        content: message.trim(),
        rating: 5 // Default rating or add UI for it
      });
      toast.success("Merci pour votre avis ! Il sera affiché après validation.");
      setName("");
      setMessage("");
    } catch (error) {
      toast.error("Erreur lors de l'envoi");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="feedback" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div ref={ref} className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <MessageSquare className="text-primary" size={20} />
              </div>
              <h2 className="font-heading text-3xl font-bold text-foreground">
                Avis & Témoignages
              </h2>
            </div>
            <p className="text-muted-foreground">
              Ce que les visiteurs pensent de mon travail
            </p>
          </motion.div>

          {/* Approved feedback display */}
          {feedbackList && feedbackList.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {feedbackList.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-card rounded-xl p-6 border border-border"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(item.rating || 5)].map((_, i) => ( // Use item.rating
                      <Star
                        key={i}
                        size={14}
                        className="text-primary fill-primary"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    "{item.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                      {item.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {item.author}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.created_at).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Submit form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-xl mx-auto"
          >
            <div className="bg-card rounded-2xl p-8 border border-border">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-6">
                Laisser un avis
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Votre nom
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="EX : Oubaha Oussama"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Votre message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                    placeholder="Partagez votre expérience..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all disabled:opacity-50"
                >
                  <Send size={16} />
                  {submitting ? "Envoi..." : "Envoyer mon avis"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
