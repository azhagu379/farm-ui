'use client';

import { useQuery } from '@tanstack/react-query';
import { getFarmerProducts } from '../api/farmerProductService';

export const useFarmerProductsQuery = () => {
  return useQuery({
    queryKey: ['farmer-products'], // A unique key for this specific query
    queryFn: getFarmerProducts,
  });
};
