    'use client';

    import { useQuery } from '@tanstack/react-query';
    import { getFarmerOrders } from '../api/farmerService';

    export const useFarmerOrdersQuery = () => {
      return useQuery({
        queryKey: ['farmer-orders'],
        queryFn: getFarmerOrders,
      });
    };
    