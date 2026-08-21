import { NextResponse } from 'next/server';

export function middleware() {
  const response = NextResponse.next();
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-src https://www.google.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
  );
  return response;
}

export const config = {
  matcher: '/((?!_next/static|_next/image|media|favicon.ico).*)',
};
