import { useQuery } from '@tanstack/react-query';
import apiClient from '@/src/api/apiClient';

export interface DashboardData {
  activeProjects: any[];
  statsCurrentMonth: {
    total: number;
    done: number;
    todo: number;
    inProgress: number;
  };
  allTasks: any[];
}

export const useDashboardMe = () => {
  return useQuery({
    queryKey: ['dashboard', 'me'],
    queryFn: async () => {
      const response = await apiClient.get<DashboardData>('/dashboard/me');
      return response.data;
    },
  });
};
