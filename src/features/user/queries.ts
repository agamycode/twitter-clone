import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { userClient } from '@/features/user/client';
import { UpdateProfile } from '@/validators/user';
import { handleApiError } from '../api/api-error';

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id?: string) => [...userKeys.details(), { id }] as const
} as const;

export const useUser = (username: string) => {
  const { data, isPending, isError, refetch } = useQuery({
    enabled: !!username,
    queryKey: userKeys.detail(username),
    queryFn: () => userClient.get(username)
  });
  return { user: data, isPending, isError, refetch };
};

export const useUsers = () => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: userKeys.details(),
    queryFn: () => userClient.all()
  });
  return { users: data ?? [], isPending, isError, refetch };
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfile) => userClient.update(data),
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(updatedUser.username) });
    },
    onError: (error) => {
      handleApiError(error);
    }
  });
};
