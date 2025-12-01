import { NextResponse } from "next/server"
import { transporter } from "@/lib/nodemailer"
import { z } from "zod"

const bookingSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").trim(),
  email: z.string().email("Email invalide").trim().toLowerCase(),
  date: z.string().min(1, "La date est requise"),
  time: z.string().min(1, "L'heure est requise"),
  timezone: z.string().optional().default("Europe/Paris"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = bookingSchema.parse(body)

    // Créer un lien Google Meet (génération simple)
    const googleMeetLink = `https://meet.google.com/new`

    // Créer un lien Google Calendar avec les détails de l'événement
    const startDate = new Date(`${validatedData.date}T${validatedData.time}`)
    const endDate = new Date(startDate.getTime() + 30 * 60 * 1000) // 30 minutes

    const formatDateForGoogleCalendar = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    }

    const googleCalendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Consultation avec ${encodeURIComponent(validatedData.name)}&dates=${formatDateForGoogleCalendar(startDate)}/${formatDateForGoogleCalendar(endDate)}&details=Consultation de 30 minutes avec ${encodeURIComponent(validatedData.name)} (${encodeURIComponent(validatedData.email)})&location=${encodeURIComponent(googleMeetLink)}`

    // Préparer le contenu de l'email
    const subject = `Nouvelle réservation de consultation - ${validatedData.name}`
    
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
            .button { display: inline-block; padding: 12px 24px; background: #2563EB; color: white; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
            .button:hover { background: #1D4ED8; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Nouvelle Réservation de Consultation</h1>
            </div>
            <div class="content">
              <div class="info">
                <p><span class="label">Nom:</span> ${validatedData.name}</p>
                <p><span class="label">Email:</span> <a href="mailto:${validatedData.email}">${validatedData.email}</a></p>
                <p><span class="label">Date:</span> ${validatedData.date}</p>
                <p><span class="label">Heure:</span> ${validatedData.time}</p>
                <p><span class="label">Fuseau horaire:</span> ${validatedData.timezone}</p>
              </div>
              
              <div style="margin: 20px 0; text-align: center;">
                <a href="${googleCalendarLink}" class="button" target="_blank">Ajouter à Google Calendar</a>
                <a href="${googleMeetLink}" class="button" target="_blank">Créer Google Meet</a>
              </div>
              
              <div class="footer">
                <p>Cette réservation a été créée via le formulaire de contact du site web.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    const textContent = `
Nouvelle Réservation de Consultation

Nom: ${validatedData.name}
Email: ${validatedData.email}
Date: ${validatedData.date}
Heure: ${validatedData.time}
Fuseau horaire: ${validatedData.timezone}

