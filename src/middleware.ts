import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  // Refresh session if expired
  const { data: { session } } = await supabase.auth.getSession();
  
  // Get the pathname from the URL
  const path = req.nextUrl.pathname;
  
  // Define auth pages and protected pages
  const isAuthPage = path === '/login' || path === '/signup';
  const isProtectedPage = path === '/dashboard' || path === '/profile' || path.startsWith('/admin');
  
  // Redirect logic
  if (isAuthPage && session) {
    // Redirect authenticated users away from auth pages
    return NextResponse.redirect(new URL('/', req.url));
  }
  
  if (isProtectedPage && !session) {
    // Redirect unauthenticated users away from protected pages
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  return res;
}

// This middleware will run for all routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - api (API routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
}; 