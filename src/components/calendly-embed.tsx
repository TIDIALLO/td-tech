"use client"

import { useEffect, useState } from "react"

declare global {
  interface Window {
    Calendly: {
      initInlineWidget: (options: {
        url: string
        parentElement: HTMLElement
        prefill?: Record<string, unknown>
        utm?: Record<string, string>
      }) => void
    }
  }
}

interface CalendlyEmbedProps {
  url: string
  className?: string
}

export function CalendlyEmbed({ url, className }: CalendlyEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Vérifier si le script Calendly est déjà chargé
    const existingScript = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    )

    if (!existingScript) {
      // Charger le script Calendly
      const script = document.createElement("script")
      script.src = "https://assets.calendly.com/assets/external/widget.js"
      script.async = true
      script.onload = () => setIsLoading(false)
      document.body.appendChild(script)
    } else {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isLoading) return

    // Initialiser le widget Calendly une fois le script chargé
    const initCalendly = () => {
      if (window.Calendly) {
        const calendlyElement = document.getElementById("calendly-inline-widget")
        if (calendlyElement) {
          // Nettoyer le contenu précédent si nécessaire
          calendlyElement.innerHTML = ""
          
          window.Calendly.initInlineWidget({
            url: url,
            parentElement: calendlyElement,
            prefill: {},
            utm: {},
          })
        }
      } else {
        // Réessayer après un court délai si Calendly n'est pas encore chargé
        setTimeout(initCalendly, 100)
      }
    }

    // Attendre que le DOM soit prêt
    if (document.readyState === "complete") {
      initCalendly()
    } else {
      window.addEventListener("load", initCalendly)
      return () => window.removeEventListener("load", initCalendly)
    }
  }, [url, isLoading])

  return (
    <div className="w-full">
      {isLoading && (
        <div className="flex items-center justify-center h-[700px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB] mx-auto mb-4"></div>
            <p className="text-muted-foreground">Chargement du calendrier...</p>
          </div>
        </div>
      )}
      <div
        id="calendly-inline-widget"
        className={className}
        style={{ minWidth: "320px", height: "700px" }}
      />
    </div>
  )
}

