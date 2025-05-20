'use client';

import * as React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@/providers/theme-provider';

import { Toaster } from '@/components/ui/sonner';
import { LoginDialog } from '@/components/auth/login-dialog';
import { RegisterDialog } from '@/components/auth/signup-dialog';
import { EditProfileDialog } from '@/components/profile/edit-profile-dialog';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
          <LoginDialog />
          <RegisterDialog />
          <EditProfileDialog />
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
};
