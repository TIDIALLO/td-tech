"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Bot, MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type ProjectType = "web" | "automation" | "agent" | "training"
type Timeline = "urgent" | "month" | "quarter" | "explore"
type Budget = "starter" | "growth" | "scale" | "unknown"

const projectTypeOptions: Array<{ label: string; value: ProjectType }> = [
  { label: "Site / app web", value: "web" },
  { label: "Automatisation n8n", value: "automation" },
  { label: "Agent IA metier", value: "agent" },
  { label: "Formation equipe", value: "training" },
]

const timelineOptions: Array<{ label: string; value: Timeline }> = [
  { label: "Demarrage urgent", value: "urgent" },
  { label: "Dans le mois", value: "month" },
  { label: "Dans 2-3 mois", value: "quarter" },
  { label: "Je me renseigne", value: "explore" },
]

const budgetOptions: Array<{ label: string; value: Budget }> = [
  { label: "< 2 000 EUR", value: "starter" },
  { label: "2 000 - 10 000 EUR", value: "growth" },
  { label: "> 10 000 EUR", value: "scale" },
  { label: "A definir", value: "unknown" },
]

const recommendationByProject: Record<
  ProjectType,
  { title: string; href: string; note: string }
> = {
  web: {
    title: "Creation d'applications web",
    href: "/services",
    note: "Focus: performance, SEO, UX et architecture production.",
  },
  automation: {
    title: "Automatisation n8n",
    href: "/services/automatisation",
    note: "Focus: workflows fiables, APIs, logs et monitoring.",
  },
  agent: {
    title: "Agents IA",
    href: "/services/agents-ia",
    note: "Focus: RAG metier, securite, guardrails et observabilite.",
  },
  training: {
    title: "Formations",
    href: "/formations",
    note: "Focus: cas concrets et autonomie rapide des equipes.",
  },
}

export function QualificationAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [projectType, setProjectType] = useState<ProjectType | null>(null)
  const [timeline, setTimeline] = useState<Timeline | null>(null)
  const [budget, setBudget] = useState<Budget | null>(null)

  const step = projectType ? (timeline ? (budget ? 3 : 2) : 1) : 0

  const recommendation = useMemo(() => {
    if (!projectType) return null
    return recommendationByProject[projectType]
  }, [projectType])

  const contactHref = useMemo(() => {
    const params = new URLSearchParams()
    if (projectType) params.set("project", projectType)
    if (timeline) params.set("timeline", timeline)
    if (budget) params.set("budget", budget)
    const qs = params.toString()
    return qs ? `/contact?${qs}` : "/contact"
  }, [projectType, timeline, budget])

  const reset = () => {
    setProjectType(null)
    setTimeline(null)
    setBudget(null)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <Card className="w-[360px] max-w-[calc(100vw-2rem)] shadow-2xl border-primary/25">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Bot className="h-4 w-4 text-primary" />
                  Agent de qualification
                </CardTitle>
                <CardDescription>
                  3 questions rapides pour vous orienter vers le bon service.
                </CardDescription>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
                aria-label="Fermer l'assistant"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {step === 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Quel est votre besoin principal ?</p>
                {projectTypeOptions.map((option) => (
                  <Button
                    key={option.value}
                    type="button"
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setProjectType(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Quel est votre horizon ?</p>
                {timelineOptions.map((option) => (
                  <Button
                    key={option.value}
                    type="button"
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setTimeline(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
                <Button type="button" variant="ghost" onClick={reset} className="w-full">
                  Recommencer
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Quel budget envisagez-vous ?</p>
                {budgetOptions.map((option) => (
                  <Button
                    key={option.value}
                    type="button"
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setBudget(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
                <Button type="button" variant="ghost" onClick={reset} className="w-full">
                  Recommencer
                </Button>
              </div>
            )}

            {step === 3 && recommendation && (
              <div className="space-y-3">
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                  <p className="text-xs uppercase tracking-wide text-primary">Suggestion</p>
                  <p className="text-sm font-semibold">{recommendation.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{recommendation.note}</p>
                </div>

                <div className="grid gap-2">
                  <Link href={recommendation.href}>
                    <Button className="w-full">Voir le service recommande</Button>
                  </Link>
                  <Link href={contactHref}>
                    <Button variant="outline" className="w-full">
                      Demander un audit rapide
                    </Button>
                  </Link>
                  <Button type="button" variant="ghost" onClick={reset}>
                    Refaire la qualification
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Button
          type="button"
          size="lg"
          onClick={() => setIsOpen(true)}
          className="rounded-full shadow-xl gap-2"
          aria-label="Ouvrir l'agent de qualification"
        >
          <MessageCircle className="h-4 w-4" />
          Qualifier mon projet
        </Button>
      )}
    </div>
  )
}
