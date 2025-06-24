import { withAuth, type NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// Define role-based default dashboards.
// A BUYER's dashboard is the homepage '/'.
const roleBasedDashboards: Record<string, string> = {
  BUYER: '/',
  FARMER: '/farmer/dashboard',
  ADMIN: '/admin/dashboard',
};

export default withAuth(
  // This is the main middleware function that runs on matched routes.
  function middleware(req: NextRequestWithAuth) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;
    const url = req.nextUrl.clone(); // Clone the URL for potential redirection

    // --- Part 1: Redirect Authenticated Users from Auth Pages ---
    // If a user is logged in, redirect them away from login/register pages.
    if (token && (pathname === '/login' || pathname === '/register')) {
      const userRole = (token.role as string) || 'BUYER';
      const redirectTo = roleBasedDashboards[userRole] || '/';

      if (pathname !== redirectTo) {
        url.pathname = redirectTo;
        return NextResponse.redirect(url);
      }
    }

    // --- Part 2: Role-Based Access Control for Protected Routes ---
    const requiredRoles: Record<string, string[]> = {
      '/farmer': ['FARMER', 'ADMIN'], // Admins can access farmer routes
      '/admin': ['ADMIN'],
    };

    const protectedPath = Object.keys(requiredRoles).find((path) =>
      pathname.startsWith(path)
    );

    if (protectedPath) {
      const allowedRoles = requiredRoles[protectedPath];
      if (!token?.role || !allowedRoles.includes(token.role as string)) {
        url.pathname = '/unauthorized';
        return NextResponse.redirect(url);
      }
    }

    // Allow the request to proceed if no specific rules matched.
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // --- Part 3: Define Publicly Accessible Routes ---
        // These paths are always accessible, regardless of login status.
        const publicPaths = [
          '/login',
          '/register',
          '/forgot-password',
          '/unauthorized',
          '/maintenance',
          '/terms',
          '/privacy',
          '/coming-soon',
        ];

        // The product browsing pages are public.
        if (pathname === '/products' || pathname.startsWith('/products/')) {
          return true;
        }

        // The homepage is public.
        if (pathname === '/') {
          return true;
        }

        // Other defined public paths.
        if (publicPaths.includes(pathname)) {
          return true;
        }

        // For all other routes caught by the matcher, the user must be logged in.
        return !!token;
      },
    },
    pages: {
      signIn: '/login', // Redirect unauthenticated users to this page.
    },
  }
);

// This config specifies which routes the middleware should run on.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.svg (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.svg).*)',
  ],
};
