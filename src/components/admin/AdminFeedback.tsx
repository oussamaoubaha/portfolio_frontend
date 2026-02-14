import { useState, useEffect } from "react";
import api from "@/services/api";
import { toast } from "sonner";
import { Trash2, Check, Clock, MessageSquare } from "lucide-react";

interface Feedback {
  id: number;
  author: string;
  guest_email?: string;
  google_email?: string;
  role?: string;
  content: string;
  rating: number;
  is_active: boolean;
  is_published: boolean;
  created_at: string;
}

const AdminFeedback = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const { data } = await api.get<Feedback[]>("/admin/reviews");
      setFeedback(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const togglePublish = async (id: number, currentlyPublished: boolean) => {
    try {
      await api.patch(`/avis/${id}/publish`);
      toast.success(!currentlyPublished ? "Avis validé et publié !" : "Avis retiré du site");
      fetchFeedback();
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const deleteFeedback = async (id: number) => {
    try {
      await api.delete(`/reviews/${id}`);
      toast.success("Avis supprimé !");
      fetchFeedback();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  if (loading) {
    return <div className="animate-pulse h-40 bg-muted rounded-xl" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Gestion des avis
        </h2>
        <span className="text-sm text-muted-foreground">
          {feedback.length} avis au total
        </span>
      </div>

      {feedback.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="mx-auto mb-3 text-muted-foreground" size={32} />
          <p className="text-muted-foreground">Aucun avis pour le moment</p>
        </div>
      ) : (
        <div className="space-y-4">
          {feedback.map((item) => (
            <div
              key={item.id}
              className={`bg-card rounded-xl p-5 border transition-all ${item.is_published
                ? "border-primary/30"
                : "border-border"
                }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium text-foreground">
                    {item.author} {item.role && <span className="text-muted-foreground">({item.role})</span>}
                  </p>
                  {item.guest_email && (
                    <p className="text-xs text-primary font-medium">Saisi : {item.guest_email}</p>
                  )}
                  {item.google_email && (
                    <p className="text-xs text-blue-500 font-medium">Google : {item.google_email}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(item.created_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePublish(item.id, item.is_published)}
                    className={`p-2 rounded-lg transition-colors ${item.is_published
                      ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    title={item.is_published ? "Retirer du site" : "Valider et Publier"}
                  >
                    {item.is_published ? <Check size={16} /> : <Check size={16} className="opacity-50" />}
                  </button>
                  <button
                    onClick={() => deleteFeedback(item.id)}
                    className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.content}
              </p>
              <div className="mt-3">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${item.is_published
                    ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-muted text-muted-foreground"
                    }`}
                >
                  {item.is_published ? "Publié" : "En attente"}
                </span>
                <span className="text-xs ml-2 text-yellow-500">
                  {'★'.repeat(item.rating)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFeedback;
