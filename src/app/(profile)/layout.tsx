import type React from 'react';

import { Sidebar } from '@/components/layouts/sidebar';
import { RightSidebar } from '@/components/layouts/right-sidebar';
import { MobileNavigation } from '@/components/layouts/mobile-navigation';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex justify-center bg-background min-h-svh'>
      <div className='flex w-full max-w-7xl'>
        {/* Desktop Sidebar - Fixed */}
        <div className='hidden md:block md:w-64 lg:w-72 shrink-0 sticky top-0 h-svh'>
          <Sidebar />
        </div>

        {/* Main Content - Scrollable */}
        <main className='flex-1 border-x w-full overflow-y-auto h-svh'>{children}</main>

        {/* Right Sidebar - Fixed with internal scroll */}
        <div className='hidden lg:block lg:w-80 xl:w-96 shrink-0 sticky top-0 h-svh'>
          <RightSidebar />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className='md:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-10'>
        <MobileNavigation />
      </div>
    </div>
  );
};

export default MainLayout;
