import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/src/api/apiClient';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'A_FAIRE' | 'EN_COURS' | 'EN_ATTENTE' | 'BLOQUE' | 'TERMINE';
  priority: 'BASSE' | 'MOYENNE' | 'HAUTE' | 'CRITIQUE';
  plannedMonths: string[];
  deadline?: string;
  projectId: string;
  project?: { name: string };
  assignee: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export const useTasks = (filters?: any) => {
  return useQuery({
    queryKey: ['tasks', filters],
    queryFn: async () => {
      const response = await apiClient.get<Task[]>('/tasks', { params: filters });
      return response.data;
    },
  });
};

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status, comment }: { id: string; status: string; comment?: string }) => {
      const response = await apiClient.patch(`/tasks/${id}/status`, { status, comment });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};
