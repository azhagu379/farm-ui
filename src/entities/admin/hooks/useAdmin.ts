    'use client';

    import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
    import { toast } from 'sonner';
    import {  getAllUsers, getPendingProducts, updateProductStatus, updateUserRole } from '../api/adminService';


    export const usePendingProductsQuery = () => {
      return useQuery({
        queryKey: ['pending-products'],
        queryFn: getPendingProducts,
      });
    };

    export const useUpdateProductStatusMutation = () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: updateProductStatus,
        onSuccess: (data) => {
          toast.success(`Product "${data.name}" has been ${data.status.toLowerCase()}.`);
          queryClient.invalidateQueries({ queryKey: ['pending-products'] });
          queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: () => {
          toast.error('Failed to update product status.');
        },
      });
    };

    export const useUsersQuery = () => {
      return useQuery({
        queryKey: ['users'],
        queryFn: getAllUsers,
      });
    };

    export const useUpdateUserRoleMutation = () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: updateUserRole,
        onSuccess: (data) => {
          toast.success(`User ${data.name}'s role updated to ${data.role}.`);
          queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: () => {
          toast.error("Failed to update user's role.");
        },
      });
    };
    