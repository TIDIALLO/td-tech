import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Td-Tech | Tidiane Diallo - Solutions Digitales & Automatisation IA",
  description: "Développeur Fullstack, Expert en Automatisation IA et N8N. Solutions digitales sur mesure pour propulser votre entreprise.",
  keywords: ["développeur fullstack", "automatisation IA", "N8N", "formations", "web development", "Td-Tech", "Tidiane Diallo"],
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

