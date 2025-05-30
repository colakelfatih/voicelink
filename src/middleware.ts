import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const locale = request.nextUrl.locale || 'tr';

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL(`/auth/signin`, request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL(`/${locale}/lobby`, request.url));
  } 

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 