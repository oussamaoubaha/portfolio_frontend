<div align="center">
  <img src="public/favicon.svg" alt="Logo" width="80" height="80">
  <h1 align="center">Portfolio Frontend - Oussama Oubaha</h1>

  <p align="center">
    Un portfolio moderne, performant et interactif construit avec React, TypeScript et Tailwind CSS.
    <br />
    <br />
    <a href="https://oussama-oubaha.vercel.app/"><strong>Voir le site en direct »</strong></a>
    <br />
  </p>
</div>

---

## 🌟 À propos du Projet

Ce projet représente l'interface utilisateur de mon portfolio professionnel. Conçu pour offrir une expérience utilisateur exceptionnelle (UX/UI), il intègre des animations fluides, un design en "glassmorphism", ainsi qu'un assistant IA intelligent interactif.

### ✨ Fonctionnalités Principales

- **Assistant IA Intégré (OUBA-SYS)** : Un chatbot alimenté par l'API de Groq (Llama 3) pour répondre instantanément aux questions des visiteurs concernant mon parcours.
- **Animations & Interactivité** : Transitions de pages et éléments animés au défilement grâce à **Framer Motion** et **Lenis** (Smooth Scroll).
- **Formulaire de Contact Dynamique** : Envoi d'emails directs depuis le navigateur configuré via **EmailJS**.
- **Performances Optimisées** : Code-splitting (chargement asynchrone avec `React.lazy`), images WebP, et SVG en ligne garantissant un score Lighthouse de 90+.
- **Design Moderne** : Utilisation de **Tailwind CSS** pour un layout 100% responsive et des effets visuels soignés (flous, dégradés, custom cursors).
- **Données API** : Intégration backend Laravel (hébergé sur Railway) gérée via des requêtes optimisées.

## 🛠️ Stack Technique

- **Framework** : React 18, Vite.js
- **Langage** : TypeScript
- **Style** : Tailwind CSS, Shadcn/UI
- **Animations** : Framer Motion, Lenis (Smooth Scroll)
- **Services Tiers** : 
  - Groq API (Assistant IA)
  - EmailJS (Formulaire de contact)
  - DiceBear API (Avatars)

## 🚀 Installation & Lancement en local

Pour faire tourner le projet localement, suivez ces instructions :

### Prérequis
- Node.js (v18+)
- npm ou yarn

### Étapes

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/oussamaoubaha/portfolio_frontend.git
   cd portfolio_frontend
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   Créez un fichier `.env.local` à la racine du projet et ajoutez vos propres clés (voir le modèle `.env.example`) :
   ```env
   VITE_GROQ_API_KEY=votre_cle_api_groq
   VITE_EMAILJS_SERVICE_ID=votre_service_id
   VITE_EMAILJS_TEMPLATE_ID=votre_template_id
   VITE_EMAILJS_PUBLIC_KEY=votre_public_key
   ```

4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```
   Le site sera accessible sur `http://localhost:5173`.

## 📦 Build pour la production

Pour compiler le projet pour la production :

```bash
npm run build
```
Les fichiers générés se trouveront dans le dossier `dist/`. Vous pouvez tester le rendu localement avec :
```bash
npm run preview
```

## 🌐 Déploiement

Ce projet est optimisé pour être déployé sur **Vercel**. 
Il inclut un fichier `vercel.json` configuré pour gérer le Content Security Policy (CSP) et les redirections Single Page Application (SPA). N'oubliez pas d'ajouter vos variables d'environnement directement dans les paramètres de votre projet Vercel.

---

<div align="center">
  Développé avec passion par <strong>Oussama Oubaha</strong>.<br>
  Étudiant en Génie Informatique.
</div>
