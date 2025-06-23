"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { type Product } from "@/entities/product/types";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";

interface ProductDisplayProps {
  product: Product;
}

export function ProductDisplay({ product }: ProductDisplayProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4 md:gap-10 items-start">
        <div className="grid gap-4">
          <Image
            src={`https://placehold.co/600x600/22543D/F7FAFC?text=${product.name.replace(/ /g, "+")}&font=lora`}
            alt={product.name}
            width={600}
            height={600}
            className="aspect-square object-cover border w-full rounded-lg overflow-hidden"
          />
        </div>
      </div>
      <div className="grid gap-4 md:gap-10 items-start">
        <div className="grid gap-2">
          <p className="text-sm font-medium text-muted-foreground">
            {product.farmer}
          </p>
          <h1 className="font-bold text-3xl lg:text-4xl">{product.name}</h1>
          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold">
              ₹{product.price.toFixed(2)}
            </div>
            <Badge
              variant={
                product.status === "In Stock"
                  ? "default"
                  : product.status === "Low Stock"
                    ? "secondary"
                    : "destructive"
              }
            >
              {product.status}
            </Badge>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <p className="text-sm leading-loose text-muted-foreground">
            A detailed description of the product will go here. It will
            highlight the freshness, quality, and origin of the{" "}
            {product.name.toLowerCase()}, straight from {product.farmer}.
          </p>
        </div>
        <Separator />
        <Button size="lg">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
