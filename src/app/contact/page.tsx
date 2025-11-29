"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name")?.toString().trim() || ""
    const email = formData.get("email")?.toString().trim() || ""
    const subject = formData.get("subject")?.toString().trim() || ""
    const message = formData.get("message")?.toString().trim() || ""

    // Validation côté client
    if (name.length < 2) {
      setError("Le nom doit contenir au moins 2 caractères")
      setLoading(false)
      return
    }

    if (!email || !email.includes("@")) {
      setError("Veuillez entrer une adresse email valide")
      setLoading(false)
      return
    }

    if (message.length < 5) {
      setError("Le message doit contenir au moins 5 caractères")
      setLoading(false)
      return
    }

    const data = {
      name,
      email,
      subject: subject || undefined,
      message,
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        const errorMessage = result.message || result.error || "Erreur lors de l'envoi du message"
        const suggestion = result.suggestion ? ` ${result.suggestion}` : ""
        setError(`${errorMessage}${suggestion}`)
        setSuccess(false)
        return
      }

      setSuccess(true)
      
      if (result.info) {
        setError(result.info)
      } else if (result.dbSaved === false) {
        setError("ℹ️ Message envoyé par email. La sauvegarde en base de données n'est pas disponible actuellement.")
      } else {
        setError("")
      }
      
      ;(e.target as HTMLFormElement).reset()
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-background via-blue-50/20 to-background dark:from-background dark:via-blue-950/5 dark:to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.06),transparent_50%)]" />
        
        {/* Header Section */}
        <section className="relative border-b bg-gradient-to-b from-background via-muted/30 to-background py-12 md:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.08),transparent_50%)]" />
          <div className="container relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="mb-4 text-4xl md:text-5xl font-bold">
                Contact<span className="text-[#2563EB]">ez</span>-moi
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Une question ? Un projet ? N&apos;hésitez pas à me contacter. 
                Je vous répondrai dans les plus brefs délais.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content - Centered */}
        <section className="relative py-12 md:py-16">
          <div className="container max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-8">
              
              {/* Contact Info Cards - Horizontal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <Card className="text-center hover:border-[#2563EB]/50 transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="flex justify-center mb-2">
                      <div className="rounded-full bg-[#2563EB]/10 p-3">
                        <Mail className="h-6 w-6 text-[#2563EB]" />
                      </div>
                    </div>
                    <CardTitle className="text-base">Email</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a
                      href="mailto:diallotidiane014@gmail.com"
                      className="text-sm text-muted-foreground hover:text-[#2563EB] transition-colors"
                    >
                      diallotidiane014@gmail.com
                    </a>
                  </CardContent>
                </Card>

                <Card className="text-center hover:border-[#2563EB]/50 transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="flex justify-center mb-2">
                      <div className="rounded-full bg-[#2563EB]/10 p-3">
                        <Phone className="h-6 w-6 text-[#2563EB]" />
                      </div>
                    </div>
                    <CardTitle className="text-base">Téléphone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a
                      href="tel:+221777330182"
                      className="text-sm text-muted-foreground hover:text-[#2563EB] transition-colors"
                    >
                      (+221) 77 733 01 82
                    </a>
                  </CardContent>
                </Card>

                <Card className="text-center hover:border-[#2563EB]/50 transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="flex justify-center mb-2">
                      <div className="rounded-full bg-[#2563EB]/10 p-3">
                        <MapPin className="h-6 w-6 text-[#2563EB]" />
                      </div>
                    </div>
                    <CardTitle className="text-base">Localisation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Dakar, Sénégal
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Form - Centered */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="w-full"
              >
                <Card className="border hover:border-[#2563EB]/50 transition-all duration-300 shadow-lg">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl mb-2">Envoyez-moi un message</CardTitle>
                    <CardDescription className="text-base">
                      Remplissez le formulaire ci-dessous et je vous répondrai rapidement
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium">
                            Nom complet
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Votre nom"
                            required
                            className="h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium">
                            Email
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="votre@email.com"
                            required
                            className="h-11"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-sm font-medium">
                          Sujet <span className="text-muted-foreground font-normal">(optionnel)</span>
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Sujet de votre message"
                          className="h-11"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-sm font-medium">
                          Message <span className="text-muted-foreground text-xs font-normal">(minimum 5 caractères)</span>
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Votre message..."
                          rows={6}
                          required
                          minLength={5}
                          className="resize-none"
                        />
                      </div>

                      {success && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="rounded-md bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400 border border-green-200 dark:border-green-800"
                        >
                          ✅ Message envoyé avec succès ! Je vous répondrai bientôt.
                        </motion.div>
                      )}

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`rounded-md p-4 text-sm border ${
                            success 
                              ? "bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800" 
                              : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800"
                          }`}
                        >
                          {error}
                        </motion.div>
                      )}

                      <Button 
                        type="submit" 
                        disabled={loading} 
                        className="w-full h-12 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-base font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#2563EB]/50"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Envoi en cours...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="h-4 w-4" />
                            Envoyer le message
                          </span>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
