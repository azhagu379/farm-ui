"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "../useCartStore";

export function CartButton() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Button variant="outline" size="icon" className="relative h-8 w-8" asChild>
      <Link href="/cart">
        <ShoppingCart className="h-4 w-4" />
        <span className="sr-only">Shopping Cart</span>
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {totalItems}
          </span>
        )}
      </Link>
    </Button>
  );
}
