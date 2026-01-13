import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics/tracker";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tidiane Diallo - Portfolio & Formations",
  description: "Développeur Fullstack, Expert en Automatisation IA et N8N. Découvrez mes projets, services et formations.",
  keywords: ["développeur fullstack", "automatisation IA", "N8N", "formations", "web development"],
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
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}

