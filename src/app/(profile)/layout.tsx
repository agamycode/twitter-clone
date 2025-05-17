import type React from 'react';

import { Sidebar } from '@/components/layouts/sidebar';
import { RightSidebar } from '@/components/layouts/right-sidebar';
import { MobileNavigation } from '@/components/layouts/mobile-navigation';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen bg-background'>
      {/* Desktop Sidebar */}
      <div className='hidden md:flex md:w-64 lg:w-72 shrink-0 border-r'>
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className='flex-1 border-x max-w-2xl mx-auto w-full'>{children}</main>

      {/* Right Sidebar - Trending/Who to follow */}
      <div className='hidden lg:block lg:w-80 xl:w-96 shrink-0 pl-4'>
        <RightSidebar />
      </div>

      {/* Mobile Navigation */}
      <div className='md:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-10'>
        <MobileNavigation />
      </div>
    </div>
  );
};

export default MainLayout;
