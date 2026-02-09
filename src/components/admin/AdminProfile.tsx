import { useState, useEffect } from "react";
import api from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Save, Upload } from "lucide-react";

interface Props {
  userId: string;
}

const AdminProfile = ({ userId }: Props) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: "", // Changed from full_name to name to match DB
    title: "",
    subtitle: "",
    email: "",
    location: "",
    about_text: "",
    hero_image: "", // Changed from photo_url
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get('/profile');
      if (data) {
        setForm({
          name: data.name || "",
          title: data.title || "",
          subtitle: data.subtitle || "",
          email: data.email || "",
          location: data.location || "",
          about_text: data.about_text || "",
          hero_image: data.hero_image || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch profile", error);
      toast.error("Impossible de charger le profil");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.post('/profile', form); // Update profile
      toast.success("Profil mis à jour !");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    } catch (error) {
      console.error("Save failed", error);
      toast.error("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Implement file upload endpoint in Laravel
    toast.error("L'upload d'image n'est pas encore implémenté côté serveur.");
  };

  if (loading) {
    return <div className="animate-pulse h-40 bg-muted rounded-xl" />;
  }

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-xl font-bold text-foreground">
        Informations personnelles
      </h2>

      {/* Photo upload */}
      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-muted border-2 border-border">
          {form.hero_image ? (
            <img
              src={form.hero_image}
              alt="Photo de profil"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-2xl font-bold">
              {(form.name || "?").charAt(0)}
            </div>
          )}
        </div>
        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-input bg-background text-sm font-medium text-foreground hover:bg-muted transition-colors">
          <Upload size={16} />
          {uploading ? "Upload..." : "Changer la photo"}
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: "name", label: "Nom complet" },
          { key: "title", label: "Titre" },
          { key: "subtitle", label: "Sous-titre" },
          { key: "email", label: "Email" },
          { key: "location", label: "Localisation" },
        ].map(({ key, label }) => (
          <div key={key}>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              {label}
            </label>
            <input
              type="text"
              value={form[key as keyof typeof form]}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
        ))}
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          À propos
        </label>
        <textarea
          value={form.about_text}
          onChange={(e) => setForm((f) => ({ ...f, about_text: e.target.value }))}
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all disabled:opacity-50"
      >
        <Save size={16} />
        {saving ? "Sauvegarde..." : "Sauvegarder"}
      </button>
    </div>
  );
};

export default AdminProfile;
