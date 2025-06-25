import { withAuth, type NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// Define role-based default dashboards.
const roleBasedDashboards: Record<string, string> = {
  BUYER: '/',                // Buyer's dashboard is the root homepage itself
  FARMER: '/farmer/dashboard', // Farmer's specific dashboard
  ADMIN: '/admin/dashboard',   // Admin's specific dashboard
};

// Define paths that are always publicly accessible, regardless of login status.
const publicPaths = [
  '/login',
  '/register',
  '/forgot-password',
  '/unauthorized',
  '/maintenance',
  '/terms',
  '/privacy',
  '/coming-soon',
  '/',                     // The root homepage is also publicly accessible
  '/products',             // Main product browse page
  '/products/',            // Trailing slash version
];


export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;
    const url = req.nextUrl.clone();

    // --- Part 1: Redirect Authenticated Users from Auth Pages and Root Page ---
    if (token) {
      const userRole = (token.role as string) || 'BUYER';
      const redirectTo = roleBasedDashboards[userRole] || '/';

      if ((pathname === '/' || pathname === '/login' || pathname === '/register') && pathname !== redirectTo) {
        url.pathname = redirectTo;
        return NextResponse.redirect(url);
      }
    }

    // --- Part 2: Role-Based Access Control for Protected Routes ---
    const requiredRolesForPaths: Record<string, string[]> = {
      '/farmer': ['FARMER', 'ADMIN'],
      '/admin': ['ADMIN'],
    };

    const protectedPathPrefix = Object.keys(requiredRolesForPaths).find((pathPrefix) =>
      pathname.startsWith(pathPrefix)
    );

    if (protectedPathPrefix) {
      const allowedRoles = requiredRolesForPaths[protectedPathPrefix];
      if (!token?.role || !allowedRoles.includes(token.role as string)) {
        url.pathname = '/unauthorized';
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Check if the current path is in the explicitly defined `publicPaths`.
        // Also explicitly check for '/products' and paths starting with it, as they are public.
        const isPublicPath = publicPaths.includes(pathname) || pathname.startsWith('/products/');

        if (isPublicPath) {
          return true;
        }

        // For all other paths caught by the matcher, authorization requires a token.
        return !!token;
      },
    },
    pages: {
      signIn: '/login',
    },
  }
);

// This `config` object defines which routes the middleware should apply to.
export const config = {
  matcher: [
    // This regex matches all request paths EXCEPT for specific internal Next.js paths.
    // It's a very broad matcher, so the `authorized` callback's `isPublicPath` logic is crucial.
    '/((?!api|_next/static|_next/image|favicon.svg).*)',
  ],
};