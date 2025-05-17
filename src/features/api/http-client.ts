import axios, { AxiosRequestConfig } from 'axios';

import { signOut } from 'next-auth/react';

// Axios instance
const Axios = axios.create({
  baseURL: '/api',
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle authentication issues
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403) ||
      (error.response && error.response.data.message === 'NOT_AUTHORIZED')
    ) {
      signOut({ callbackUrl: '/' });
    }
    return Promise.reject(error);
  }
);

export class HttpClient {
  static async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const response = await Axios.get<T>(url, { params });
    return response.data;
  }

  static async post<T>(url: string, data: unknown, options?: AxiosRequestConfig): Promise<T> {
    const response = await Axios.post<T>(url, data, options);
    return response.data;
  }

  static async put<T>(url: string, data: unknown): Promise<T> {
    const response = await Axios.put<T>(url, data);
    return response.data;
  }

  static async delete<T>(url: string): Promise<T> {
    const response = await Axios.delete<T>(url);
    return response.data;
  }
  static async patch<T>(url: string, data: unknown): Promise<T> {
    const response = await Axios.patch<T>(url, data);
    return response.data;
  }
}
