// Script pour configurer les variables d'environnement Vercel
// Utilise: node configure-vercel-env.js

const { execSync } = require('child_process');

const envVars = {
  DATABASE_URL: 'postgresql://neondb_owner:npg_IM9dq5hCxOyo@ep-holy-bar-adkfxk8a-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  AUTH_SECRET: process.env.AUTH_SECRET || '[GÉNÈRE-UNE-CLÉ]',
  AUTH_URL: 'https://td-tech.vercel.app',
  RESEND_API_KEY: 're_Y6gWENxV_EoSQ3ErTiGAbhe5htT7TT2YG',
  RESEND_FROM_EMAIL: 'onboarding@resend.dev',
  ADMIN_EMAIL: 'admin@tidianediallo.com',
  ADMIN_PASSWORD: 'Admin123!'
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

