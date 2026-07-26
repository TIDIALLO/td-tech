"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    JokkoWidget?: {
      chatbotId?: string
      tenantId?: string
      configId?: string
    }
  }
}

export function JokkoWidget() {
  useEffect(() => {
    // Évite de charger le script deux fois (Strict Mode / navigation)
    if (document.querySelector('script[src*="api.jokko.chat/widget/widget.js"]')) {
      return
    }

    // Config Jokko avant le chargement du script
    const w = (window.JokkoWidget = window.JokkoWidget || {})
    w.chatbotId = "2029dab4-38b8-4d74-a98e-cd679a4f7516"
    w.tenantId = "ad8441c4-0505-4416-9718-09742fd8813b"
    w.configId = "c1f012b2-317a-4b4e-8fd3-35f70d49b90f"

    const script = document.createElement("script")
    script.src =
      "https://api.jokko.chat/widget/widget.js?v=" +
      encodeURIComponent("c1f012b2-317a-4b4e-8fd3-35f70d49b90f")
    script.async = true
    document.head.appendChild(script)
  }, [])

  return null
}
