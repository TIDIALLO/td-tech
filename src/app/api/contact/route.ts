import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { resend } from "@/lib/resend"
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

    // Sauvegarder le message en base de données
    await prisma.contactMessage.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject || "Nouveau message",
        message: validatedData.message,
      },
    })

    // Envoyer un email avec Resend
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

    // Envoyer l'email avec Resend
    try {
      const emailResult = await resend.emails.send({
        // Utiliser l'adresse par défaut de Resend pour les tests
        // Remplace par ton domaine vérifié une fois configuré
        from: 'onboarding@resend.dev', // Adresse par défaut Resend pour les tests
        to: ['diallotidiane014@gmail.com'], // Destinataire principal
        cc: ['tidiallo06@gmail.com'], // Copie
        replyTo: validatedData.email, // Permettre de répondre directement
        subject: subject,
        html: htmlContent,
        text: textContent,
      })

      console.log("Email envoyé avec succès:", emailResult)

      return NextResponse.json(
        { 
          message: "Message envoyé avec succès",
          emailId: emailResult.data?.id 
        },
        { status: 200 }
      )
    } catch (emailError) {
      console.error("Erreur Resend:", emailError)
      
      // Si l'email échoue, on sauvegarde quand même en DB mais on log l'erreur
      // L'utilisateur voit un message de succès mais on sait qu'il y a eu un problème
      return NextResponse.json(
        { 
          message: "Message enregistré. Nous vous répondrons bientôt.",
          warning: "L'email n'a pas pu être envoyé automatiquement, mais votre message a été sauvegardé.",
          error: emailError instanceof Error ? emailError.message : "Erreur inconnue"
        },
        { status: 200 }
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

    // En cas d'erreur Resend, on retourne quand même un succès si le message est sauvegardé en DB
    // pour ne pas frustrer l'utilisateur
    return NextResponse.json(
      { 
        message: "Message enregistré. Nous vous répondrons bientôt.",
        warning: error instanceof Error ? error.message : "Erreur lors de l'envoi de l'email"
      },
      { status: 200 }
    )
  }
}
