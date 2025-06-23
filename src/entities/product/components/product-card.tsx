import Link from 'next/link';
import Image from 'next/image';
import { type Product } from '../types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-200 ease-in-out group-hover:shadow-lg group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="aspect-square relative overflow-hidden">
            <Image
              src={`https://placehold.co/400x400/22543D/F7FAFC?text=${product.name.replace(/ /g, '+')}&font=lora`}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <Badge
            variant={
              product.status === 'In Stock'
                ? 'default'
                : product.status === 'Low Stock'
                ? 'secondary'
                : 'destructive'
            }
            className="text-xs"
          >
            {product.status}
          </Badge>
          <CardTitle className="mt-2 text-lg font-semibold leading-tight group-hover:text-primary">
            {product.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">{product.farmer}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <p className="text-lg font-bold text-primary">
            ₹{product.price.toFixed(2)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
