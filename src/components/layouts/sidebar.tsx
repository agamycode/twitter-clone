'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Search, Bell, Bookmark, User, MoreHorizontal, Twitter, Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useLoginDialog } from '@/store/use-login-dialog';
import { useCallback } from 'react';

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const currentUser = useCurrentUser();
  const { onOpen } = useLoginDialog();

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Search, label: 'Explore', href: '/explore' },
    { icon: Bell, label: 'Notifications', href: '/notifications', auth: true },
    // { icon: Mail, label: 'Messages', href: '/messages' },
    { icon: Bookmark, label: 'Bookmarks', href: '/i/bookmarks', auth: true },
    { icon: User, label: 'Profile', href: `/${currentUser?.username}`, auth: true }
  ];

  const handleItemClick = useCallback(
    (href: string, auth: boolean) => {
      if (auth && !currentUser) {
        onOpen();
      } else if (href) {
        router.push(href);
      }
    },
    [currentUser, onOpen, router]
  );
  return (
    <div className='sticky top-0 h-svh flex flex-col p-4 justify-between'>
      <div className='space-y-6'>
        <Link href='/' className='flex items-center text-primary p-2 rounded-full size-12 hover:bg-primary/10'>
          <Twitter className='size-8' />
        </Link>

        <nav className='space-y-2'>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <div
                key={item.href}
                onClick={() => handleItemClick(item.href, item.auth || false)}
                className={`flex items-center space-x-4 px-4 py-3 rounded-full hover:bg-muted ${
                  isActive ? 'font-bold' : ''
                }`}>
                <item.icon className='w-6 h-6' />
                <span className='text-lg'>{item.label}</span>
              </div>
            );
          })}

          {/* <Button variant='outline' className='w-full mt-4 rounded-full'>
            <MoreHorizontal className='mr-2' />
            More
          </Button> */}
        </nav>

        <Button disabled={!currentUser} className='w-full rounded-full bg-primary hover:bg-primary/90'>
          Tweet
        </Button>
      </div>

      <div className='flex items-center justify-between p-4 mt-auto'>
        {currentUser && (
          <div className='flex items-center space-x-2'>
            <div className='size-10 rounded-full bg-muted'></div>
            <div className='hidden lg:block'>
              <p className='font-semibold'>{currentUser.name}</p>
              <p className='text-muted-foreground text-sm'>@{currentUser.username}</p>
            </div>
          </div>
        )}
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className='rounded-full'>
          {theme === 'dark' ? <Sun className='size-5' /> : <Moon className='size-5' />}
        </Button>
      </div>
    </div>
  );
};
