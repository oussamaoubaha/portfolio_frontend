import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LogOut, User, Wrench, Briefcase, MessageSquare, GraduationCap, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import AdminProfile from "@/components/admin/AdminProfile";
import AdminSkills from "@/components/admin/AdminSkills";
import AdminExperiences from "@/components/admin/AdminExperiences";
import AdminFeedback from "@/components/admin/AdminFeedback";
import AdminEducation from "@/components/admin/AdminEducation";

type Tab = "profile" | "skills" | "experiences" | "education" | "feedback";

const AdminPage = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!loading && user && !isAdmin) {
      toast.error("Accès refusé. Vous n'êtes pas administrateur.");
      navigate("/");
    }
  }, [isAdmin, loading, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "profile", label: "Profil", icon: User },
    { id: "skills", label: "Compétences", icon: Wrench },
    { id: "experiences", label: "Expériences", icon: Briefcase },
    { id: "education", label: "Formation", icon: GraduationCap },
    { id: "feedback", label: "Avis", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="font-heading text-xl font-bold text-foreground">
              O.O
            </a>
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              onClick={async () => {
                await signOut();
                navigate("/");
              }}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut size={16} />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-8">
          Tableau de bord
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-w-4xl">
          {activeTab === "profile" && <AdminProfile userId={user.id} />}
          {activeTab === "skills" && <AdminSkills userId={user.id} />}
          {activeTab === "experiences" && <AdminExperiences userId={user.id} />}
          {activeTab === "education" && <AdminEducation userId={user.id} />}
          {activeTab === "feedback" && <AdminFeedback />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
