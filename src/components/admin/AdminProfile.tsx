import { useState, useEffect } from "react";
// Admin Profile Component - Updated for Image Upload
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
    hero_image: "",
    cv_url: "",
    social_links: {} as Record<string, string>,
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
          cv_url: data.cv_url || "",
          social_links: data.social_links || {},
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
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploading(true);

      const formData = new FormData();
      // Append all existing text fields to FormData (backend validation might require them)
      Object.entries(form).forEach(([key, value]) => {
        if (key !== 'social_links' && key !== 'hero_image') {
          formData.append(key, value as string);
        }
        if (key === 'social_links') {
          // Send social_links as JSON string or individual fields depending on backend expectation. 
          // Since ProfileUpdateRequest likely handles JSON array/object, we might need to send it carefully.
          // For simplicity/safety, let's just send the image in a separate PATCH request OR send everything.
          // Laravel's PUT/PATCH with FormData is tricky. Best to use POST with _method=PUT or just POST if route allows.
          // The current route is POST /profile.
        }
      });

      // We mainly want to upload the image here. 
      // Let's create a specific payload just for the image update, 
      // BUT existing controller expects ProfileUpdateRequest which might require other fields.
      // Easiest way: Send everything including the new image.

      formData.append("hero_image", file);

      // Append social links as JSON string if backend handles it, or rely on the fact that we are updating.
      // Actually, to avoid validation errors on missing fields, we should append current form state.
      formData.append("name", form.name);
      formData.append("title", form.title);
      formData.append("subtitle", form.subtitle);
      formData.append("email", form.email);
      formData.append("location", form.location);
      formData.append("about_text", form.about_text);
      formData.append("cv_url", form.cv_url);

      // Social links need to be sent properly. If backend expects JSON:
      // formData.append("social_links", JSON.stringify(form.social_links)); 
      // ...Wait, backend casts social_links to array/json. 
      // Laravel validation 'nullable|array'. 
      // FormData doesn't support arrays directly like JSON. We usually do social_links[linkedin]...
      Object.entries(form.social_links).forEach(([k, v]) => {
        formData.append(`social_links[${k}]`, v);
      });

      try {
        const { data } = await api.post('/profile', formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Update local state with new image URL
        setForm(prev => ({ ...prev, hero_image: data.hero_image }));
        toast.success("Photo de profil mise à jour !");
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      } catch (error) {
        console.error("Upload failed", error);
        toast.error("Erreur lors de l'upload");
      } finally {
        setUploading(false);
      }
    }
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
              value={form[key as keyof typeof form] as string}
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

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Lien VC (URL PDF)
        </label>
        <input
          type="text"
          value={form.cv_url}
          onChange={(e) => setForm((f) => ({ ...f, cv_url: e.target.value }))}
          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-heading text-lg font-bold text-foreground border-b border-border pb-2">Réseaux Sociaux</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["linkedin", "github", "facebook", "instagram", "whatsapp"].map((social) => (
            <div key={social}>
              <label className="text-sm font-medium text-foreground mb-1.5 block capitalize">
                {social}
              </label>
              <input
                type="text"
                value={form.social_links?.[social] || ""}
                onChange={(e) => setForm((f) => ({
                  ...f,
                  social_links: { ...f.social_links, [social]: e.target.value }
                }))}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder={`URL ${social}`}
              />
            </div>
          ))}
        </div>
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
