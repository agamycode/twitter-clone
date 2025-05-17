import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { likeClient } from '@/features/like/client';
import { tweetKeys } from '@/features/tweet/queries';
import { handleApiError } from '@/features/api/api-error';
import { bookmarkKeys } from '@/features/bookmark/queries';

export const likeKeys = {
  all: ['likes'] as const,
  lists: () => [...likeKeys.all, 'list'] as const,
  list: (userId?: number) => [...likeKeys.lists(), { userId }] as const
};

export const useLikes = () => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: likeKeys.lists(),
    queryFn: () => likeClient.all()
  });
  return { tweets: data ?? [], isPending, isError, refetch };
};

export const useLikeToggle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likeClient.toggle,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: likeKeys.lists() });
      queryClient.invalidateQueries({ queryKey: bookmarkKeys.lists() });
      queryClient.invalidateQueries({ queryKey: tweetKeys.lists() });
    },
    onError: (error) => handleApiError(error)
  });
};
