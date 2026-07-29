import { useState, useEffect } from "react";
import api from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2, Save, Edit2, Code2, Globe, Image as ImageIcon } from "lucide-react";
import { Project } from "@/types";

interface Props {
    userId: string;
}

const AdminProjects = ({ userId }: Props) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [newTech, setNewTech] = useState("");
    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        title: "",
        description: "",
        image_url: "",
        project_url: "",
        technologies: [] as string[],
        order: 0,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data } = await api.get<Project[]>("/projects");
            setProjects(data);
        } catch (error) {
            console.error("Fetch projects failed", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!form.title.trim() || !form.description.trim()) {
            toast.error("Veuillez remplir les champs obligatoires");
            return;
        }

        try {
            if (editingId) {
                await api.put(`/projects/${editingId}`, form);
                toast.success("Projet mis à jour !");
            } else {
                await api.post("/projects", form);
                toast.success("Projet ajouté !");
            }
            resetForm();
            fetchData();
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        } catch (error) {
            toast.error("Erreur lors de l'enregistrement");
        }
    };

    const resetForm = () => {
        setForm({ title: "", description: "", image_url: "", project_url: "", technologies: [], order: 0 });
        setEditingId(null);
        setShowForm(false);
    };

    const editProject = (project: Project) => {
        setForm({
            title: project.title,
            description: project.description,
            image_url: project.image_url || "",
            project_url: project.project_url || "",
            technologies: project.technologies || [],
            order: project.order || 0,
        });
        setEditingId(project.id || null);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const deleteProject = async (id: number) => {
        if (!confirm("Voulez-vous vraiment supprimer ce projet ?")) return;
        try {
            await api.delete(`/projects/${id}`);
            toast.success("Projet supprimé !");
            fetchData();
            queryClient.invalidateQueries({ queryKey: ["projects"] });
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
                    {editingId ? "Modifier le projet" : "Gestion des projets"}
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

            {/* Add/Edit form */}
            {showForm && (
                <div className="bg-card rounded-xl p-6 border border-border space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-foreground mb-1.5 block">Titre *</label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Ex: E-Commerce Pro"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-foreground mb-1.5 block">Description *</label>
                            <textarea
                                value={form.description}
                                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
                                placeholder="Description du projet..."
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-foreground mb-1.5 block flex items-center gap-2">
                                <ImageIcon size={14} /> URL Image
                            </label>
                            <input
                                type="text"
                                value={form.image_url}
                                onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
                                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="https://..."
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-foreground mb-1.5 block flex items-center gap-2">
                                <Globe size={14} /> URL Projet
                            </label>
                            <input
                                type="text"
                                value={form.project_url}
                                onChange={(e) => setForm((f) => ({ ...f, project_url: e.target.value }))}
                                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="https://..."
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-foreground mb-1.5 block">Ordre d'affichage</label>
                            <input
                                type="number"
                                value={form.order}
                                onChange={(e) => setForm((f) => ({ ...f, order: parseInt(e.target.value) || 0 }))}
                                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>

                    {/* Technologies */}
                    <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block flex items-center gap-2">
                            <Code2 size={14} /> Technologies
                        </label>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {form.technologies.map((tech, i) => (
                                <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
                                    {tech}
                                    <button
                                        onClick={() => setForm(f => ({ ...f, technologies: f.technologies.filter((_, idx) => idx !== i) }))}
                                        className="hover:text-destructive"
                                    >
                                        <Trash2 size={10} />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newTech}
                                onChange={(e) => setNewTech(e.target.value)}
                                placeholder="Ajouter une techno..."
                                className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && newTech.trim()) {
                                        setForm(f => ({ ...f, technologies: [...f.technologies, newTech.trim()] }));
                                        setNewTech("");
                                    }
                                }}
                            />
                            <button
                                onClick={() => {
                                    if (newTech.trim()) {
                                        setForm(f => ({ ...f, technologies: [...f.technologies, newTech.trim()] }));
                                        setNewTech("");
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

            {/* Existing projects list */}
            <div className="grid grid-cols-1 gap-4">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-card rounded-xl p-6 border border-border flex flex-col md:flex-row gap-6"
                    >
                        {project.image_url && (
                            <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden border border-border flex-shrink-0">
                                <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h3 className="font-heading font-semibold text-foreground truncate">
                                        {project.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {project.technologies?.map(tech => (
                                            <span key={tech} className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => editProject(project)}
                                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                        title="Modifier"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => deleteProject(project.id!)}
                                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                                        title="Supprimer"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <p className="text-muted-foreground text-sm line-clamp-2">
                                {project.description}
                            </p>
                        </div>
                    </div>
                ))}

                {projects.length === 0 && !showForm && (
                    <p className="text-muted-foreground text-center py-8">
                        Aucun projet. Cliquez sur "Ajouter" pour commencer.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AdminProjects;
