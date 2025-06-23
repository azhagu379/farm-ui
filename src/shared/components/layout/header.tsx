import Link from "next/link";
import {
  Home,
  Package,
  PanelLeft,
  ShoppingCart,
  Tractor,
  Users,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { Button } from "@/shared/components/ui/button";
import { ThemeToggle } from "@/shared/components/common/theme-toggle";
import { UserNav } from "@/shared/components/common/user-nav"; // Import UserNav
import { CartButton } from "@/features/cart/store/components/cart-button";

const mobileNavLinks = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/orders", label: "Orders", icon: ShoppingCart },
  { href: "/products", label: "Products", icon: Package },
  { href: "/users", label: "Users", icon: Users },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      {/* Mobile Menu Button (remains unchanged) */}
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
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Tractor className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Farm E-Commerce</span>
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

      <div className="ml-auto flex items-center gap-4">
        <ThemeToggle />
        <CartButton /> {/* Add the CartButton here */}
        <UserNav />
      </div>
    </header>
  );
}
