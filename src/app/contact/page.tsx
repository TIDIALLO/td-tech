"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"
import { useState } from "react"

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
        // Afficher le message d'erreur spécifique de l'API
        const errorMessage = result.message || result.error || "Erreur lors de l'envoi du message"
        setError(errorMessage)
        return
      }

      setSuccess(true)
      setError("")
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
      <main className="min-h-screen">
        <section className="border-b bg-muted/50 py-12">
          <div className="container">
            <h1 className="mb-4 text-4xl font-bold">Contact</h1>
            <p className="text-lg text-muted-foreground">
              Une question ? Un projet ? N&apos;hésitez pas à me contacter
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-5xl">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Envoyez-moi un message</CardTitle>
                    <CardDescription>
                      Je vous répondrai dans les plus brefs délais
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nom complet</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Votre nom"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="votre@email.com"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Sujet</Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Sujet de votre message"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message <span className="text-muted-foreground text-xs">(minimum 5 caractères)</span></Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Votre message... (minimum 5 caractères)"
                          rows={6}
                          required
                          minLength={5}
                        />
                      </div>

                      {success && (
                        <div className="rounded-md bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400">
                          Message envoyé avec succès ! Je vous répondrai bientôt.
                        </div>
                      )}

                      {error && (
                        <div className="rounded-md bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
                          {error}
                        </div>
                      )}

                      <Button type="submit" disabled={loading} className="w-full">
                        {loading ? "Envoi en cours..." : "Envoyer le message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Email</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <a
                      href="mailto:contact@tidianediallo.com"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      contact@tidianediallo.com
                    </a>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Téléphone</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      +33 X XX XX XX XX
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Localisation</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      France
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

