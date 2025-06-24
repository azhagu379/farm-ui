import Link from "next/link";
import {
  Home,
  Package,
  PanelLeft,
  ShoppingCart,
  Sprout,
  Users,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CartButton } from "@/features/cart/store/components/cart-button";
import { ThemeToggle } from "../common/theme-toggle";
import { UserNav } from "../common/user-nav";

const mobileNavLinks = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/orders", label: "Orders", icon: ShoppingCart },
  { href: "/products", label: "Products", icon: Package },
  { href: "/users", label: "Users", icon: Users },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 shadow-sm">
      {/* Mobile Menu Button */}
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="group flex h-10 w-fit shrink-0 items-center justify-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-primary font-semibold md:text-base transition-colors hover:text-primary-foreground hover:bg-primary"
            >
              <Sprout className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="whitespace-nowrap">FarmLink</span>
            </Link>
            {mobileNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop App Name / Logo (centered on larger screens) */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-3">
        <Link
          href="/"
          className="group flex items-center gap-2 font-semibold text-3xl text-primary tracking-tight"
        >
          <Sprout className="h-9 w-9 transition-all group-hover:scale-110" />
          <span className="hidden md:inline-block">FarmLink</span>
        </Link>
      </div>

      {/* Main Navigation (Optional: if you want desktop nav in header) */}
      {/* You've left this empty, which is fine if your sidebar is the primary navigation. */}
      <nav className="hidden md:flex ml-4 space-x-6 text-sm font-medium"></nav>

      {/* Right-aligned items */}
      <div className="ml-auto flex items-center gap-3 md:gap-4">
        <CartButton />
        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  );
}
