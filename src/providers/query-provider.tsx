'use client';

import * as React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = {
  children: React.ReactNode;
};

export const QueryProvider = ({ children }: Props) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary>{children}</HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
