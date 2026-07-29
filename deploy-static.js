#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Déploiement statique du portfolio Oussama Oubaha...\n');

// Étape 1: Build du projet
console.log('📦 Build du projet...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build réussi!');
} catch (error) {
  console.error('❌ Erreur lors du build:', error.message);
  process.exit(1);
}

// Étape 2: Vérifier que le dossier dist existe
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ Le dossier dist n\'existe pas après le build');
  process.exit(1);
}

// Étape 3: Créer un fichier .htaccess pour Apache
const htaccessContent = `
# Enable URL rewriting
RewriteEngine On

# Handle React Router
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"
</IfModule>

# Compress assets
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header always set X-Content-Type-Options nosniff
  Header always set X-Frame-Options DENY
  Header always set X-XSS-Protection "1; mode=block"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
`;

fs.writeFileSync(path.join(distPath, '.htaccess'), htaccessContent);
console.log('✅ Fichier .htaccess créé!');

// Étape 4: Créer un fichier _redirects pour Netlify
const redirectsContent = `
/*    /index.html   200
`;

fs.writeFileSync(path.join(distPath, '_redirects'), redirectsContent);
console.log('✅ Fichier _redirects (Netlify) créé!');

// Étape 5: Créer un fichier vercel.json pour Vercel
const vercelConfig = {
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
};

fs.writeFileSync(path.join(distPath, 'vercel.json'), JSON.stringify(vercelConfig, null, 2));
console.log('✅ Fichier vercel.json créé!');

// Étape 6: Instructions de déploiement
console.log('\n🎯 Instructions de déploiement:\n');
console.log('1. Vercel (recommandé):');
console.log('   - npx vercel --prod');
console.log('   - Ou connectez-vous à https://vercel.com et glissez le dossier dist\n');

console.log('\n2. Netlify:');
console.log('   - Glissez le dossier dist sur https://app.netlify.com/drop');
console.log('   - Ou utilisez: npx netlify deploy --prod --dir=dist\n');

console.log('\n3. GitHub Pages:');
console.log('   - Upload du contenu du dossier dist sur la branche gh-pages');
console.log('   - Activez GitHub Pages dans les settings du repository\n');

console.log('\n4. Hébergement traditionnel:');
console.log('   - Uploadez tout le contenu du dossier dist sur votre serveur');
console.log('   - Assurez-vous que le .htaccess est bien uploadé\n');

console.log('\n✨ Portfolio prêt pour le déploiement! 🚀');
