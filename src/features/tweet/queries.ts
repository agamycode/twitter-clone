import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { CreateTweet } from '@/validators/tweet';
import { tweetClient } from '@/features/tweet/client';
import { handleApiError } from '@/features/api/api-error';

export const tweetKeys = {
  all: ['tweets'] as const,
  lists: () => [...tweetKeys.all, 'list'] as const,
  list: (filters: string) => [...tweetKeys.lists(), { filters }] as const,
  details: () => [...tweetKeys.all, 'detail'] as const,
  detail: (id?: string) => [...tweetKeys.details(), { id }] as const
} as const;

export const useTweet = (id: string) => {
  const { data, isPending, isError, refetch } = useQuery({
    enabled: !!id,
    queryKey: tweetKeys.detail(id),
    queryFn: () => tweetClient.get({ slug: id })
  });
  return { tweet: data, isPending, isError, refetch };
};

export const useTweets = () => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: tweetKeys.lists(),
    queryFn: () => tweetClient.all({})
  });
  return { tweets: data ?? [], isPending, isError, refetch };
};

export const useCreateTweet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTweet) => tweetClient.create(data),
    onSuccess: () => {
      toast.success('Tweet created successfully');
      queryClient.invalidateQueries({ queryKey: tweetKeys.lists() });
    },
    onError: (error) => handleApiError(error)
  });
};

export const useUserTweets = (username: string) => {
  const { data, isPending, isError, refetch } = useQuery({
    enabled: !!username,
    queryKey: [...tweetKeys.lists(), { username }],
    queryFn: () => tweetClient.getUserTweets(username)
  });
  return { tweets: data ?? [], isPending, isError, refetch };
};