Ajouter à Google Calendar: ${googleCalendarLink}
Créer Google Meet: ${googleMeetLink}
    `

    // Envoyer l'email
    let emailSent = false
    let emailError = null
    const useGmailSmtp = process.env.USE_GMAIL_SMTP === 'true'

    try {
      if (useGmailSmtp && process.env.GMAIL_APP_PASSWORD) {
        // Utiliser Gmail SMTP
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
        console.log("✅ Email de réservation envoyé via Gmail SMTP:", info.messageId)
        
        // Envoyer aussi un email de confirmation au client
        try {
          const confirmationSubject = `Confirmation de votre réservation - ${validatedData.date} à ${validatedData.time}`
          const confirmationHtml = `
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
                  .button { display: inline-block; padding: 12px 24px; background: #2563EB; color: white; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1 style="margin: 0;">Confirmation de Réservation</h1>
                  </div>
                  <div class="content">
                    <p>Bonjour ${validatedData.name},</p>
                    <p>Votre réservation de consultation a été confirmée avec succès.</p>
                    <div class="info">
                      <p><strong>Date:</strong> ${validatedData.date}</p>
                      <p><strong>Heure:</strong> ${validatedData.time}</p>
                      <p><strong>Fuseau horaire:</strong> ${validatedData.timezone}</p>
                    </div>
                    <div style="margin: 20px 0; text-align: center;">
                      <a href="${googleCalendarLink}" class="button" target="_blank">Ajouter à Google Calendar</a>
                    </div>
                    <p>Nous vous contacterons bientôt pour confirmer les détails de la réunion.</p>
                    <p>Cordialement,<br>Tidiane Diallo</p>
                  </div>
                </div>
              </body>
            </html>
          `
          
          await transporter.sendMail({
            from: `"Tidiane Diallo" <${process.env.GMAIL_USER || 'diallotidiane014@gmail.com'}>`,
            to: validatedData.email,
            subject: confirmationSubject,
            html: confirmationHtml,
            text: `Confirmation de votre réservation pour le ${validatedData.date} à ${validatedData.time}`,
          })
          console.log("✅ Email de confirmation envoyé au client")
        } catch (confirmationErr) {
          console.error("⚠️ Erreur lors de l'envoi de l'email de confirmation:", confirmationErr)
          // Ne pas faire échouer la requête si l'email de confirmation échoue
        }
      } else {
        // Utiliser Resend
        const { resend } = await import("@/lib/resend")
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
        
        const emailResult = await resend.emails.send({
          from: fromEmail,
          to: ['diallotidiane014@gmail.com'],
          replyTo: validatedData.email,
          subject: subject,
          html: htmlContent,
          text: textContent,
        })

        if (emailResult.error) {
          throw new Error(emailResult.error.message || "Erreur lors de l'envoi de l'email")
        }

        emailSent = true
        console.log("✅ Email de réservation envoyé via Resend:", emailResult.data?.id)
        
        // Envoyer aussi un email de confirmation au client via Resend
        try {
          const confirmationSubject = `Confirmation de votre réservation - ${validatedData.date} à ${validatedData.time}`
          const confirmationHtml = `
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
                  .button { display: inline-block; padding: 12px 24px; background: #2563EB; color: white; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1 style="margin: 0;">Confirmation de Réservation</h1>
                  </div>
                  <div class="content">
                    <p>Bonjour ${validatedData.name},</p>
                    <p>Votre réservation de consultation a été confirmée avec succès.</p>
                    <div class="info">
                      <p><strong>Date:</strong> ${validatedData.date}</p>
                      <p><strong>Heure:</strong> ${validatedData.time}</p>
                      <p><strong>Fuseau horaire:</strong> ${validatedData.timezone}</p>
                    </div>
                    <div style="margin: 20px 0; text-align: center;">
                      <a href="${googleCalendarLink}" class="button" target="_blank">Ajouter à Google Calendar</a>
                    </div>
                    <p>Nous vous contacterons bientôt pour confirmer les détails de la réunion.</p>
                    <p>Cordialement,<br>Tidiane Diallo</p>
                  </div>
                </div>
              </body>
            </html>
          `
          
          const confirmationResult = await resend.emails.send({
            from: fromEmail,
            to: [validatedData.email],
            subject: confirmationSubject,
            html: confirmationHtml,
          })
          
          if (confirmationResult.error) {
            console.error("⚠️ Erreur lors de l'envoi de l'email de confirmation:", confirmationResult.error)
          } else {
            console.log("✅ Email de confirmation envoyé au client via Resend")
          }
        } catch (confirmationErr) {
          console.error("⚠️ Erreur lors de l'envoi de l'email de confirmation:", confirmationErr)
        }
      }
    } catch (err) {
      emailError = err
      console.error("❌ Erreur lors de l'envoi de l'email de réservation:", err)
      // Ne pas faire échouer la requête, mais logger l'erreur
    }

    // Retourner une réponse même si l'email a échoué (pour ne pas bloquer l'UX)
    if (!emailSent && emailError) {
      console.error("⚠️ L'email n'a pas pu être envoyé, mais la réservation a été enregistrée")
      return NextResponse.json(
        { 
          success: true, 
          message: "Réservation enregistrée, mais l'email n'a pas pu être envoyé. Veuillez nous contacter directement.",
          warning: "Email non envoyé",
          googleCalendarLink,
          googleMeetLink
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Réservation envoyée avec succès",
        googleCalendarLink,
        googleMeetLink
      },
      { status: 200 }
    )
  } catch (err) {
    console.error("❌ Erreur réservation:", err)
    
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: err.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Erreur lors de l'envoi de la réservation" },
      { status: 500 }
    )
  }
}

