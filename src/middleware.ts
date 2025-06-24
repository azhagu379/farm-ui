// src/middleware.ts

import { withAuth, type NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// Define role-based default dashboards.
// A BUYER's default dashboard is the homepage '/', as confirmed.
const roleBasedDashboards: Record<string, string> = {
  BUYER: '/',                // Buyer's dashboard is the root homepage itself
  FARMER: '/farmer/dashboard', // Farmer's specific dashboard
  ADMIN: '/admin/dashboard',   // Admin's specific dashboard
};

export default withAuth(
  // This is the main middleware function that runs on matched routes.
  function middleware(req: NextRequestWithAuth) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;
    const url = req.nextUrl.clone(); // Clone the URL for potential redirection

    // --- Part 1: Redirect Authenticated Users from Auth Pages AND Root Page ---
    // If a user is logged in, redirect them away from login/register/root pages to their dashboard.
    if (token) {
      const userRole = (token.role as string) || 'BUYER'; // Default to BUYER if role is somehow missing
      const redirectTo = roleBasedDashboards[userRole] || '/'; // Fallback to '/' if dashboard not found for role
      if ((pathname === '/' || pathname === '/login' || pathname === '/register') && pathname !== redirectTo) {
        url.pathname = redirectTo;
        return NextResponse.redirect(url);
      }
    }

  
    const requiredRoles: Record<string, string[]> = {
      '/farmer': ['FARMER', 'ADMIN'], 
      '/admin': ['ADMIN'],          
      // Add other paths here if they need specific role restrictions beyond just being authenticated.
      // E.g., '/analytics': ['ADMIN', 'MANAGER']
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

   
    return NextResponse.next();
  },
  {
  
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        const publicPaths = [
          '/login',
          '/register',
          '/forgot-password',
          '/unauthorized',
          '/maintenance',
          '/terms',
          '/privacy',
          '/coming-soon',
          '/', // The root homepage is also publicly accessible
        ];

        // Product Browse pages are public.
        if (pathname === '/products' || pathname.startsWith('/products/')) {
          return true;
        }

        // Other defined public paths.
        if (publicPaths.includes(pathname)) {
          return true;
        }

        // For all other routes caught by the matcher (that are not explicitly public),
        // authorization requires a token (i.e., the user must be authenticated).
        return !!token;
      },
    },
    // Specify custom pages for redirects if authorization fails (user is not logged in).
    pages: {
      signIn: '/login', // Redirect unauthenticated users to this custom login page
    },
  }
);

// This config specifies which routes the middleware should run on.
// The `matcher` uses regex to match paths.
export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - /api (Next.js API routes, handled separately)
    // - /_next/static (static files)
    // - /_next/image (image optimization files)
    // - /favicon.svg (favicon file)
    '/((?!api|_next/static|_next/image|favicon.svg).*)',
  ],
};