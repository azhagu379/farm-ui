import { axiosInstance } from '@/lib/axios';
import { type PlatformStats } from '../types';
import { Product } from '@/entities/product/types';
import { User } from '@/entities/user/types';

    export const getPlatformStats = async (): Promise<PlatformStats> => {
      const response = await axiosInstance.get('/admin/stats');
      return response.data;
    };
 export const getPendingProducts = async (): Promise<Product[]> => {
      const response = await axiosInstance.get('/admin/product-approvals');
      return response.data;
    };

    // NEW: Updates a product's status
    export const updateProductStatus = async ({
      productId,
      status,
    }: {
      productId: string;
      status: Product['status'];
    }): Promise<Product> => {
      const response = await axiosInstance.put(`/admin/product-approvals/${productId}`, { status });
      return response.data;
    };
    

    export const getAllUsers = async (): Promise<User[]> => {
      const response = await axiosInstance.get('/admin/users');
      return response.data;
    };

    export const updateUserRole = async ({
      userId,
      role,
    }: {
      userId: string;
      role: User['role'];
    }): Promise<User> => {
      const response = await axiosInstance.put(`/admin/users/${userId}`, { role });
      return response.data;
    };
    