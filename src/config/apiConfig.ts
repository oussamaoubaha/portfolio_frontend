/**
 * Configuration API — Architecture prête pour Laravel
 *
 * Ce fichier centralise la configuration de l'API backend.
 * Actuellement, le portfolio utilise Lovable Cloud (Supabase) comme backend.
 *
 * Pour migrer vers Laravel :
 * 1. Changez API_PROVIDER à "laravel"
 * 2. Renseignez LARAVEL_API_URL avec l'URL de votre serveur
 * 3. Implémentez les endpoints correspondants dans votre API Laravel
 *
 * Endpoints Laravel attendus :
 *   GET    /api/profile          → Récupérer le profil
 *   PUT    /api/profile          → Mettre à jour le profil
 *   GET    /api/skill-categories → Liste des catégories de compétences
 *   POST   /api/skill-categories → Ajouter une catégorie
 *   DELETE /api/skill-categories/:id
 *   POST   /api/skills           → Ajouter une compétence
 *   DELETE /api/skills/:id
 *   GET    /api/experiences      → Liste des expériences
 *   POST   /api/experiences      → Ajouter une expérience
 *   DELETE /api/experiences/:id
 *   GET    /api/education        → Liste des formations
 *   POST   /api/education        → Ajouter une formation
 *   DELETE /api/education/:id
 *   GET    /api/feedback         → Liste des avis
 *   POST   /api/feedback         → Soumettre un avis
 *   PUT    /api/feedback/:id     → Approuver / masquer
 *   DELETE /api/feedback/:id
 *   POST   /api/auth/login       → Connexion
 *   POST   /api/auth/register    → Inscription
 *   POST   /api/auth/logout      → Déconnexion
 */

export type ApiProvider = "cloud" | "laravel";

interface ApiConfig {
  /** Backend actif : "cloud" (Lovable Cloud) ou "laravel" */
  provider: ApiProvider;
  /** URL de base de l'API Laravel (ex: https://api.mon-portfolio.com) */
  laravelBaseUrl: string;
  /** Timeout des requêtes en ms */
  timeout: number;
}

export const apiConfig: ApiConfig = {
  provider: (import.meta.env.VITE_API_PROVIDER as ApiProvider) || "cloud",
  laravelBaseUrl: import.meta.env.VITE_LARAVEL_API_URL || "http://localhost:8000",
  timeout: 10000,
};

/**
 * Retourne l'URL complète pour un endpoint Laravel.
 * @example getApiUrl("/api/profile") → "http://localhost:8000/api/profile"
 */
export function getApiUrl(path: string): string {
  return `${apiConfig.laravelBaseUrl}${path}`;
}

/**
 * Vérifie si le backend actif est Lovable Cloud.
 */
export function isCloudProvider(): boolean {
  return apiConfig.provider === "cloud";
}
