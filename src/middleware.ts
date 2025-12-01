import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Middleware léger qui vérifie juste les cookies de session
// L'authentification complète est gérée dans les layouts/pages
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const authToken = req.cookies.get("authjs.session-token") || req.cookies.get("__Secure-authjs.session-token")

  // Protected admin routes - rediriger vers signin si pas de token
  // La vérification complète du rôle ADMIN se fait dans le layout
  if (pathname.startsWith("/admin")) {
    if (!authToken) {
      return NextResponse.redirect(new URL("/auth/signin", req.url))
    }
  }

  // Protected course routes
  if (pathname.startsWith("/formations") && pathname.includes("/cours")) {
    if (!authToken) {
      return NextResponse.redirect(new URL("/auth/signin", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

