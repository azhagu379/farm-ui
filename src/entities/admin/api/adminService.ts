    import { api } from '@/app/api';
import { type PlatformStats } from '../types';

    export const getPlatformStats = async (): Promise<PlatformStats> => {
      const response = await api.get('/api/admin/stats');
      return response.data;
    };
