import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider, ThemeProvider } from "@/lib/providers";
import { Toaster } from "@/components/ui/sonner"; // Add this import

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Farm E-Commerce",
  description: "A modern e-commerce platform for farm products.",
  // icons: {
  //   icon: "/favicon.svg",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster
              position="top-right"
              richColors={false}
              toastOptions={{
                classNames: {
                  toast: "group",
                  success: "bg-card text-foreground border-primary",
                  icon: "group-data-[type=success]:text-primary",
                  error:
                    "bg-destructive text-destructive-foreground border-border",
                  warning: "bg-yellow-400 text-yellow-900 border-border",
                },
              }}
            />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
