"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type ConsentValue = "accepted" | "rejected" | null

const STORAGE_KEY = "cookie-consent"

type ConsentContextValue = {
  consent: ConsentValue
  setConsent: (value: ConsentValue) => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<ConsentValue>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === "accepted" || stored === "rejected") {
      setConsentState(stored)
    }
    setHydrated(true)
  }, [])

  const setConsent = (value: ConsentValue) => {
    setConsentState(value)
    if (value === null) {
      window.localStorage.removeItem(STORAGE_KEY)
    } else {
      window.localStorage.setItem(STORAGE_KEY, value)
    }
  }

  // Avant l'hydratation on ne connaît pas encore le choix stocké : ne rien afficher/charger
  // évite un flash du bandeau ou un chargement prématuré de GA4.
  const value = hydrated ? consent : "rejected"

  return (
    <ConsentContext.Provider value={{ consent: value, setConsent }}>
      {children}
    </ConsentContext.Provider>
  )
}

export function useCookieConsent() {
  const ctx = useContext(ConsentContext)
  if (!ctx) {
    throw new Error("useCookieConsent doit être utilisé dans un CookieConsentProvider")
  }
  return ctx
}
