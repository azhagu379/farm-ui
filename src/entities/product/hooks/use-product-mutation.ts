    'use client';

    import { useMutation, useQueryClient } from '@tanstack/react-query';
    import { toast } from 'sonner';
    
    // We'll create this service function next
    import { createProduct } from '../api/productService'; 
    import { type Product } from '../types';

    // Define the shape of the data our form will send
    export type CreateProductPayload = Omit<Product, 'id' | 'status' | 'farmerId' | 'createdAt' | 'updatedAt'>;

    export const useCreateProductMutation = () => {
      const queryClient = useQueryClient();

      return useMutation({
        mutationFn: (newProduct: CreateProductPayload) => createProduct(newProduct),
        onSuccess: () => {
          toast.success('Product submitted successfully for approval!');
          // When a new product is created, we tell React Query to refetch the list
          // of farmer products to show the updated list.
          queryClient.invalidateQueries({ queryKey: ['farmer-products'] });
        },
        onError: () => {
          toast.error('Failed to submit product. Please try again.');
        },
      });
    };
    