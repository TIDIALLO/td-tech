"use client";

import { useEffect, useCallback, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface TrackEventOptions {
  type?: "CLICK" | "SCROLL" | "FORM_SUBMIT" | "CONVERSION" | "CUSTOM";
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  metadata?: Record<string, unknown>;
}

// Hook pour tracker les événements manuellement
export function useAnalytics() {
  const trackEvent = useCallback(async (options: TrackEventOptions) => {
    try {
      await fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: options.type || "CUSTOM",
          path: window.location.pathname,
          ...options,
        }),
      });
    } catch (error) {
      console.error("Failed to track event:", error);
    }
  }, []);

  const trackConversion = useCallback(
    async (type: string, value?: number, metadata?: Record<string, unknown>) => {
      await trackEvent({
        type: "CONVERSION",
        category: type,
        value,
        metadata,
      });
    },
    [trackEvent]
  );

  const trackClick = useCallback(
    async (label: string, category?: string) => {
      await trackEvent({
        type: "CLICK",
        category: category || "button",
        action: "click",
        label,
      });
    },
    [trackEvent]
  );

  return { trackEvent, trackConversion, trackClick };
}

// Composant de tracking automatique des pages
export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPath = useRef<string>("");
  const startTime = useRef<number>(Date.now());

  // Track la durée quand on quitte la page
  const trackDuration = useCallback(async () => {
    if (!lastTrackedPath.current) return;

    const duration = Math.round((Date.now() - startTime.current) / 1000);

    try {
      await fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "PAGE_VIEW",
          path: lastTrackedPath.current,
          duration,
        }),
        keepalive: true, // Important pour les requêtes avant unload
      });
    } catch {
      // Silently fail on page unload
    }
  }, []);

  // Track une nouvelle page vue
  const trackPageView = useCallback(async () => {
    const currentPath = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    // Éviter les doublons
    if (currentPath === lastTrackedPath.current) return;

    // Si on avait une page précédente, envoyer la durée
    if (lastTrackedPath.current) {
      await trackDuration();
    }

    // Mettre à jour la référence et le temps
    lastTrackedPath.current = currentPath;
    startTime.current = Date.now();

    // Récupérer les UTM params
    const utmSource = searchParams?.get("utm_source") || undefined;
    const utmMedium = searchParams?.get("utm_medium") || undefined;
    const utmCampaign = searchParams?.get("utm_campaign") || undefined;

    try {
      await fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "PAGE_VIEW",
          path: pathname,
          title: document.title,
          referrer: document.referrer || undefined,
          utmSource,
          utmMedium,
          utmCampaign,
        }),
      });
    } catch (error) {
      console.error("Failed to track page view:", error);
    }
  }, [pathname, searchParams, trackDuration]);

  // Track au changement de page
  useEffect(() => {
    trackPageView();
  }, [trackPageView]);

  // Track la durée quand on quitte
  useEffect(() => {
    const handleBeforeUnload = () => {
      trackDuration();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [trackDuration]);

  // Track les clics sur les liens externes
  useEffect(() => {
    const handleClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link && link.href) {
        const isExternal = !link.href.startsWith(window.location.origin);
        const isDownload = link.hasAttribute("download");

        if (isExternal || isDownload) {
          try {
            await fetch("/api/analytics/track", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                type: "CLICK",
                category: isDownload ? "download" : "external_link",
                action: "click",
                label: link.href,
                path: pathname,
              }),
            });
          } catch {
            // Continue with navigation
          }
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  // Ce composant ne rend rien visuellement
  return null;
}

// Composant wrapper pour Suspense (nécessaire pour useSearchParams)
export function Analytics() {
  return <AnalyticsTracker />;
}
