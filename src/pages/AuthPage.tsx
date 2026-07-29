import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import api from "@/services/api";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    if (password.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          const errorMsg = error.status
            ? `Erreur ${error.status}: ${error.message}`
            : error.message;
          toast.error(errorMsg);
        } else {
          toast.success("Connexion réussie !");
          navigate("/admin");
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message.includes("already registered")) {
            toast.error("Cet email est déjà utilisé");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Compte créé ! Vérifiez votre email pour confirmer.");
        }
      }
    } catch (error) {
      console.error("Auth Exception:", error);
      toast.error("Une erreur inattendue est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-hero-muted hover:text-hero-foreground mb-8 transition-colors"
        >
          <ArrowLeft size={18} />
          Retour au portfolio
        </button>

        <div className="bg-card rounded-2xl p-8 shadow-xl border border-border">
          <h1 className="font-heading text-2xl font-bold text-card-foreground mb-2">
            {isLogin ? "Connexion Admin" : "Créer un compte"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {isLogin
              ? "Accédez à votre tableau de bord"
              : "Créez votre compte administrateur"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-card-foreground mb-1.5 block">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-card-foreground mb-1.5 block">
                Mot de passe
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              {loading
                ? "Chargement..."
                : isLogin
                  ? "Se connecter"
                  : "Créer le compte"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          </p>

          <button
            type="button"
            onClick={async () => {
              try {
                toast.info("Test de connexion en cours...");
                const res = await api.get('/ping');
                toast.success("CONNEXION RÉUSSIE: " + JSON.stringify(res.data));
                console.log("PING:", res.data);
              } catch (e: any) {
                toast.error("ÉCHEC CONNEXION: " + e.message);
                console.error("PING ERROR:", e);
              }
            }}
            className="mt-6 w-full py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Test de Connexion (Debug)
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
