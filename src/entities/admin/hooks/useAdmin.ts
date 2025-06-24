    'use client';

    import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
    import { toast } from 'sonner';
    import {  getPendingProducts, updateProductStatus } from '../api/adminService';


    // ... usePlatformStatsQuery remains the same ...

    // NEW: Hook to fetch pending products
    export const usePendingProductsQuery = () => {
      return useQuery({
        queryKey: ['pending-products'],
        queryFn: getPendingProducts,
      });
    };

    // NEW: Hook (Mutation) to approve/reject a product
    export const useUpdateProductStatusMutation = () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: updateProductStatus,
        onSuccess: (data) => {
          toast.success(`Product "${data.name}" has been ${data.status.toLowerCase()}.`);
          // Refetch pending products list to remove the approved/rejected item
          queryClient.invalidateQueries({ queryKey: ['pending-products'] });
          // Also refetch the main products list
          queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: () => {
          toast.error('Failed to update product status.');
        },
      });
    };
    