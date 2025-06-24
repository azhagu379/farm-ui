    'use client';
    import { useQuery } from '@tanstack/react-query';
import { getPlatformStats } from '../api/adminService';

    export const usePlatformStatsQuery = () => {
      return useQuery({
        queryKey: ['platform-stats'],
        queryFn: getPlatformStats,
      });
    };
    