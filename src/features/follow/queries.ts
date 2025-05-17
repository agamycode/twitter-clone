import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { userKeys } from '@/features/user/queries';
import { followClient } from '@/features/follow/client';
import { handleApiError } from '@/features/api/api-error';

// Reuse the existing userKeys for caching
export const useFollowers = (username: string) => {
  const { data, isPending, isError, refetch } = useQuery({
    enabled: !!username,
    queryKey: [...userKeys.details(), 'followers', { username }],
    queryFn: () => followClient.getFollowers(username)
  });

  return { followers: data ?? [], isPending, isError, refetch };
};

export const useFollowing = (username: string) => {
  const { data, isPending, isError, refetch } = useQuery({
    enabled: !!username,
    queryKey: [...userKeys.details(), 'following', { username }],
    queryFn: () => followClient.getFollowing(username)
  });

  return { following: data ?? [], isPending, isError, refetch };
};

export const useToggleFollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: followClient.toggle,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: userKeys.detail() });
      queryClient.invalidateQueries({ queryKey: [...userKeys.details(), 'followers'] });
      queryClient.invalidateQueries({ queryKey: [...userKeys.details(), 'following'] });
    },
    onError: (error) => {
      handleApiError(error);
    }
  });
};
