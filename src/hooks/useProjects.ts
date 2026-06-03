import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/src/api/apiClient';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'PLANIFIE' | 'EN_COURS' | 'URGENT' | 'SUSPENDU' | 'TERMINE';
  category: string;
  progress: number;
  startDate: string;
  endDate: string;
  manager: {
    firstName: string;
    lastName: string;
  };
  _count?: {
    tasks: number;
  };
}

export const useProjects = (filters?: any) => {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: async () => {
      const response = await apiClient.get<Project[]>('/projects', { params: filters });
      return response.data;
    },
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: async () => {
      const response = await apiClient.get<Project>(`/projects/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiClient.post('/projects', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
