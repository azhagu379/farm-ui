"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsLeft, Sprout } from "lucide-react"; // Using Sprout as per your preference
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib"; // Your specified path
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { navConfig, NavLink, NavSection } from "@/config/nav-config";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isSidebarOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const effectiveUserRole: "BUYER" | "FARMER" | "ADMIN" | "PUBLIC" =
    (session?.user?.role as "BUYER" | "FARMER" | "ADMIN") || "PUBLIC";

  const discoverNavSections = navConfig.filter(
    (section) => section.label === "Discover"
  );
  const activityNavSections = navConfig.filter(
    (section) => section.label === "Your Activity"
  );
  const managementNavSections = navConfig.filter(
    (section) => section.label === "Management"
  );
  const accountNavSections = navConfig.filter(
    (section) => section.label === "Account"
  );
  const infoNavSections = navConfig.filter(
    (section) => section.label === "Help & Info"
  );

  const filterLinksByRole = (sections: NavSection[]) => {
    return sections
      .map((section) => ({
        ...section,
        links: section.links.filter((link) =>
          link.roles.includes(effectiveUserRole)
        ),
      }))
      .filter((section) => section.links.length > 0);
  };

  const filteredDiscoverNav = filterLinksByRole(discoverNavSections);
  const filteredActivityNav = filterLinksByRole(activityNavSections);
  const filteredManagementNav = filterLinksByRole(managementNavSections);
  const filteredAccountNav = filterLinksByRole(accountNavSections);
  const filteredInfoNav = filterLinksByRole(infoNavSections);

  const renderSection = (section: NavSection, sectionKey: string) => (
    <div key={sectionKey} className="w-full">
      {/* {section.label && isSidebarOpen && (
        <h3 className="mb-2 mt-4 px-3 text-xs font-bold uppercase text-muted-foreground">
          {section.label}
        </h3>
      )} */}
      {section.links.map((link) =>
        !isSidebarOpen ? (
          <Tooltip key={link.href}>
            <TooltipTrigger asChild>{renderLink(link)}</TooltipTrigger>
            <TooltipContent side="right">{link.label}</TooltipContent>
          </Tooltip>
        ) : (
          <div key={link.href} className="w-full">
            {renderLink(link)}
          </div>
        )
      )}
    </div>
  );

  const renderLink = (link: NavLink) => (
    <Link
      href={link.href}
      className={cn(
        "flex h-10 items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200", // Taller links, more padding
        {
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm":
            pathname === link.href,
          "text-muted-foreground hover:bg-accent/50 hover:text-foreground":
            pathname !== link.href,
        },
        "w-full justify-start gap-4"
      )}
    >
      <link.icon className="h-5 w-5" /> {/* Increased size here */}
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
        {/* Logo and App Name - Consistent with Header Height */}
        <div className="flex items-center border-b p-3 h-20">
          <Link
            href="/"
            className={cn(
              "group flex items-center gap-2 font-semibold text-xl text-primary",
              !isSidebarOpen && "justify-center"
            )}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary md:h-9 md:w-9">
              <Sprout className="h-6 w-6 transition-all group-hover:scale-110" />{" "}
              {/* Increased size here */}
            </div>
            <span
              className={cn("whitespace-nowrap", {
                "sr-only": !isSidebarOpen,
              })}
            >
              FarmLink
            </span>
          </Link>
        </div>

        {/* Main Navigation Sections - Top part (Discover, Your Activity, Management) */}
        <div className="w-full mt-4 pt-4 border-t border-border/50">
          <TooltipProvider delayDuration={0}>
            <div className="flex w-full flex-col items-start gap-1 px-2">
              {/* Discover Section */}
              {filteredDiscoverNav.map((section, idx) =>
                renderSection(section, `discover-${idx}`)
              )}

              {/* Your Activity Section (separated by a subtle border) */}
              {filteredActivityNav.length > 0 && (
                <div className="w-full mt-4 pt-4 border-t border-border/50">
                  {filteredActivityNav.map((section, idx) =>
                    renderSection(section, `activity-${idx}`)
                  )}
                </div>
              )}

              {/* Management Section (separated) */}
              {filteredManagementNav.length > 0 && (
                <div className="w-full mt-4 pt-4 border-t border-border/50">
                  {filteredManagementNav.map((section, idx) =>
                    renderSection(section, `management-${idx}`)
                  )}
                </div>
              )}
            </div>
          </TooltipProvider>
        </div>

        {/* Bottom Navigation Links (Account, Help & Info) */}
        <div className="w-full mt-4 pt-4 border-t border-border/50">
          <TooltipProvider delayDuration={0}>
            <div className="flex w-full flex-col items-start gap-1 px-2">
              {/* Account Section */}
              {filteredAccountNav.map((section, idx) =>
                renderSection(section, `account-${idx}`)
              )}

              {/* Help & Info Section (separated) */}
              {filteredInfoNav.length > 0 && (
                <div className="w-full mt-4 pt-4 border-t border-border/50">
                  {filteredInfoNav.map((section, idx) =>
                    renderSection(section, `info-${idx}`)
                  )}
                </div>
              )}
            </div>
          </TooltipProvider>
        </div>

        {/* Sidebar Toggle Button */}
        <div
          className={cn(
            "absolute z-20 transition-all duration-300 ease-in-out",
            "top-20 -translate-y-1/2",
            "-right-1 rounded-l-full"
          )}
        >
          <Button
            onClick={toggleSidebar}
            variant="ghost"
            className={cn(
              "h-6 transition-all duration-300 ease-in-out",
              "w-3 rounded-l-full rounded-r-none bg-background shadow-md hover:bg-accent text-primary hover:text-primary" // Half-circle/pill when closed
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
