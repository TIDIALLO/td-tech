import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Synap6ia | Tidiane Diallo",
    template: "%s | Synap6ia",
  },
  description:
    "Synap6ia — développement web (Next.js), automatisations n8n, agents IA et formations. Livraison rapide, code production, SEO et performance.",
  keywords: [
    "Tidiane Diallo",
    "Synap6ia",
    "développeur fullstack",
    "Next.js",
    "automatisation IA",
    "n8n",
    "agents IA",
    "formations",
    "web development",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Synap6ia",
    title: "Synap6ia | Tidiane Diallo",
    description:
      "Développement web, automatisations n8n, agents IA et formations. Des solutions digitales modernes, fiables et mesurables.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Synap6ia | Tidiane Diallo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Synap6ia | Tidiane Diallo",
    description:
      "Développement web, automatisations n8n, agents IA et formations. Des solutions digitales modernes, fiables et mesurables.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

