'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes';
import { SessionProvider } from 'next-auth/react'; // Import SessionProvider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


/**
 * A provider component that wraps the application to provide theme context.
 * It uses the 'next-themes' library to handle theme switching (light, dark, system).
 */
const queryClient = new QueryClient();

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </QueryClientProvider>
  );
}
// NEW: AuthProvider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
