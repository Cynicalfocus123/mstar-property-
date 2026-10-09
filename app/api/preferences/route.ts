import { NextRequest, NextResponse } from 'next/server';
import { isLanguage } from '@/lib/i18n';

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  // Next's internal URL can use localhost while the browser uses 127.0.0.1.
  // Validate against the browser-controlled request Host, including its port.
  const expectedOrigin = `${request.nextUrl.protocol}//${request.headers.get('host')}`;
  if (origin && origin !== expectedOrigin) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }
  if (!body || typeof body.language !== 'string' || !isLanguage(body.language) || !['THB','USD'].includes(body.currency)) {
    return NextResponse.json({ error: 'Invalid preferences' }, { status: 400 });
  }
  const response = NextResponse.json({ language: body.language, currency: body.currency });
  const options = { httpOnly: true, sameSite: 'lax' as const, secure: request.nextUrl.protocol === 'https:', path: '/', maxAge: 31536000 };
  response.cookies.set('mstar-language', body.language, options);
  response.cookies.set('mstar-currency', body.currency, options);
  return response;
}
