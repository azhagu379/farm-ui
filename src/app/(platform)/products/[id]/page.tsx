"use client";

import { useProductByIdQuery } from "@/entities/product/hooks/useProductByIdQuery";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { LoaderCircle, AlertTriangle, ShoppingCart } from "lucide-react";
import { useParams } from "next/navigation";
import Image from "next/image"; // The import is now uncommented
import { useCartStore } from "@/features/cart/store/useCartStore";
import { toast } from "sonner";

// The page component receives params, which includes the dynamic 'id' segment
export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const addItem = useCartStore((state) => state.addItem);

  const { data: product, isLoading, isError } = useProductByIdQuery(params.id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoaderCircle className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-center">
        <AlertTriangle className="h-8 w-8 text-destructive mb-4" />
        <h2 className="text-xl font-semibold">Product Not Found</h2>
        <p className="text-muted-foreground">
          {`Sorry, we couldn't find the product you're looking for.`}
        </p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} has been added to your cart!`);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4 md:gap-10 items-start">
        <div className="grid gap-4">
          {/* The Image component is now active */}
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
            {product.farmerId}
          </p>
          <h1 className="font-bold text-3xl lg:text-4xl">{product.name}</h1>
          <div className="flex items-center gap-4">
            {/* CORRECTED: Currency is now Indian Rupees */}
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
            {product.name.toLowerCase()}, straight from {product.farmerId}.
          </p>
        </div>
        <Separator />
        <Button size="lg" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
