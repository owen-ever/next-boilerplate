import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const i18nMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  // 특정 페이지 리다이렉트
  const url = request.nextUrl;
  if (url.pathname === '/test') {
    return NextResponse.redirect(new URL('/ko/test', request.url));
  }

  // 권한을 위한 로그인 확인
  const token = request.cookies.get('token')?.value;
  if (!token && url.pathname.startsWith('/ko/test')) {
    return NextResponse.redirect(new URL('/en/test', request.url));
  }

  return i18nMiddleware(request);
}

export const config = {
  // /test가 홈 경로인 경우 리다이렉션 처리를 위해 추가, [홈 경로 수정해서 사용]
  matcher: ['/', '/(ko|en)/:path*', '/test'],
};
