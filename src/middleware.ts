import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// Configuración de next-intl
const intlMiddleware = createIntlMiddleware(routing)

export function middleware(req: NextRequest) {
  // Ejecutar primero el middleware de next-intl
  const intlResponse = intlMiddleware(req)
  if (intlResponse) return intlResponse

  // Lógica de autenticación para /admin
  const token = req.cookies.get('supabase-auth-token')

  if (!token && req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/auth', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
}
