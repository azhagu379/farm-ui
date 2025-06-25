import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { products as allProducts, categories } from "@/lib/placeholder-data"; // Use direct import for this server page
import { ProductCard } from "@/entities/product/components/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// This is a Server Component, so we can fetch data directly.
export default function PublicHomePage() {
  const newArrivals = [...allProducts]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 8);

  return (
    <div className="flex flex-1 flex-col gap-12 md:gap-16">
      {/* 1. Hero Banner Section */}
      <section className="relative w-full h-[400px] md:h-[500px]">
        <Image
          src="/login-background2.jpg"
          alt="Lush green farm field at sunrise"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black/50 p-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Freshness From Farm to Table
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            Discover the best organic produce, dairy, and more from local
            farmers you can trust.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/products">Shop All Products</Link>
          </Button>
        </div>
      </section>

      {/* 2. Shop by Category Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              href={`/products?category=${category.slug}`}
              key={category.name}
              className="group relative"
            >
              <div className="aspect-square w-full overflow-hidden rounded-lg">
                <Image
                  src={category.imageUrl ?? ""}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 rounded-lg" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-lg font-semibold text-white">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. New Arrivals Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
          New Arrivals
        </h2>
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent>
            {newArrivals.map((product) => (
              <CarouselItem
                key={product.id}
                className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="p-1">
                  <ProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </section>
    </div>
  );
}
