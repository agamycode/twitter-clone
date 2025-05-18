import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleApiError } from '@/features/api/api-error';
import { notificationClient } from '@/features/notification/client';

export const notificationKeys = {
  all: ['notifications'] as const,
  lists: () => [...notificationKeys.all, 'list'] as const,
  list: (filters: string) => [...notificationKeys.lists(), { filters }] as const,
  details: () => [...notificationKeys.all, 'detail'] as const,
  detail: (id?: string) => [...notificationKeys.details(), { id }] as const
} as const;

export const useNotifications = () => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: notificationKeys.lists(),
    queryFn: () => notificationClient.all()
  });
  return { notifications: data ?? [], isPending, isError, refetch };
};

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => notificationClient.markAllAsRead(),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
    },
    onError: (error) => {
      handleApiError(error);
    }
  });
};
