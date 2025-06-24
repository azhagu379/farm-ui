// src/middleware.ts

import { withAuth, type NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// Define role-based default dashboards.
const roleBasedDashboards: Record<string, string> = {
  BUYER: '/',                // Buyer's dashboard is the root homepage itself
  FARMER: '/farmer/dashboard', // Farmer's specific dashboard
  ADMIN: '/admin/dashboard',   // Admin's specific dashboard
};

// Define paths that are always publicly accessible, regardless of login status.
// These paths will be explicitly allowed by the `authorized` callback.
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
  '/products',             // Main product Browse page
  '/products/',            // Trailing slash version
  // Regex for specific product detail pages, ensures /products/xyz is also public
  // This is handled by the `startsWith` in the callback, but explicitly listing helps understanding.
];


export default withAuth(
  // This is the main middleware function that runs on matched routes.
  function middleware(req: NextRequestWithAuth) {
    const { token } = req.nextauth; // The user's JWT token, augmented by withAuth
    const { pathname } = req.nextUrl;
    const url = req.nextUrl.clone(); // Clone the URL for potential redirection

    // --- Part 1: Redirect Authenticated Users from Auth Pages and Root Page ---
    // If a user is logged in (has a token), and they are trying to access
    // the root ('/'), '/login', or '/register' pages,
    // redirect them to their specific role-based dashboard.
    if (token) {
      const userRole = (token.role as string) || 'BUYER'; // Default to BUYER if role is missing
      const redirectTo = roleBasedDashboards[userRole] || '/'; // Fallback to '/' if dashboard not found

      // Only redirect if the current path is NOT already their designated dashboard.
      if ((pathname === '/' || pathname === '/login' || pathname === '/register') && pathname !== redirectTo) {
        url.pathname = redirectTo;
        return NextResponse.redirect(url);
      }
    }

    // --- Part 2: Role-Based Access Control for Protected Routes ---
    // This map defines which roles are allowed to access specific path prefixes.
    const requiredRolesForPaths: Record<string, string[]> = {
      '/farmer': ['FARMER', 'ADMIN'], // Farmer routes accessible by FARMER or ADMIN
      '/admin': ['ADMIN'],            // Admin routes accessible only by ADMIN
      // Add other paths here if they need specific role restrictions beyond just being authenticated.
      // Example: '/analytics': ['ADMIN', 'MANAGER']
    };

    // Find if the current pathname starts with any of the defined protected path prefixes.
    const protectedPathPrefix = Object.keys(requiredRolesForPaths).find((pathPrefix) =>
      pathname.startsWith(pathPrefix)
    );

    // If the current path is one of the strictly role-protected paths:
    if (protectedPathPrefix) {
      const allowedRoles = requiredRolesForPaths[protectedPathPrefix];
      // If the user's token is missing or their role is not among the allowed roles,
      // redirect them to the unauthorized page.
      // `token` is expected to exist here because the `authorized` callback below already handled unauthenticated users.
      if (!token?.role || !allowedRoles.includes(token.role as string)) {
        url.pathname = '/unauthorized';
        return NextResponse.redirect(url);
      }
    }

    // If none of the above redirection or restriction rules apply, allow the request to proceed.
    return NextResponse.next();
  },
  {
    // The `callbacks.authorized` function runs *before* the main `middleware` function.
    // It determines if a request is authorized to proceed at all, mostly based on authentication status.
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Check if the current path is in the explicitly defined `publicPaths`.
        // Also explicitly check for '/products' and paths starting with it, as they are public.
        const isPublicPath = publicPaths.includes(pathname) || pathname.startsWith('/products/');

        // If it's a public path, always authorize (return true), regardless of token presence.
        // This prevents `withAuth` from automatically redirecting public paths to the login page.
        if (isPublicPath) {
          return true;
        }

        // For all other paths that are NOT public (and are matched by `config.matcher`),
        // authorization requires the user to have a valid token (i.e., be authenticated).
        return !!token;
      },
    },
    // Specify a custom page for redirects if authorization fails (user is not logged in).
    pages: {
      signIn: '/login', // Unauthenticated users will be redirected here if they try to access protected paths.
    },
  }
);

// This `config` object defines which routes the middleware should apply to.
// The `matcher` uses regex to match paths.
export const config = {
  matcher: [
    // This regex matches all request paths EXCEPT those starting with:
    // - /api (Next.js API routes - usually handled by specific API route files)
    // - /_next/static (Next.js static files)
    // - /_next/image (Next.js image optimization files)
    // - /favicon.svg (favicon file)
    // This broad matcher ensures the middleware is applied to almost all frontend routes,
    // and the `authorized` callback then handles public vs. authenticated access.
    '/((?!api|_next/static|_next/image|favicon.svg).*)',
  ],
};