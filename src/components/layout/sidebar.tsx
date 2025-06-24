"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {  ChevronsLeft, Sprout } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { navConfig, NavLink } from "@/config/nav-config";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isSidebarOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession(); // Get the user's session
  const userRole = session?.user?.role; // Get the user's role

  // Separate top links from bottom links based on your navConfig structure
  const topNavSections = navConfig.filter((section) => !section.label); // Sections without a label are assumed to be top
  const bottomNavSections = navConfig.filter(
    (section) => section.label === "Management" || section.label === "Account"
  );

  // Filter links for top sections
  const filteredTopNavConfig = topNavSections
    .map((section) => ({
      ...section,
      links: section.links.filter((link) =>
        link.roles.includes(userRole as "BUYER" | "FARMER" | "ADMIN")
      ),
    }))
    .filter((section) => section.links.length > 0);

  // Filter links for bottom sections
  const filteredBottomNavConfig = bottomNavSections
    .map((section) => ({
      ...section,
      links: section.links.filter((link) =>
        link.roles.includes(userRole as "BUYER" | "FARMER" | "ADMIN")
      ),
    }))
    .filter((section) => section.links.length > 0);

  const renderLink = (link: NavLink) => (
    <Link
      href={link.href}
      className={cn(
        "flex h-9 items-center rounded-lg text-muted-foreground transition-colors hover:text-foreground",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90":
            pathname === link.href,
        },
        isSidebarOpen ? "w-full justify-start gap-4 px-3" : "w-9 justify-center"
      )}
    >
      <link.icon className="h-5 w-5" />
      <span
        className={cn("whitespace-nowrap", {
          "sr-only": !isSidebarOpen,
        })}
      >
        {link.label}
      </span>
    </Link>
  );

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-10 hidden flex-col border-r bg-background sm:flex transition-all duration-300 ease-in-out",
        isSidebarOpen ? "w-64" : "w-14"
      )}
    >
      <div className="relative flex h-full flex-col">
        {/* Logo and App Name */}
        <div className="flex items-center border-b p-3 h-[60px]">
          <Link
            href="/"
            className={cn(
              "group flex items-center gap-2 font-semibold",
              !isSidebarOpen && "justify-center"
            )}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary md:h-8 md:w-8">
              <Sprout className="h-4 w-4 transition-all group-hover:scale-110" />
            </div>
            <span
              className={cn("whitespace-nowrap text-sm", {
                "sr-only": !isSidebarOpen,
              })}
            >
              FarmLink
            </span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <TooltipProvider delayDuration={0}>
            <div className="flex w-full flex-col items-start gap-2 px-2">
              {filteredTopNavConfig.map((section, sectionIndex) => (
                <div key={`top-${sectionIndex}`} className="w-full">
                  {section.label && isSidebarOpen && (
                    <h3 className="mb-2 mt-4 px-3 text-xs font-semibold uppercase text-muted-foreground">
                      {section.label}
                    </h3>
                  )}
                  {section.links.map((link) =>
                    !isSidebarOpen ? (
                      <Tooltip key={link.href}>
                        <TooltipTrigger asChild>
                          {renderLink(link)}
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          {link.label}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <div key={link.href} className="w-full">
                        {renderLink(link)}
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          </TooltipProvider>
        </div>

        {/* Bottom Navigation Links */}
        <div className="border-t p-2">
          {/* Added border-t for separation */}
          <TooltipProvider delayDuration={0}>
            <div className="flex w-full flex-col items-start gap-2 px-2">
              {filteredBottomNavConfig.map((section, sectionIndex) => (
                <div key={`bottom-${sectionIndex}`} className="w-full">
                  {section.label && isSidebarOpen && (
                    <h3 className="mb-2 mt-4 px-3 text-xs font-semibold uppercase text-muted-foreground">
                      {section.label}
                    </h3>
                  )}
                  {section.links.map((link) =>
                    !isSidebarOpen ? (
                      <Tooltip key={link.href}>
                        <TooltipTrigger asChild>
                          {renderLink(link)}
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          {link.label}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <div key={link.href} className="w-full">
                        {renderLink(link)}
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          </TooltipProvider>
        </div>

        {/* Sidebar Toggle Button */}
        <div
          className={cn(
            "absolute z-20 transition-all duration-300 ease-in-out",
            "top-15 -translate-y-1/2",
            "-right-1 rounded-l-full"
          )}
        >
          <Button
            onClick={toggleSidebar}
            variant="ghost"
            className={cn(
              "h-7 transition-all duration-300 ease-in-out",
              "w-5 rounded-l-full rounded-r-none bg-background shadow-md hover:bg-accent text-primary hover:text-primary" // Half-circle/pill when closed
            )}
          >
            <ChevronsLeft
              className={cn("h-4 w-4 transition-transform duration-300", {
                "rotate-180": !isSidebarOpen,
              })}
            />
          </Button>
        </div>
      </div>
    </aside>
  );
}
