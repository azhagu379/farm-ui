'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from '../api/productService';
import { type Product } from '../types';

// Define the shape of the data our form will send for creating a product
export type CreateProductPayload = Omit<Product, 'id' | 'status' | 'farmerId' | 'createdAt' | 'updatedAt' | 'farmer' | 'imageUrl' | 'stock'> & { stock: number; categoryId: string };

// Hook (Mutation) for creating a new product
export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProduct: CreateProductPayload) => createProduct(newProduct),
    onSuccess: () => {
      toast.success('Product submitted successfully for approval!');
      // After success, tell React Query to refetch the farmer's product list
      queryClient.invalidateQueries({ queryKey: ['farmer-products'] });
    },
    onError: () => {
      toast.error('Failed to submit product. Please try again.');
    },
  });
};

// Hook (Mutation) for updating an existing product
export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProduct, // Assumes updateProduct takes an object like { id, ...payload }
    onSuccess: (updatedProduct) => {
      toast.success(`Product "${updatedProduct.name}" updated successfully!`);
      // Refetch both the list and the specific product query
      queryClient.invalidateQueries({ queryKey: ['farmer-products'] });
      queryClient.invalidateQueries({ queryKey: ['product', updatedProduct.id] });
    },
    onError: () => {
      toast.error('Failed to update product.');
    },
  });
};

// Hook (Mutation) for deleting a product
export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct, // Assumes deleteProduct takes the product ID
    onSuccess: () => {
      toast.success('Product deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['farmer-products'] });
    },
    onError: () => {
      toast.error('Failed to delete product.');
    },
  });
};
