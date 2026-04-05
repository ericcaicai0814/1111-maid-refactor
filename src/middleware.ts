import { NextRequest, NextResponse } from 'next/server';

const BASE_PATH = '/foreign-domestic-helper-under-12';
const AUTH_COOKIE_NAME = 'admin-token';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin paths (excluding /admin/login)
  const isAdminPath = pathname.startsWith(`${BASE_PATH}/admin`);
  const isLoginPath = pathname.startsWith(`${BASE_PATH}/admin/login`);

  if (!isAdminPath || isLoginPath) {
    return NextResponse.next();
  }

  // Basic cookie existence check — full JWT verification happens in layout.tsx
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    const loginUrl = new URL(`${BASE_PATH}/admin/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
