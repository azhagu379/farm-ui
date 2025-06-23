"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Package,
  ShoppingCart,
  Tractor,
  Users,
  ChevronsLeft,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/components/ui/button";

const navLinks = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/orders", label: "Orders", icon: ShoppingCart },
  { href: "/products", label: "Products", icon: Package },
  { href: "/users", label: "Users", icon: Users },
];

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isSidebarOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();

  const renderLink = (link: (typeof navLinks)[0]) => (
    <Link
      href={link.href}
      className={cn(
        "flex h-9 items-center rounded-lg text-muted-foreground transition-colors hover:text-foreground",
        {
          // Updated: The active link now uses the primary theme color.
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
        <div className="flex items-center border-b p-3 h-[60px]">
          <Link
            href="/"
            className={cn(
              "group flex items-center gap-2 font-semibold",
              !isSidebarOpen && "justify-center"
            )}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary md:h-8 md:w-8">
              <Tractor className="h-4 w-4 transition-all group-hover:scale-110" />
            </div>
            <span
              className={cn("whitespace-nowrap text-sm", {
                "sr-only": !isSidebarOpen,
              })}
            >
              Farm E-Commerce
            </span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <TooltipProvider delayDuration={0}>
            <div className="flex w-full flex-col items-start gap-2 px-2">
              {navLinks.map((link) =>
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
          </TooltipProvider>
        </div>

        <div
          className={cn(
            "absolute top-[18px] z-20 transition-all duration-300 ease-in-out",
            isSidebarOpen ? "right-2" : "-right-3" // Adjusted position for smaller size
          )}
        >
          <Button
            onClick={toggleSidebar}
            variant="outline"
            className="h-7 w-7 rounded-full bg-background shadow-md hover:bg-accent text-primary hover:text-primary"
          >
            <ChevronsLeft
              className={cn("h-3.5 w-3.5 transition-transform duration-300", {
                "rotate-180": !isSidebarOpen,
              })}
            />
          </Button>
        </div>
      </div>
    </aside>
  );
}
