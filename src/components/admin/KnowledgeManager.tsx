import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";

interface KnowledgeItem {
    id: number;
    question: string;
    answer: string;
}

const KnowledgeManager = ({ prefillQuestion, onClearPrefill }: { prefillQuestion?: string | null, onClearPrefill?: () => void }) => {
    const queryClient = useQueryClient();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({ question: "", answer: "" });

    const { data: knowledgeItems, isLoading } = useQuery({
        queryKey: ["assistant-knowledge"],
        queryFn: async () => {
            const response = await api.get("/assistant-knowledge");
            return response.data;
        },
    });

    useEffect(() => {
        if (prefillQuestion) {
            setIsAdding(true);
            setFormData({ question: prefillQuestion, answer: "" });
        }
    }, [prefillQuestion]);

    const createMutation = useMutation({
        mutationFn: async (newItem: { question: string; answer: string }) => {
            await api.post("/assistant-knowledge", newItem);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["assistant-knowledge"] });
            toast.success("Question ajoutée avec succès");
            setIsAdding(false);
            setFormData({ question: "", answer: "" });
            if (onClearPrefill) onClearPrefill();
        },
        onError: () => toast.error("Erreur lors de l'ajout"),
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: { question: string; answer: string } }) => {
            await api.put(`/assistant-knowledge/${id}`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["assistant-knowledge"] });
            toast.success("Question mise à jour");
            setEditingId(null);
            setFormData({ question: "", answer: "" });
        },
        onError: () => toast.error("Erreur lors de la mise à jour"),
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/assistant-knowledge/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["assistant-knowledge"] });
            toast.success("Question supprimée");
        },
        onError: () => toast.error("Erreur lors de la suppression"),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            updateMutation.mutate({ id: editingId, data: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    const startEdit = (item: KnowledgeItem) => {
        setEditingId(item.id);
        setFormData({ question: item.question, answer: item.answer });
        setIsAdding(true);
    };

    if (isLoading) return <div>Chargement...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold font-heading">Base de Connaissances AI</h2>
                <button
                    onClick={() => {
                        setIsAdding(!isAdding);
                        setEditingId(null);
                        setFormData({ question: "", answer: "" });
                        if (onClearPrefill) onClearPrefill();
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                    {isAdding ? <X size={20} /> : <Plus size={20} />}
                    {isAdding ? "Annuler" : "Ajouter une question"}
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} className="bg-card border border-border p-6 rounded-lg space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Mots-clés (Question)</label>
                        <input
                            type="text"
                            value={formData.question}
                            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                            className="w-full p-2 rounded-md bg-background border border-input focus:ring-2 focus:ring-primary"
                            placeholder="Ex: compétences, contact,..."
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Réponse de l'AI</label>
                        <textarea
                            value={formData.answer}
                            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                            className="w-full p-2 rounded-md bg-background border border-input h-32 focus:ring-2 focus:ring-primary"
                            placeholder="La réponse qui sera donnée..."
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            <Save size={18} />
                            Enregistrer
                        </button>
                    </div>
                </form>
            )}

            <div className="grid gap-4">
                {knowledgeItems?.map((item: KnowledgeItem) => (
                    <div key={item.id} className="bg-card border border-border p-4 rounded-lg flex justify-between items-start group">
                        <div className="space-y-2">
                            <h3 className="font-bold text-lg text-primary">{item.question}</h3>
                            <p className="text-muted-foreground">{item.answer}</p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => startEdit(item)}
                                className="p-2 hover:bg-muted rounded-md text-blue-500"
                            >
                                <Pencil size={18} />
                            </button>
                            <button
                                onClick={() => {
                                    if (confirm("Supprimer cette entrée ?")) deleteMutation.mutate(item.id);
                                }}
                                className="p-2 hover:bg-muted rounded-md text-red-500"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KnowledgeManager;
