import { Resend } from 'resend'

// Récupérer la clé API depuis les variables d'environnement
const apiKey = process.env.RESEND_API_KEY || 're_Y6gWENxV_EoSQ3ErTiGAbhe5htT7TT2YG'

if (!apiKey || apiKey === '') {
  console.warn('⚠️ RESEND_API_KEY n\'est pas configurée. Les emails ne pourront pas être envoyés.')
}

const resend = new Resend(apiKey)

export { resend }

