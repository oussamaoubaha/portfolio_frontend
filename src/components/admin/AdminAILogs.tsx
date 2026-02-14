import { useState, useEffect } from "react";
import api from "@/services/api";
import { toast } from "sonner";
import { Trash2, MessageSquare, ShieldCheck, ShieldAlert, Clock } from "lucide-react";

interface AIConversation {
    id: number;
    client_ip: string;
    user_message: string;
    ai_response: string;
    is_success: boolean;
    created_at: string;
}

interface AIMessage {
    id: number;
    role: 'user' | 'ai';
    content: string;
    created_at: string;
}

interface AISession {
    id: number;
    client_ip: string;
    is_unresolved: boolean;
    messages: AIMessage[];
    created_at: string;
}

const AdminAILogs = ({ onPrefillKnowledge }: { onPrefillKnowledge?: (q: string) => void }) => {
    const [sessions, setSessions] = useState<AISession[]>([]);
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState({ system_prompt: "", current_status: "" });
    const [saving, setSaving] = useState<Record<string, boolean>>({});
    const [selectedSession, setSelectedSession] = useState<AISession | null>(null);

    useEffect(() => {
        fetchSessions();
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data } = await api.get("/assistant-settings");
            setSettings({
                system_prompt: data.system_prompt || "",
                current_status: data.current_status || ""
            });
        } catch (error) {
            toast.error("Erreur chargement réglages");
        }
    };

    const updateSetting = async (key: string) => {
        setSaving(prev => ({ ...prev, [key]: true }));
        try {
            await api.put(`/assistant-settings/${key}`, { value: (settings as any)[key] });
            toast.success("Réglage mis à jour !");
        } catch (error) {
            toast.error("Erreur lors de la mise à jour");
        } finally {
            setSaving(prev => ({ ...prev, [key]: false }));
        }
    };

    const fetchSessions = async () => {
        try {
            const { data } = await api.get("/ai-sessions");
            setSessions(data);
        } catch (error) {
            console.error(error);
            toast.error("Erreur chargement conversations");
        } finally {
            setLoading(false);
        }
    };

    const deleteSession = async (id: number) => {
        if (!confirm("Supprimer cette conversation ?")) return;
        try {
            await api.delete(`/ai-sessions/${id}`);
            toast.success("Conversation supprimée !");
            fetchSessions();
            if (selectedSession?.id === id) setSelectedSession(null);
        } catch (error) {
            toast.error("Erreur lors de la suppression");
        }
    };

    const getSessionDetails = async (id: number) => {
        try {
            const { data } = await api.get(`/ai-sessions/${id}`);
            setSelectedSession(data);
        } catch (error) {
            toast.error("Erreur lors du chargement des détails");
        }
    };

    if (loading) {
        return <div className="animate-pulse h-40 bg-muted rounded-xl" />;
    }

    return (
        <div className="space-y-8">
            {/* Configuration Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-md">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-foreground">System Prompt Global</label>
                        <button
                            onClick={() => updateSetting('system_prompt')}
                            disabled={saving['system_prompt']}
                            className="text-xs font-bold text-blue-500 hover:text-blue-400 disabled:opacity-50"
                        >
                            {saving['system_prompt'] ? "Enregistrement..." : "Sauvegarder"}
                        </button>
                    </div>
                    <textarea
                        className="w-full min-h-[120px] p-3 rounded-lg bg-card border border-border text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                        placeholder="Identité, ton, instructions linguistiques..."
                        value={settings.system_prompt}
                        onChange={(e) => setSettings(prev => ({ ...prev, system_prompt: e.target.value }))}
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-foreground">Statut Actuel (Contexte Dynamique)</label>
                        <button
                            onClick={() => updateSetting('current_status')}
                            disabled={saving['current_status']}
                            className="text-xs font-bold text-blue-500 hover:text-blue-400 disabled:opacity-50"
                        >
                            {saving['current_status'] ? "Enregistrement..." : "Sauvegarder"}
                        </button>
                    </div>
                    <textarea
                        className="w-full min-h-[120px] p-3 rounded-lg bg-card border border-border text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                        placeholder="Ex: Actuellement à Oujda, disponible pour un stage..."
                        value={settings.current_status}
                        onChange={(e) => setSettings(prev => ({ ...prev, current_status: e.target.value }))}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-bold text-foreground">
                    Historique des Conversations
                </h2>
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {sessions.length} sessions enregistrées
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sessions List */}
                <div className="lg:col-span-1 space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {sessions.length === 0 ? (
                        <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
                            <MessageSquare className="mx-auto mb-3 text-muted-foreground" size={32} />
                            <p className="text-muted-foreground">Aucune conversation</p>
                        </div>
                    ) : (
                        sessions.map((session) => (
                            <div
                                key={session.id}
                                onClick={() => getSessionDetails(session.id)}
                                className={`p-4 rounded-xl border transition-all cursor-pointer relative group ${selectedSession?.id === session.id
                                    ? "bg-blue-500/10 border-blue-500/40"
                                    : "bg-white/5 border-white/10 hover:border-white/20"
                                    }`}
                            >
                                {session.is_unresolved && (
                                    <div className="absolute top-2 right-2 text-rose-500 animate-pulse" title="Question sans réponse">
                                        <ShieldAlert size={16} />
                                    </div>
                                )}
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] text-muted-foreground font-mono">
                                        {new Date(session.created_at).toLocaleString('fr-FR')}
                                    </span>
                                    <span className="text-xs font-bold text-foreground truncate">
                                        {session.messages?.[0]?.content || "Conversation vide"}
                                    </span>
                                    <span className="text-[10px] text-primary/70">{session.client_ip}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Session Detailed View */}
                <div className="lg:col-span-2 bg-white/5 rounded-xl border border-white/10 p-6 min-h-[400px] flex flex-col">
                    {selectedSession ? (
                        <>
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                                <div>
                                    <h3 className="font-bold text-foreground">Détails de la Session</h3>
                                    <p className="text-xs text-muted-foreground">{selectedSession.client_ip} - {new Date(selectedSession.created_at).toLocaleString('fr-FR')}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => deleteSession(selectedSession.id)}
                                        className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 space-y-4 max-h-[400px] overflow-y-auto pr-2 mb-6 scroll-smooth">
                                {selectedSession.messages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                            ? 'bg-blue-600 text-white rounded-tr-none'
                                            : 'bg-white/10 text-foreground rounded-tl-none'
                                            }`}>
                                            <p>{msg.content}</p>
                                            {msg.role === 'ai' && msg.content.includes("Je suis désolé, je n'ai pas d'information précise") && (
                                                <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center gap-4">
                                                    <span className="text-[10px] text-rose-300 flex items-center gap-1">
                                                        <ShieldAlert size={12} /> Non résolu
                                                    </span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            const userMsg = selectedSession.messages.find(m => m.id < msg.id && m.role === 'user')?.content;
                                                            if (onPrefillKnowledge && userMsg) onPrefillKnowledge(userMsg);
                                                        }}
                                                        className="text-[10px] font-bold bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
                                                    >
                                                        Ajouter à la base
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground opacity-50">
                            <MessageSquare size={48} className="mb-4" />
                            <p>Sélectionnez une conversation pour voir les détails</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminAILogs;
