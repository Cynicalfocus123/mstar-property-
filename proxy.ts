import { NextRequest, NextResponse } from 'next/server';
import { isLanguage, preferredLanguage } from './lib/i18n';

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const segment = pathname.split('/')[1];
  if (isLanguage(segment)) return NextResponse.next();
  const remembered = request.cookies.get('mstar-language')?.value;
  const language = remembered && isLanguage(remembered) ? remembered : preferredLanguage(request.headers.get('accept-language'));
  const url = request.nextUrl.clone();
  url.pathname = `/${language}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}
export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] };
