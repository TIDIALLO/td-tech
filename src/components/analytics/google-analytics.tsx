"use client"

import Script from "next/script"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"
import { useCookieConsent } from "./cookie-consent-provider"

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export function GoogleAnalytics() {
  const { consent } = useCookieConsent()
  const pathname = usePathname()
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Le premier chargement de page est déjà compté par gtag('config', ...) au démarrage du script.
    // On ne veut suivre ici que les navigations suivantes (App Router ne recharge pas la page).
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (consent === "accepted" && GA_MEASUREMENT_ID && typeof window.gtag === "function") {
      window.gtag("event", "page_view", { page_path: pathname })
    }
  }, [pathname, consent])

  if (consent !== "accepted" || !GA_MEASUREMENT_ID) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
          window.gtag = gtag;
        `}
      </Script>
    </>
  )
}
