'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrders, createOrder } from '../api/orderService';
import { type CreateOrderPayload } from '../api/orderService';

// Hook to fetch all orders
export const useOrdersQuery = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });
};

// Hook (Mutation) to create a new order
export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => createOrder(payload),
    onSuccess: () => {
      // When a new order is created, invalidate the 'orders' query
      // to refetch the order list and show the new order.
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
