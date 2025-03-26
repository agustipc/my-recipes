import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const isLogged = req.cookies.get('is_logged_in')?.value

  if (isLogged === 'true' && req.nextUrl.pathname.includes('/auth')) {
    const locale = req.nextUrl.pathname.split('/')[1]
    return NextResponse.redirect(new URL(`/${locale}`, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:locale((?!api|trpc|_next|_vercel|.*\\..*).*)']
}
