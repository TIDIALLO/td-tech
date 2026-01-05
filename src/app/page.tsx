import type { Metadata } from "next"
import HomeClient from "@/app/_components/home-client"

export const metadata: Metadata = {
  title: "Accueil",
  description:
    "Synap6ia — développement web (Next.js), automatisations n8n, agents IA et formations. Un seul objectif : livrer vite, propre, mesurable.",
}

export default function HomePage() {
  return <HomeClient />
}

