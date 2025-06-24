"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { cn } from "@/lib";

/**
 * The main layout for the authenticated part of the application.
 * This component is now a client component to manage the sidebar's state.
 */
export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={cn(
          "flex flex-col sm:gap-4 sm:py-4 transition-all duration-300 ease-in-out",
          isSidebarOpen ? "sm:pl-64" : "sm:pl-14"
        )}
      >
        <Header />
        <main className="flex-1 p-4 sm:px-6 sm:py-6">{children}</main>
      </div>
    </div>
  );
}
