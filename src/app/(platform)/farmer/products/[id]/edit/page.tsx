'use client';

import { useParams } from 'next/navigation';
import { useProductByIdQuery } from '@/entities/product/hooks/useProductByIdQuery';
import { AddProductForm } from '../../add/_components/add-product-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LoaderCircle, AlertTriangle } from 'lucide-react';

// This is now a Client Component, just like your ProductDetailPage.
export default function EditProductPage() {
  const params = useParams<{ id: string }>();

  // It now uses the React Query hook to fetch its own data.
  const { data: product, isLoading, isError } = useProductByIdQuery(params.id);

  // Handle the loading state while data is being fetched.
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoaderCircle className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  // Handle the error state if the product is not found or the API fails.
  if (isError || !product) {
    return (
      <div className="flex flex-col justify-center items-center h-96 text-center">
        <AlertTriangle className="h-10 w-10 text-destructive mb-4" />
        <h2 className="text-xl font-semibold">Product Not Found</h2>
        <p className="text-muted-foreground">
          {`We couldn't find the product you're trying to edit.`}
        </p>
      </div>
    );
  }

  // Once data is successfully loaded, render the form and pass the data to it.
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Product</CardTitle>
        <CardDescription>
          Update the details of your product listing below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* We reuse our form component and pass the fetched data as a prop */}
        <AddProductForm initialData={product} />
      </CardContent>
    </Card>
  );
}
