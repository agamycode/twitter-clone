import { User } from '@/validators/user';
import { HttpClient } from '@/features/api/http-client';
import { API_ENDPOINTS } from '@/features/api/api-endpoints';

export const userClient = {
  get: async (username: string) => HttpClient.get<User>(`${API_ENDPOINTS.USER}/${username}`)
};
