import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export function middleware(req: NextRequest) {
  const response = intlMiddleware(req);

  const token = req.cookies.get('token')?.value;
  const currentPath = req.nextUrl.pathname;

  const isRegisterPage = /^\/(ru|en)?\/?register$/.test(currentPath);
  const isLoginPage = /^\/(ru|en)?\/?login$/.test(currentPath);

  const referer = req.headers.get('referer')?.split('/');

  const last = referer![referer!.length - 1] || 'register';

  console.log('++++++++++++++++++++++++++++++++++++++++++++++');

  if (!token && !isRegisterPage && !isLoginPage) {
    const localeMatches = [...currentPath.matchAll(/\/(ru|en)/g)];

    const lang = localeMatches.length
      ? localeMatches[localeMatches.length - 1][1]
      : 'en';

    if (last === 'register') {
      return NextResponse.redirect(new URL(`/${lang}/register`, req.url));
    } else {
      return NextResponse.redirect(new URL(`/${lang}/login`, req.url));
    }
  }

  if (token) {
    return NextResponse.redirect(new URL(`/`, req.url));
  }

  return response;
}

export const config = {
  matcher: ['/', '/register', '/(ru|en)/:path*'],
};
