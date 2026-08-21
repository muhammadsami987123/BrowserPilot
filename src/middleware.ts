import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth

  const protectedPrefixes = ['/dashboard', '/tasks', '/workspace']
  const isProtected = protectedPrefixes.some((p) => pathname.startsWith(p))

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (isLoggedIn && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|public|.*\\.png$).*)'],
}
