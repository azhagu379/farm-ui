import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;

    // If user is not a farmer and tries to access farmer routes, redirect them.
    if (pathname.startsWith('/farmer') && token?.role !== 'FARMER') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    if (pathname.startsWith('/admin') && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/farmer/:path*',
    '/admin/:path*',
    '/orders/:path*',
    '/settings/:path*',
    '/checkout/:path*',
  ],
};
