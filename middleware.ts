import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

// List of public routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/auth/callback',
]

// List of auth routes that should redirect to dashboard if already logged in
const authRoutes = [
  '/login',
  '/signup',
  '/forgot-password',
]

export async function middleware(request: NextRequest) {
  try {
    // Create Supabase client with cookies
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req: request, res })
    
    // Check if there's a session
    const { data: { session } } = await supabase.auth.getSession()
    
    const path = request.nextUrl.pathname
    
    // If not logged in and trying to access protected route, redirect to login
    if (!session && !publicRoutes.some(route => path === route || path.startsWith('/api/'))) {
      const redirectUrl = new URL('/login', request.url)
      redirectUrl.searchParams.set('redirect', path)
      return NextResponse.redirect(redirectUrl)
    }
    
    // If logged in and trying to access auth routes, redirect to dashboard
    if (session && authRoutes.some(route => path === route)) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    
    // For all other cases, continue with the request
    return res
  } catch (error) {
    console.error('Middleware error:', error)
    
    // If there's an error, allow the request to continue
    // This prevents locking users out if Supabase is unavailable
    return NextResponse.next()
  }
}

// Match all routes except for static assets, public files, etc.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public directory
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
} 