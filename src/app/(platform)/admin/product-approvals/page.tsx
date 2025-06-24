'use client';

import Image from 'next/image';
import { usePendingProductsQuery, useUpdateProductStatusMutation } from '@/entities/admin/hooks/useAdmin';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LoaderCircle, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Product } from '@/entities/product/types';

export default function ProductApprovalPage() {
  const { data: products, isLoading, isError } = usePendingProductsQuery();
  const updateStatusMutation = useUpdateProductStatusMutation();

  // CORRECTED: The status type now matches the Product interface
  const handleUpdateStatus = (productId: string, status: Product['status']) => {
    updateStatusMutation.mutate({ productId, status });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Approvals</CardTitle>
        <CardDescription>
          Review and approve new products submitted by farmers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex justify-center items-center h-96">
            <LoaderCircle className="h-10 w-10 animate-spin text-primary" />
          </div>
        )}
        {isError && (
          <div className="flex flex-col justify-center items-center h-96 text-center text-destructive">
            <AlertTriangle className="h-10 w-10 mb-4" />
            <h3 className="text-xl font-semibold">Failed to load pending products</h3>
          </div>
        )}
        {products && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Farmer</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length > 0 ? (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="hidden sm:table-cell">
                      <Image alt={product.name} className="aspect-square rounded-md object-cover" height="64" src={product.imageUrl?.[0] || `https://placehold.co/64x64/22543D/F7FAFC?text=P`} width="64" />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.farmerId}</TableCell> 
                    <TableCell className="text-right">₹{product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateStatus(product.id, 'In Stock')}
                          disabled={updateStatusMutation.isPending}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          // CORRECTED: Use 'Rejected' as the status on rejection
                          onClick={() => handleUpdateStatus(product.id, 'Rejected')}
                          disabled={updateStatusMutation.isPending}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No products are currently pending approval.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
