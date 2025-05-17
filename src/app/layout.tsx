import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

import './globals.css';

import { auth } from '@/auth';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/providers/theme-provider';
import { QueryProvider } from '@/providers/query-provider';
import { DialogProvider } from '@/providers/dialog-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Twitter Clone',
  description: 'A Twitter clone built with Next.js and React'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang='en' suppressHydrationWarning>
        <body className={`${inter.className} antialiased`}>
          <QueryProvider>
            <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
              {children}
              <Toaster />
              <DialogProvider />
            </ThemeProvider>
          </QueryProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
