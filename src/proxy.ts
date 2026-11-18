import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { isAuthorized, logFailedAuth } from './analytics/auth';
import { recordPageview } from './analytics/record';
import { siteUrl } from './seo';

const challenge = () =>
  new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Analytics", charset="UTF-8"', 'Cache-Control': 'no-store, private', 'X-Robots-Tag': 'noindex, nofollow' },
  });

export function proxy(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    // The page re-checks credentials itself; this only provides the browser login prompt.
    if (!isAuthorized(request.headers.get('authorization'))) {
      logFailedAuth(request.headers.get('cf-connecting-ip'));
      return challenge();
    }
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store, private');
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  event.waitUntil(Promise.resolve().then(() => recordPageview({
    method: request.method,
    url: request.nextUrl,
    headers: request.headers,
    ownHosts: [siteUrl.hostname, request.headers.get('host') ?? ''],
  })));
  return NextResponse.next();
}

export const config = {
  matcher: [
    {
      // Pages only: no _next, api, admin, files with an extension, or metadata routes. Prefetches are skipped via `missing`.
      source: '/((?!(?:_next|api|admin|opengraph-image|icon|apple-icon)(?:/|$)|.*\\..*).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
        { type: 'header', key: 'rsc' },
      ],
    },
    '/admin/:path*',
  ],
};
