import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CANONICAL_HOST = 'law-calc.kr';
const REDIRECT_HOSTS = new Set([
  'www.law-calc.kr',
  'law-calc.vercel.app',
]);

/**
 * Force a single host for SEO / AdSense crawlers.
 * Only production alternate hosts redirect — preview *.vercel.app stays intact.
 */
export function middleware(request: NextRequest) {
  const host = (request.headers.get('host') || '').split(':')[0].toLowerCase();
  if (!host || host === CANONICAL_HOST || !REDIRECT_HOSTS.has(host)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.protocol = 'https:';
  url.hostname = CANONICAL_HOST;
  url.port = '';
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
