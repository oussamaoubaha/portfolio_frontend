import { useState, useEffect } from "react";
import api from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2, Save, Edit2 } from "lucide-react";

interface Props {
  userId: string;
}

interface Experience {
  id: number;
  role: string;
  company: string;
  location: string | null;
  period: string;
  type: string | null;
  missions: string[];
}

const AdminExperiences = ({ userId }: Props) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newMission, setNewMission] = useState<Record<string, string>>({});
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    role: "",
    company: "",
    location: "",
    period: "",
    type: "Stage",
    missions: [] as string[],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await api.get<Experience[]>("/experiences");
      // Filter out Education entries specifically if needed, likely handled by type
      const exps = data.filter(e => e.type !== 'Education' && e.type !== 'Formation');
      setExperiences(exps);
    } catch (error) {
      console.error("Fetch experiences failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!form.role.trim() || !form.company.trim() || !form.period.trim()) {
      toast.error("Veuillez remplir les champs obligatoires");
      return;
    }

    try {
      if (editingId) {
        await api.put(`/experiences/${editingId}`, form);
        toast.success("Expérience mise à jour !");
      } else {
        await api.post("/experiences", form);
        toast.success("Expérience ajoutée !");
      }
      resetForm();
      fetchData();
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement");
    }
  };

  const resetForm = () => {
    setForm({ role: "", company: "", location: "", period: "", type: "Stage", missions: [] });
    setEditingId(null);
    setShowForm(false);
  };

  const editExperience = (exp: Experience) => {
    setForm({
      role: exp.role,
      company: exp.company,
      location: exp.location || "",
      period: exp.period,
      type: exp.type || "Stage",
      missions: exp.missions || [],
    });
    setEditingId(exp.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteExperience = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer cette expérience ?")) return;
    try {
      await api.delete(`/experiences/${id}`);
      toast.success("Expérience supprimée !");
      fetchData();
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
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
          {editingId ? "Modifier l'expérience" : "Gestion des expériences"}
        </h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all"
          >
            <Plus size={16} />
            Ajouter
          </button>
        )}
      </div>

      {/* Add form */}
      {showForm && (
        <div className="bg-card rounded-xl p-6 border border-border space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Poste *</label>
              <input
                type="text"
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Développeur Web Front-end"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Entreprise *</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Maktoub-Tech"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Lieu</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Fès, Maroc"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Période *</label>
              <input
                type="text"
                value={form.period}
                onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="2024"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Type</label>
              <input
                type="text"
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Stage"
              />
            </div>
          </div>

          {/* Missions */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Missions</label>
            <div className="space-y-2 mb-3">
              {form.missions.map((mission, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="flex-1 text-sm text-foreground bg-muted px-3 py-2 rounded-lg">
                    {mission}
                  </span>
                  <button
                    onClick={() =>
                      setForm((f) => ({
                        ...f,
                        missions: f.missions.filter((_, idx) => idx !== i),
                      }))
                    }
                    className="text-destructive hover:bg-destructive/10 p-1 rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newMission["form"] || ""}
                onChange={(e) =>
                  setNewMission((prev) => ({ ...prev, form: e.target.value }))
                }
                placeholder="Ajouter une mission..."
                className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newMission["form"]?.trim()) {
                    setForm((f) => ({
                      ...f,
                      missions: [...f.missions, newMission["form"].trim()],
                    }));
                    setNewMission((prev) => ({ ...prev, form: "" }));
                  }
                }}
              />
              <button
                onClick={() => {
                  if (newMission["form"]?.trim()) {
                    setForm((f) => ({
                      ...f,
                      missions: [...f.missions, newMission["form"].trim()],
                    }));
                    setNewMission((prev) => ({ ...prev, form: "" }));
                  }
                }}
                className="px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all"
            >
              <Save size={16} />
              {editingId ? "Mettre à jour" : "Enregistrer"}
            </button>
            <button
              onClick={resetForm}
              className="px-6 py-2.5 rounded-lg border border-input text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Existing experiences */}
      {experiences.map((exp) => (
        <div
          key={exp.id}
          className="bg-card rounded-xl p-6 border border-border"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-heading font-semibold text-foreground">
                {exp.role}
              </h3>
              <p className="text-muted-foreground text-sm">
                {exp.company} — {exp.period}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => editExperience(exp)}
                className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                title="Modifier"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => deleteExperience(exp.id)}
                className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                title="Supprimer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          {exp.missions && exp.missions.length > 0 && (
            <ul className="space-y-1">
              {exp.missions.map((mission, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />
                  {mission}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {experiences.length === 0 && !showForm && (
        <p className="text-muted-foreground text-center py-8">
          Aucune expérience. Cliquez sur "Ajouter" pour commencer.
        </p>
      )}
    </div>
  );
};

export default AdminExperiences;
