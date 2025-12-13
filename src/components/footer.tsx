import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur-sm">
      <div className="container py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo Synap6ia avec texte */}
          <div className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 group-hover:scale-105">
            <span className="text-white font-bold text-lg">S6</span>
            </div>
            <span className="text-lg font-bold flex items-center gap-0.5">
              <span className="text-white">Synap</span>
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">6ia</span>
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:contact@tidianediallo.com"
              className="p-2.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p>© {new Date().getFullYear()} <span className="font-semibold text-foreground">Synap6ia</span>. Tous droits réservés.</p>
            <p className="mt-1 text-xs opacity-70">Sous-titrage : Sette Inc. 2021</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

