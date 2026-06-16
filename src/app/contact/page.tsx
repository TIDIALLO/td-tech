"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { useAnalytics } from "@/components/analytics/tracker"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const { trackConversion } = useAnalytics()

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

      // Tracker la conversion pour l'analytics
      await trackConversion("contact_form", undefined, {
        subject: subject || "Sans sujet",
      })

      if (result.info) {
        setError(result.info)
      } else if (result.dbSaved === false) {
        setError("ℹ️ Message envoyé par email. La sauvegarde en base de données n'est pas disponible actuellement.")
      } else {
        setError("")
      }

      ;(e.target as HTMLFormElement).reset()
    } catch (err) {
      console.error("Erreur lors de l'envoi du formulaire:", err)
      setError("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen relative overflow-hidden bg-slate-950">
        <AuroraBackground showRadialGradient className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(37,99,235,0.08),transparent_45%),radial-gradient(circle_at_70%_30%,rgba(16,185,129,0.06),transparent_42%)]" />
          <div className="absolute inset-0 opacity-60 blur-3xl bg-gradient-to-br from-primary/20 via-sky-400/10 to-emerald-300/10" />
        </AuroraBackground>
        <div className="relative z-10">

        {/* Header Section */}
        <section className="relative border-b border-slate-200/70 dark:border-slate-800/80 py-12 md:py-16">
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-5"
            >
              <div className="flex flex-wrap justify-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white text-slate-800 px-4 py-2 text-xs font-semibold shadow-sm ring-1 ring-slate-200/70 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-800">
                  Réponse sous 24h
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0ea5e9]/10 text-[#0ea5e9] px-4 py-2 text-xs font-semibold ring-1 ring-[#0ea5e9]/30">
                  Rendez-vous visio ou téléphone
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#2563EB]/10 text-[#2563EB] px-4 py-2 text-xs font-semibold ring-1 ring-[#2563EB]/30">
                  Projets web, automatisations, IA, formations
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                Contact
              </h1>
              <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
                Expliquez votre besoin, je reviens vers vous avec un plan clair (étapes, délais, budget) et une première recommandation en moins de 24h.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative py-12 md:py-16">
          <div className="container relative z-10 max-w-5xl mx-auto">
            <div className="grid gap-6 md:gap-8 lg:grid-cols-2 items-stretch">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="h-full border border-white/10 bg-slate-950/70 dark:bg-slate-900/80 backdrop-blur-md shadow-2xl">
                  <CardHeader className="space-y-2 pb-3">
                    <CardTitle className="text-2xl text-white">Brief express</CardTitle>
                    <CardDescription className="text-base text-slate-200 leading-relaxed">
                      Donnez les éléments clés : contexte, objectifs, délais. Je vous réponds sous 24h avec un plan d&apos;attaque.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-semibold text-slate-100">
                            Nom complet
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Prénom Nom"
                            required
                            className="h-11 bg-white text-slate-900 placeholder-slate-500 border-slate-200"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-semibold text-slate-100">
                            Email
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="vous@entreprise.com"
                            required
                            className="h-11 bg-white text-slate-900 placeholder-slate-500 border-slate-200"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-sm font-semibold text-slate-100">
                          Sujet <span className="text-slate-300 font-normal">(optionnel)</span>
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Refonte site, automatisation n8n, agent IA, formation..."
                          className="h-11 bg-white text-slate-900 placeholder-slate-500 border-slate-200"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-sm font-semibold text-slate-100">
                          Message <span className="text-slate-300 text-xs font-normal">(minimum 5 caractères)</span>
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Décrivez le besoin, vos objectifs, la deadline et vos contraintes (tech, budget, équipe)."
                          rows={6}
                          required
                          minLength={5}
                          className="resize-none bg-white text-slate-900 placeholder-slate-500 border-slate-200"
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

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-slate-300">
                          Temps de réponse moyen : &lt; 24h. Possibilité d&apos;échange visio ou audit rapide.
                        </p>
                        <Button 
                          type="submit" 
                          disabled={loading} 
                          className="sm:w-auto w-full h-12 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-base font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#2563EB]/40"
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
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact / Brand panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="relative h-full overflow-hidden text-white shadow-2xl bg-gradient-to-br from-[#0ea5e9] via-[#2563EB] to-[#1D4ED8]">
                  <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.22),transparent_35%)]" />
                  <CardHeader className="relative pb-3">
                    <CardTitle className="text-2xl">Échange direct</CardTitle>
                    <CardDescription className="text-slate-100 text-base leading-relaxed">
                      Besoin d&apos;un créneau rapide ? Contact direct par email ou téléphone, ou partagez des pièces jointes pour que je comprenne rapidement votre contexte.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative space-y-6">
                    <div className="grid gap-3">
                      <div className="flex items-start gap-3 rounded-lg bg-white/10 p-3">
                        <div className="rounded-full bg-white/20 p-2">
                          <Mail className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">Email</p>
                          <a
                            href="mailto:diallotidiane014@gmail.com"
                            className="text-sm text-slate-100/80 hover:text-white transition-colors"
                          >
                            diallotidiane014@gmail.com
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 rounded-lg bg-white/10 p-3">
                        <div className="rounded-full bg-white/20 p-2">
                          <Phone className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">Téléphone / WhatsApp</p>
                          <a
                            href="tel:+221777330182"
                            className="text-sm text-slate-100/80 hover:text-white transition-colors"
                          >
                            (+221) 77 733 01 82
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 rounded-lg bg-white/10 p-3">
                        <div className="rounded-full bg-white/20 p-2">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">Zones</p>
                          <p className="text-sm text-slate-100/80">Remote • France • Sénégal</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">Réponse &lt; 24h</span>
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">Lun–Ven : 8h–18h</span>
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">Sam : 9h–13h</span>
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">Visio ou présentiel</span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <Button asChild variant="secondary" className="w-full bg-white text-[#2563EB] hover:bg-white/90">
                        <a href="mailto:diallotidiane014@gmail.com">Écrire un email</a>
                      </Button>
                      <Button asChild variant="outline" className="w-full border-white/50 text-white hover:bg-white/10">
                        <a href="tel:+221777330182">Appeler maintenant</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
