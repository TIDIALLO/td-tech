import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { resend } from "@/lib/resend"
import { transporter } from "@/lib/nodemailer"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").trim(),
  email: z.string().email("Email invalide").trim().toLowerCase(),
  subject: z.string().optional().transform(val => val?.trim() || undefined),
  message: z.string().min(5, "Le message doit contenir au moins 5 caractères").trim(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // Préparer le contenu de l'email
    const subject = validatedData.subject || "Nouveau message de contact"
    
    // Email HTML formaté
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
                <p><span class="label">Nom:</span> ${validatedData.name}</p>
                <p><span class="label">Email:</span> <a href="mailto:${validatedData.email}">${validatedData.email}</a></p>
                ${validatedData.subject ? `<p><span class="label">Sujet:</span> ${validatedData.subject}</p>` : ''}
              </div>
              <div class="message">
                <p><span class="label">Message:</span></p>
                <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
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

Nom: ${validatedData.name}
Email: ${validatedData.email}
${validatedData.subject ? `Sujet: ${validatedData.subject}` : ''}

Message:
${validatedData.message}

---
Ce message a été envoyé depuis le formulaire de contact de votre site web.
    `.trim()

    // PRIORITÉ 1 : Envoyer l'email (Gmail SMTP ou Resend)
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

    // PRIORITÉ 2 : Sauvegarder en base de données (optionnel, ne bloque pas si échec)
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

    // Retourner le résultat
    if (emailSent) {
      return NextResponse.json(
        { 
          message: "Message envoyé avec succès",
          emailId: emailId,
          dbSaved: dbSaved,
          // Info pour l'utilisateur si DB non disponible
          ...(dbSaved === false && { 
            info: "Message envoyé par email. La sauvegarde en base de données n'est pas disponible actuellement."
          })
        },
        { status: 200 }
      )
    } else {
      // Si l'email n'a pas pu être envoyé, analyser l'erreur
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

  } catch (error) {
    console.error("Erreur lors de l'envoi:", error)
    
    if (error instanceof z.ZodError) {
      // Formater les erreurs pour un affichage plus clair
      const errorMessages = error.errors.map(err => {
        const field = err.path.join('.')
        return `${field}: ${err.message}`
      })
      
      return NextResponse.json(
        { 
          error: "Données invalides", 
          message: errorMessages.join(', '),
          details: error.errors 
        },
        { status: 400 }
      )
    }

    // Erreur inattendue
    return NextResponse.json(
      { 
        error: "Erreur lors du traitement de votre message",
        message: error instanceof Error ? error.message : "Erreur inconnue"
      },
      { status: 500 }
    )
  }
}
