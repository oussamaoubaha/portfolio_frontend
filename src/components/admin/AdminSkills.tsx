import { useState, useEffect } from "react";
import api from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2, X } from "lucide-react";

interface Props {
  userId: string;
}

interface Skill {
  id: number;
  name: string;
  category: string;
  icon?: string;
  level: number;
}

const ICON_OPTIONS = [
  { value: "code", label: "Code" },
  { value: "globe", label: "Web" },
  { value: "database", label: "Data" },
  { value: "server", label: "Systèmes" },
];

const CATEGORY_OPTIONS = [
  "Développement",
  "Web",
  "Data",
  "Systèmes",
  "Design",
  "Autre"
];

const AdminSkills = ({ userId }: Props) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("Développement");
  const [newIcon, setNewIcon] = useState("code");

  const queryClient = useQueryClient();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await api.get<Skill[]>("/skills");
      setSkills(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addSkill = async () => {
    if (!newName.trim()) return;
    try {
      await api.post("/skills", {
        name: newName,
        category: newCategory,
        icon: newIcon,
        level: 0
      });
      toast.success("Compétence ajoutée !");
      setNewName("");
      setIsAdding(false);
      fetchData();
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    } catch (error) {
      toast.error("Erreur lors de l'ajout");
    }
  };

  const deleteSkill = async (id: number) => {
    try {
      await api.delete(`/skills/${id}`);
      toast.success("Compétence supprimée !");
      fetchData();
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    } catch (error) {
      toast.error("Erreur la suppression");
    }
  };

  if (loading) {
    return <div className="animate-pulse h-40 bg-muted rounded-xl" />;
  }

  // Group skills for display
  const groupedSkills: Record<string, Skill[]> = {};
  skills.forEach(skill => {
    if (!groupedSkills[skill.category]) groupedSkills[skill.category] = [];
    groupedSkills[skill.category].push(skill);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Gestion des compétences
        </h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all"
        >
          <Plus size={16} />
          Ajouter une compétence
        </button>
      </div>

      {/* Add Skill Form */}
      {isAdding && (
        <div className="p-4 bg-card rounded-xl border border-border flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="text-sm font-medium text-foreground mb-1.5 block">Nom</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Ex: React.js"
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Catégorie</label>
            <div className="relative">
              <input
                list="categories"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <datalist id="categories">
                {CATEGORY_OPTIONS.map(c => <option key={c} value={c} />)}
              </datalist>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Icône</label>
            <select
              value={newIcon}
              onChange={e => setNewIcon(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {ICON_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <button
            onClick={addSkill}
            className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all"
          >
            Ajouter
          </button>
        </div>
      )}

      {/* Categories list */}
      {Object.entries(groupedSkills).map(([category, items]) => (
        <div
          key={category}
          className="bg-card rounded-xl p-6 border border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground">
              {category}
            </h3>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {items.map((skill) => (
              <span
                key={skill.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-sm text-foreground"
              >
                {skill.name}
                <button
                  onClick={() => deleteSkill(skill.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
      ))}

      {skills.length === 0 && (
        <p className="text-muted-foreground text-center py-8">
          Aucune compétence. Ajoutez-en une ci-dessus.
        </p>
      )}
    </div>
  );
};

export default AdminSkills;
