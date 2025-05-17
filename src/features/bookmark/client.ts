import { Tweet } from '@/validators/tweet';
import { HttpClient } from '@/features/api/http-client';
import { API_ENDPOINTS } from '@/features/api/api-endpoints';

export const bookmarkClient = {
  all: async () => HttpClient.get<Tweet[]>(API_ENDPOINTS.BOOKMARKS),
  toggle: async (tweetId: number) => HttpClient.post<{ message: string }>(API_ENDPOINTS.BOOKMARKS, { tweetId })
};
