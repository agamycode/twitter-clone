import { User } from '@/validators/user';
import { HttpClient } from '@/features/api/http-client';
import { API_ENDPOINTS } from '@/features/api/api-endpoints';

export const userClient = {
  all: async () => HttpClient.get<User[]>(API_ENDPOINTS.USER),
  get: async (username: string) => HttpClient.get<User>(`${API_ENDPOINTS.USER}/${username}`)
};
