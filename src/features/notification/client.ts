import { HttpClient } from '@/features/api/http-client';
import { Notification } from '@/validators/notification';
import { API_ENDPOINTS } from '@/features/api/api-endpoints';

export const notificationClient = {
  all: async () => HttpClient.get<Notification[]>(API_ENDPOINTS.NOTIFICATION),
  markAllAsRead: async () => HttpClient.patch<{ message: string }>(API_ENDPOINTS.NOTIFICATION, '')
};
