import { Resend } from 'resend'

// Récupérer la clé API depuis les variables d'environnement
const apiKey = process.env.RESEND_API_KEY || ''

if (!apiKey || apiKey === '') {
  console.warn('⚠️ RESEND_API_KEY n\'est pas configurée. Les emails ne pourront pas être envoyés.')
}

const resend = new Resend(apiKey)

export { resend }

