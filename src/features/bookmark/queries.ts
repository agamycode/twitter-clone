import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { likeKeys } from '@/features/like/queries';
import { tweetKeys } from '@/features/tweet/queries';
import { handleApiError } from '@/features/api/api-error';
import { bookmarkClient } from '@/features/bookmark/client';

export const bookmarkKeys = {
  all: ['bookmarks'] as const,
  lists: () => [...bookmarkKeys.all, 'list'] as const,
  list: (userId?: number) => [...bookmarkKeys.lists(), { userId }] as const
};

export const useBookmarks = () => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: bookmarkKeys.lists(),
    queryFn: () => bookmarkClient.all()
  });
  return { tweets: data ?? [], isPending, isError, refetch };
};

export const useBookmarkToggle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookmarkClient.toggle,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: bookmarkKeys.lists() });
      queryClient.invalidateQueries({ queryKey: likeKeys.lists() });
      queryClient.invalidateQueries({ queryKey: tweetKeys.lists() });
    },
    onError: (error) => handleApiError(error)
  });
};
