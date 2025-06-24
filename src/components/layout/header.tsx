"use client";

import Link from "next/link";
import {
  PanelLeft,
  Search,
  Sprout, // Used for the FarmLink logo
  Bell, // For notifications/activity hub
  LogIn, // For Sign In icon
  UserPlus, // For Register icon
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Strictly follow provided import paths
import { CartButton } from "@/features/cart/store/components/cart-button";
import { ThemeToggle } from "../common/theme-toggle"; // Assuming ../common is correct relative path
import { UserNav } from "../common/user-nav"; // Assuming ../common is correct relative path
import { useSession } from "next-auth/react";
import { navConfig, NavSection, NavLink } from "@/config/nav-config"; // Import NavSection, NavLink for type safety

export function Header() {
  const { data: session } = useSession(); // Get session data to check login status

  const mobileNavLinks: NavLink[] = navConfig.flatMap(
    (section: NavSection) => section.links
  );

  const getActivityHubLinks = (): Array<{ href: string; label: string }> => {
    const userRole = session?.user?.role;
    if (!userRole) return []; // No links if not logged in

    const relevantLinks: Array<{ href: string; label: string }> = [];

    const commonActivitySections = ["Your Activity", "Management", "Account"]; // Sections to pull from for quick links

    for (const sectionLabel of commonActivitySections) {
      const section = navConfig.find((s) => s.label === sectionLabel);
      if (section) {
        section.links.forEach((link) => {
          if (
            link.roles.includes(userRole as "BUYER" | "FARMER" | "ADMIN") ||
            link.roles.includes("PUBLIC")
          ) {
            if (!relevantLinks.some((rl) => rl.href === link.href)) {
              relevantLinks.push({ href: link.href, label: link.label });
            }
          }
        });
      }
    }

    return relevantLinks.slice(0, 5); // Limit to top 5 for brevity in dropdown
  };

  const activityHubLinks = getActivityHubLinks();

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center border-b bg-background/80 backdrop-blur-md px-4 sm:px-6 shadow-lg">
      {/* Mobile Menu & Dynamic Left-Aligned Items */}
      <div className="flex items-center gap-4 sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost" className="mr-0">
              {" "}
              {/* Adjusted margin for mobile */}
              <PanelLeft className="h-6 w-6" /> {/* Medium icon size */}
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="group flex items-center gap-3 font-semibold text-2xl mb-4"
              >
                <Sprout className="h-7 w-7 text-primary transition-all group-hover:scale-110" />{" "}
                {/* Medium icon size */}
                <span className="text-foreground">FarmLink</span>
              </Link>
              {mobileNavLinks.map(
                (
                  link: NavLink // Explicitly type link
                ) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-4 px-2.5 py-2 rounded-md text-muted-foreground transition-colors hover:text-primary hover:bg-primary/10"
                  >
                    <link.icon className="h-6 w-6" /> {/* Medium icon size */}
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          </SheetContent>
        </Sheet>
        {/* Mobile Search Input (Optional: always visible on mobile beside menu) */}
        <div className="relative flex-1 mr-auto">
          {" "}
          {/* Take available space, push logo/actions right */}
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-full bg-secondary pl-10 pr-4 h-10"
          />
        </div>
      </div>

      {/* Desktop App Name / Logo (Centered) */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-3">
        <Link
          href="/"
          className="group flex items-center gap-2 font-semibold text-3xl text-primary tracking-tight"
        >
          <Sprout className="h-10 w-10 transition-all group-hover:scale-110" />{" "}
          <span className="hidden md:inline-block">FarmLink</span>
        </Link>
      </div>

      {/* Right-aligned items */}
      <div className="ml-auto flex items-center gap-4 md:gap-6">
        {/* Desktop Search Bar (Optional: dedicated desktop search in header) */}
        {/* <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="w-[250px] rounded-full bg-secondary pl-10 pr-4 focus-visible:ring-primary h-10"
          />
        </div> */}

        <CartButton />
        <ThemeToggle />

        {session?.user ? (
          <>
            {activityHubLinks.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-6 w-6" />
                    {/* Optional: Notification badge */}
                    {/* <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-red-500 text-white text-[8px] flex items-center justify-center">2</span> */}
                    <span className="sr-only">Activity Hub</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Your Activities</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {activityHubLinks.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link
                        href={link.href}
                        className="flex items-center gap-2"
                      >
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  {/* Potentially add a "Go to Dashboard" or "Go to Admin Panel" link here */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href={
                        roleBasedDashboards[session.user.role as string] ||
                        "/dashboard"
                      }
                    >
                      Go to Dashboard
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <UserNav />
          </>
        ) : (
          <>
            <Link href="/login">
              <Button variant="ghost" size="icon" className="md:hidden">
                {" "}
                {/* Hide text on small screens */}
                <LogIn className="h-6 w-6" /> {/* Medium icon size */}
                <span className="sr-only">Sign In</span>
              </Button>
              <Button variant="ghost" className="hidden md:flex">
                {" "}
                {/* Show text on medium/large screens */}
                <LogIn className="h-5 w-5 mr-1" /> Sign In
              </Button>
            </Link>
            <Link href="/register" className="hidden md:flex">
              {" "}
              {/* Register button, optional on larger screens */}
              <Button>
                <UserPlus className="h-5 w-5 mr-1" /> Register
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

const roleBasedDashboards: Record<string, string> = {
  BUYER: "/",
  FARMER: "/farmer/dashboard",
  ADMIN: "/admin/dashboard",
};
