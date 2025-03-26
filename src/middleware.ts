import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextRequest, NextResponse } from 'next/server'

const handleI18nRouting = createMiddleware(routing)

export async function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('is_logged_in')?.value === 'true'
  const { pathname } = request.nextUrl
  const locale = pathname.split('/')[1]

  if (!isLoggedIn && pathname.startsWith(`/${locale}/admin`)) {
    return NextResponse.redirect(new URL(`/${locale}/auth`, request.url))
  }

  if (isLoggedIn && pathname.startsWith(`/${locale}/auth`)) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  return handleI18nRouting(request)
}

export const config = {
  matcher: ['/:locale((?!api|trpc|_next|_vercel|.*\\..*).*)']
}
