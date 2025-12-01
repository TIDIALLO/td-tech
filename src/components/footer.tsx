import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur-sm">
      <div className="container py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo TDTech avec texte */}
          <div className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#3B82F6] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-lg">TD</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-[#2563EB] to-[#3B82F6] bg-clip-text text-transparent">
              TDTech
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg text-muted-foreground hover:text-[#2563EB] hover:bg-[#2563EB]/10 transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg text-muted-foreground hover:text-[#2563EB] hover:bg-[#2563EB]/10 transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:contact@tidianediallo.com"
              className="p-2.5 rounded-lg text-muted-foreground hover:text-[#2563EB] hover:bg-[#2563EB]/10 transition-all duration-300 hover:scale-110"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p>© {new Date().getFullYear()} <span className="font-semibold text-foreground">TDTech</span>. Tous droits réservés.</p>
            <p className="mt-1 text-xs opacity-70">Sous-titrage : Sette Inc. 2021</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

