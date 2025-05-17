import { User } from '@/validators/user';
import { HttpClient } from '@/features/api/http-client';
import { API_ENDPOINTS } from '@/features/api/api-endpoints';

export const followClient = {
  getFollowers: async (username: string) =>
    HttpClient.get<User[]>(`${API_ENDPOINTS.FOLLOW}/followers?username=${username}`),
  getFollowing: async (username: string) =>
    HttpClient.get<User[]>(`${API_ENDPOINTS.FOLLOW}/following?username=${username}`),
  toggle: async (targetUserId: number) =>
    HttpClient.post<{ message: string }>(`${API_ENDPOINTS.USER}/follow`, { targetUserId })
};
