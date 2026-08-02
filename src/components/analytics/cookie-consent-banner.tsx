"use client"

import { Cookie } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCookieConsent } from "./cookie-consent-provider"

export function CookieConsentBanner() {
  const { consent, setConsent } = useCookieConsent()

  if (consent !== null) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consentement aux cookies"
      className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-xl border border-border/60 bg-background/95 p-5 shadow-2xl backdrop-blur sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Cookie className="h-5 w-5" />
          </div>
          <p className="text-sm text-foreground/85">
            Nous utilisons des cookies de mesure d&apos;audience (Google Analytics) pour comprendre comment le site
            est utilisé. Ils ne sont activés qu&apos;avec votre accord.
          </p>
        </div>
        <div className="flex flex-shrink-0 gap-2 sm:flex-col md:flex-row">
          <Button variant="outline" className="flex-1 sm:flex-none" onClick={() => setConsent("rejected")}>
            Refuser
          </Button>
          <Button className="flex-1 sm:flex-none" onClick={() => setConsent("accepted")}>
            Accepter
          </Button>
        </div>
      </div>
    </div>
  )
}
