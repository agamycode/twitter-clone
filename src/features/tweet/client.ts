import { CreateTweet, Tweet } from '@/validators/tweet';
import { crudFactory } from '@/features/api/curd-factory';
import { API_ENDPOINTS } from '@/features/api/api-endpoints';
import { HttpClient } from '../api/http-client';

export const tweetClient = {
  ...crudFactory<Tweet, CreateTweet>(API_ENDPOINTS.TWEET),
  getUserTweets: (username: string) => HttpClient.get<Tweet[]>(`${API_ENDPOINTS.TWEET}/user/${username}`)
};
