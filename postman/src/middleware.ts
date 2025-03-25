import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export function middleware(req: NextRequest) {
  const response = intlMiddleware(req);

  const token = req.cookies.get('token')?.value;
  const currentPath = req.nextUrl.pathname;
  const langPrefix = currentPath.endsWith('/ru') ? '/ru' : '/en';

  const isRegisterPage = /^\/(ru|en)?\/?register$/.test(currentPath);
  const isLoginPage = /^\/(ru|en)?\/?login$/.test(currentPath);

  if (!token && !isRegisterPage && !isLoginPage) {
    return NextResponse.redirect(new URL(`${langPrefix}/register`, req.url));
  }

  if (token && currentPath !== `${langPrefix}`) {
    return NextResponse.redirect(new URL(`${langPrefix}/`, req.url));
  }

  return response;
}

export const config = {
  matcher: ['/', '/register', '/(ru|en)/:path*'],
};
