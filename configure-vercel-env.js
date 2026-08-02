// Script pour configurer les variables d'environnement Vercel
// Utilise: node configure-vercel-env.js

const { execSync } = require('child_process');

// Ce script n'embarque plus aucun secret : il lit les valeurs depuis les
// variables d'environnement déjà présentes dans le shell (ex: `source .env`
// avant de lancer `node configure-vercel-env.js`, ou export manuel).
const envVars = {
  DATABASE_URL: process.env.DATABASE_URL || '[NON DÉFINI - voir .env]',
  AUTH_SECRET: process.env.AUTH_SECRET || '[NON DÉFINI - voir .env]',
  AUTH_URL: process.env.AUTH_URL || 'https://td-tech.vercel.app',
  RESEND_API_KEY: process.env.RESEND_API_KEY || '[NON DÉFINI - voir .env]',
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || '[NON DÉFINI - voir .env]',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || '[NON DÉFINI - voir .env]',
};

console.log('📝 Variables d\'environnement à configurer dans Vercel:\n');
console.log('='.repeat(60));

Object.entries(envVars).forEach(([key, value]) => {
  console.log(`\n${key}:`);
  console.log(`  ${value}`);
});

console.log('\n' + '='.repeat(60));
console.log('\n💡 Pour configurer via Vercel CLI:');
console.log('   1. vercel login');
console.log('   2. vercel link');
console.log('   3. Pour chaque variable: vercel env add <KEY> production');
console.log('\n💡 Ou configure-les manuellement dans:');
console.log('   https://vercel.com/dashboard → Ton projet → Settings → Environment Variables');

