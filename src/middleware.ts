import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const locale = request.nextUrl.locale || 'tr';
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');
  const isPublicRoute = request.nextUrl.pathname === `/${locale}`;

  // Skip middleware for API routes
  if (isApiRoute) {
    return NextResponse.next();
  }

  // If user is not authenticated and trying to access protected route
  if (!token && !isAuthPage && !isPublicRoute) {
    const signInUrl = new URL(`/auth/signin`, request.url);
    signInUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(signInUrl);
  }

  // If user is authenticated and trying to access auth page or public route
  if (token && (isAuthPage || isPublicRoute)) {
    return NextResponse.redirect(new URL(`/${locale}/lobby`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}; 