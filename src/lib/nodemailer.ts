import nodemailer from 'nodemailer'

// Configuration Nodemailer pour Gmail
// Utilise un "App Password" de Gmail au lieu du mot de passe normal
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'diallotidiane014@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD || '', // App Password, pas le mot de passe Gmail normal
  },
})

// Vérifier la connexion
export async function verifyConnection() {
  try {
    await transporter.verify()
    console.log('✅ Connexion Gmail SMTP réussie')
    return true
  } catch (error) {
    console.error('❌ Erreur de connexion Gmail SMTP:', error)
    return false
  }
}

