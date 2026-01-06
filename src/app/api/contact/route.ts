import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { resend } from "@/lib/resend"
import { transporter } from "@/lib/nodemailer"
import { z } from "zod"

// ============================================
// SÉCURITÉ : Validation stricte avec Zod
// ============================================
const contactSchema = z.object({
  name: z.string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom ne peut pas dépasser 100 caractères")
    .trim()
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Le nom contient des caractères invalides"),

  email: z.string()
    .email("Email invalide")
    .trim()
    .toLowerCase()
    .max(255, "L'email ne peut pas dépasser 255 caractères"),

  subject: z.string()
    .max(200, "Le sujet ne peut pas dépasser 200 caractères")
    .optional()
    .transform(val => val?.trim() || undefined),

  message: z.string()
    .min(5, "Le message doit contenir au moins 5 caractères")
    .max(5000, "Le message ne peut pas dépasser 5000 caractères")
    .trim(),
})

// ============================================
// SÉCURITÉ : Fonction de sanitization HTML
// Protection contre XSS (Cross-Site Scripting)
// ============================================
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (char) => map[char])
}

// ============================================
// SÉCURITÉ : Rate limiting simple (en mémoire)
// Protection contre le spam et les attaques DDoS
// ============================================
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 3 // 3 requêtes par minute max

function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false
  }

  record.count++
  return true
}

