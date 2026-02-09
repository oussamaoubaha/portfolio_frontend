import { useState, useEffect } from "react";
import api from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2, Save, GraduationCap } from "lucide-react";

interface Props {
  userId: string;
}

interface Education {
  id: number;
  school: string;
  degree: string;
  period: string;
  location: string | null;
  description: string | null;
}

const AdminEducation = ({ userId }: Props) => {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    school: "",
    degree: "",
    period: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await api.get<any[]>("/experiences");
      // Map to Education format and filter
      const eduData = data
        .filter(e => e.type === 'Education' || e.type === 'Formation')
        .map(e => ({
          id: e.id,
          school: e.company,
          degree: e.role,
          period: e.period,
          location: e.location,
          description: e.description
        }));
      setEducation(eduData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addEducation = async () => {
    if (!form.school.trim() || !form.degree.trim() || !form.period.trim()) {
      toast.error("Veuillez remplir les champs obligatoires");
      return;
    }

    try {
      // Map form back to Experience structure
      await api.post("/experiences", {
        company: form.school,
        role: form.degree,
        period: form.period,
        location: form.location,
        description: form.description,
        type: 'Education'
      });
      toast.success("Formation ajoutée !");
      setForm({ school: "", degree: "", period: "", location: "", description: "" });
      setShowForm(false);
      fetchData();
      queryClient.invalidateQueries({ queryKey: ["education"] });
    } catch (error) {
      toast.error("Erreur lors de l'ajout");
    }
  };

  const deleteEducation = async (id: number) => {
    try {
      await api.delete(`/experiences/${id}`);
      toast.success("Formation supprimée !");
      fetchData();
      queryClient.invalidateQueries({ queryKey: ["education"] });
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
          Gestion des formations
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all"
        >
          <Plus size={16} />
          Ajouter
        </button>
      </div>

      {showForm && (
        <div className="bg-card rounded-xl p-6 border border-border space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Établissement *
              </label>
              <input
                type="text"
                value={form.school}
                onChange={(e) => setForm((f) => ({ ...f, school: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="EST d'Oujda"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Diplôme *
              </label>
              <input
                type="text"
                value={form.degree}
                onChange={(e) => setForm((f) => ({ ...f, degree: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="DUT Génie Informatique"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Période *
              </label>
              <input
                type="text"
                value={form.period}
                onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="2023 - 2025"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Lieu
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Oujda, Maroc"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Conception et Développement des logiciels..."
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={addEducation}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all"
            >
              <Save size={16} />
              Enregistrer
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-6 py-2.5 rounded-lg border border-input text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {education.map((edu) => (
        <div key={edu.id} className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg mt-0.5">
                <GraduationCap size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">
                  {edu.degree}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {edu.school} — {edu.period}
                </p>
                {edu.location && (
                  <p className="text-muted-foreground text-xs mt-0.5">{edu.location}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => deleteEducation(edu.id)}
              className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
          {edu.description && (
            <p className="text-sm text-muted-foreground mt-2 ml-11 leading-relaxed">
              {edu.description}
            </p>
          )}
        </div>
      ))}

      {education.length === 0 && !showForm && (
        <p className="text-muted-foreground text-center py-8">
          Aucune formation. Cliquez sur "Ajouter" pour commencer.
        </p>
      )}
    </div>
  );
};

export default AdminEducation;
