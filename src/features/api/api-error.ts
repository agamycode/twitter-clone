import { toast } from 'sonner';
import { AxiosError, isAxiosError } from 'axios';

type ApiErrorResponse = {
  message: string;
  code?: string;
  status: number;
};

const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again later.';

const ERROR_MESSAGES: Record<number, string> = {
  400: 'Invalid request. Please check your input.',
  401: 'Please login to continue.',
  403: "You don't have permission to perform this action.",
  404: 'The requested resource was not found.',
  409: 'This resource already exists.',
  422: 'Invalid input. Please check your data.',
  429: 'Too many requests. Please try again later.',
  500: "Server error. We're working on it!",
  503: 'Service temporarily unavailable. Please try again later.'
};

export const handleApiError = (
  error: Error | AxiosError<ApiErrorResponse>,
  customMessages?: Record<number | string, string>,
  badRequestErrors?: Record<string, string>
) => {
  if (!isAxiosError(error)) {
    toast.error(DEFAULT_ERROR_MESSAGE);
    return;
  }

  const status = error.response?.status;
  const serverMessage = error.response?.data?.message;
  const errorCode = error.response?.data?.code;

  if (!status) {
    toast.error('Network error. Please check your connection.');
    return;
  }

  let errorMessage: string;

  if (status === 400) {
    if (errorCode && badRequestErrors?.[errorCode]) {
      errorMessage = badRequestErrors[errorCode];
    } else if (serverMessage && badRequestErrors?.[serverMessage]) {
      errorMessage = badRequestErrors[serverMessage];
    } else {
      errorMessage = customMessages?.[status] ?? ERROR_MESSAGES[status] ?? serverMessage ?? DEFAULT_ERROR_MESSAGE;
    }
  } else {
    errorMessage = customMessages?.[status] ?? ERROR_MESSAGES[status] ?? serverMessage ?? DEFAULT_ERROR_MESSAGE;
  }

  toast.error(errorMessage);
};