export async function POST(request: Request) {
  try {
    // ============================================
    // SÉCURITÉ : Vérifier l'origine de la requête
    // ============================================
    const origin = request.headers.get('origin')
    const allowedOrigins = [
      'http://localhost:3000',
      'https://td-tech-lime.vercel.app',
      'https://td-tech.vercel.app',
    ]

    if (origin && !allowedOrigins.includes(origin)) {
      console.warn(`⚠️ Requête refusée - origine non autorisée: ${origin}`)
      return NextResponse.json(
        { error: "Origine non autorisée" },
        { status: 403 }
      )
    }

    // ============================================
    // SÉCURITÉ : Rate limiting par IP
    // ============================================
    const clientIp = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'unknown'

    if (!checkRateLimit(clientIp)) {
      console.warn(`⚠️ Rate limit dépassé pour IP: ${clientIp}`)
      return NextResponse.json(
        {
          error: "Trop de requêtes",
          message: "Veuillez patienter avant de renvoyer un message."
        },
        { status: 429 }
      )
    }

    // ============================================
    // Validation des données avec Zod
    // Protection automatique contre injection SQL
    // ============================================
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // ============================================
    // Sanitization supplémentaire des données
    // ============================================
    const sanitizedName = escapeHtml(validatedData.name)
    const sanitizedSubject = validatedData.subject ? escapeHtml(validatedData.subject) : undefined
    const sanitizedMessage = escapeHtml(validatedData.message)

    // Préparer le contenu de l'email
    const subject = sanitizedSubject || "Nouveau message de contact"

    // Email HTML formaté (avec données échappées)
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563EB 0%, #3B82F6 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .info { background: white; padding: 15px; margin: 15px 0; border-radius: 6px; border-left: 4px solid #2563EB; }
            .label { font-weight: bold; color: #2563EB; }
            .message { background: white; padding: 20px; margin: 15px 0; border-radius: 6px; border: 1px solid #e5e7eb; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Nouveau Message de Contact</h1>
            </div>
            <div class="content">
              <div class="info">
                <p><span class="label">Nom:</span> ${sanitizedName}</p>
                <p><span class="label">Email:</span> <a href="mailto:${validatedData.email}">${validatedData.email}</a></p>
                ${sanitizedSubject ? `<p><span class="label">Sujet:</span> ${sanitizedSubject}</p>` : ''}
                <p><span class="label">IP:</span> ${clientIp}</p>
              </div>
              <div class="message">
                <p><span class="label">Message:</span></p>
                <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
              </div>
              <div class="footer">
                <p>Ce message a été envoyé depuis le formulaire de contact de votre site web.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    // Version texte simple
    const textContent = `
Nouveau Message de Contact

Nom: ${sanitizedName}
Email: ${validatedData.email}
${sanitizedSubject ? `Sujet: ${sanitizedSubject}` : ''}
IP: ${clientIp}

Message:
${sanitizedMessage}

---
Ce message a été envoyé depuis le formulaire de contact de votre site web.
    `.trim()

    // ============================================
    // PRIORITÉ 1 : Envoyer l'email (Gmail SMTP ou Resend)
    // ============================================
    let emailSent = false
    let emailId = null
    let emailError = null
    const useGmailSmtp = process.env.USE_GMAIL_SMTP === 'true'

    try {
      if (useGmailSmtp && process.env.GMAIL_APP_PASSWORD) {
        // Utiliser Gmail SMTP (solution sans domaine)
        const mailOptions = {
          from: `"Portfolio Contact" <${process.env.GMAIL_USER || 'diallotidiane014@gmail.com'}>`,
          to: 'diallotidiane014@gmail.com',
          cc: 'tidiallo06@gmail.com',
          replyTo: validatedData.email,
          subject: subject,
          html: htmlContent,
          text: textContent,
        }

        const info = await transporter.sendMail(mailOptions)
        emailSent = true
        emailId = info.messageId
        console.log("✅ Email envoyé via Gmail SMTP:", info.messageId)
      } else {
        // Utiliser Resend (avec ou sans domaine vérifié)
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

        const emailResult = await resend.emails.send({
          from: fromEmail,
          to: ['diallotidiane014@gmail.com'],
          // Ajouter cc uniquement si un domaine est vérifié (pas en mode test)
          ...(fromEmail !== 'onboarding@resend.dev' && {
            cc: ['tidiallo06@gmail.com']
          }),
          replyTo: validatedData.email,
          subject: subject,
          html: htmlContent,
          text: textContent,
        })

        // Vérifier si l'email a vraiment été envoyé
        if (emailResult.error) {
          throw new Error(emailResult.error.message || "Erreur lors de l'envoi de l'email")
        }

        emailSent = true
        emailId = emailResult.data?.id
        console.log("✅ Email envoyé via Resend:", emailResult)
      }
    } catch (err) {
      emailError = err
      console.error("❌ Erreur envoi email:", err)

      // Log détaillé de l'erreur pour debugging
      if (err && typeof err === 'object' && 'message' in err) {
        console.error("Détails de l'erreur:", JSON.stringify(err, null, 2))
      }
    }

    // ============================================
    // PRIORITÉ 1.5 : Envoyer au webhook n8n (non-bloquant)
    // ============================================
    let n8nSent = false
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL

    if (n8nWebhookUrl) {
      try {
        const n8nPayload = {
          name: validatedData.name,
          email: validatedData.email,
          subject: validatedData.subject || "Nouveau message de contact",
          message: validatedData.message,
          timestamp: new Date().toISOString(),
          source: "td-tech-website",
          ip: clientIp,
          emailSent: emailSent,
          emailId: emailId
        }

        const n8nResponse = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(n8nPayload),
          signal: AbortSignal.timeout(5000) // Timeout 5 secondes
        })

        if (n8nResponse.ok) {
          n8nSent = true
          console.log("✅ Données envoyées au workflow n8n")
        } else {
          console.warn("⚠️ Le webhook n8n a retourné une erreur:", n8nResponse.status)
        }
      } catch (n8nError) {
        console.warn("⚠️ Impossible d'envoyer au webhook n8n (non-bloquant):", n8nError)
        // Continue même si n8n échoue
      }
    }

    // ============================================
    // PRIORITÉ 2 : Sauvegarder en base de données
    // Protection contre injection SQL via Prisma (requêtes paramétrées)
    // ============================================
    let dbSaved = false
    try {
      await prisma.contactMessage.create({
        data: {
          name: validatedData.name,
          email: validatedData.email,
          subject: validatedData.subject || "Nouveau message",
          message: validatedData.message,
        },
      })
      dbSaved = true
      console.log("✅ Message sauvegardé en base de données")
    } catch (dbError) {
      console.warn("⚠️ Impossible de sauvegarder en base de données (DB non disponible):", dbError)
      // On continue même si la DB n'est pas disponible
    }

    // ============================================
    // Retourner le résultat
    // ============================================
    if (emailSent || n8nSent) {
      return NextResponse.json(
        {
          message: "Message envoyé avec succès",
          emailId: emailId,
          dbSaved: dbSaved,
          n8nProcessed: n8nSent,
          // Info pour l'utilisateur si DB non disponible
          ...(dbSaved === false && {
            info: "Message envoyé par email. La sauvegarde en base de données n'est pas disponible actuellement."
          })
        },
        { status: 200 }
      )
    } else {
      // Si ni l'email ni n8n n'ont fonctionné
      let errorMessage = "Erreur inconnue lors de l'envoi de l'email"

      if (emailError) {
        // Gérer les erreurs Resend spécifiques
        if (typeof emailError === 'object' && emailError !== null) {
          if ('message' in emailError) {
            errorMessage = emailError.message as string
          } else if ('error' in emailError && typeof emailError.error === 'object' && emailError.error !== null) {
            const resendError = emailError.error as { message?: string; name?: string }
            errorMessage = resendError.message || resendError.name || errorMessage
          }
        } else if (emailError instanceof Error) {
          errorMessage = emailError.message
        }
      }

      return NextResponse.json(
        {
          error: "L'email n'a pas pu être envoyé",
          message: errorMessage,
          dbSaved: dbSaved,
          // Suggestion pour l'utilisateur
          suggestion: "Vérifiez que votre domaine est vérifié sur Resend ou utilisez uniquement l'adresse de test autorisée."
        },
        { status: 500 }
      )
    }

  } catch (err) {
    console.error("Erreur lors de l'envoi:", err)

    if (err instanceof z.ZodError) {
      // Formater les erreurs pour un affichage plus clair
      const errorMessages = err.errors.map(errorItem => {
        const field = errorItem.path.join('.')
        return `${field}: ${errorItem.message}`
      })

      return NextResponse.json(
        {
          error: "Données invalides",
          message: errorMessages.join(', '),
          details: err.errors
        },
        { status: 400 }
      )
    }

    // Erreur inattendue
    console.error("Erreur inattendue lors de l'envoi:", err)
    return NextResponse.json(
      {
        error: "Erreur lors du traitement de votre message",
        message: err instanceof Error ? err.message : "Erreur inconnue"
      },
      { status: 500 }
    )
  }
}
