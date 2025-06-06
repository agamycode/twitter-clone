'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCallback } from 'react';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Search, Bell, Bookmark, User, Moon, Sun, MoreHorizontal, LogOut } from 'lucide-react';

import { useCurrentUser } from '@/hooks/use-current-user';
import { useLoginDialog } from '@/store/use-login-dialog';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LogoIcon } from '@/components/icons/twitter-logo';
import { LogoutButton } from '@/components/auth/logout-button';

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
    <div className='flex flex-col h-full'>
      {/* Top section with logo */}
      <div className='p-4'>
        <Link href='/' className='flex items-center text-primary p-2 rounded-full size-12 hover:bg-primary/10'>
          <LogoIcon className='size-8' />
        </Link>
      </div>

      {/* Middle scrollable section with nav items */}
      <nav className='space-y-1 px-4'>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <div
              key={item.href}
              onClick={() => handleItemClick(item.href, item.auth || false)}
              className={`inline-flex items-center space-x-4 px-4 py-3 rounded-full hover:bg-muted cursor-pointer ${
                isActive && 'font-bold'
              }`}>
              <item.icon className='size-6' />
              <span className='text-lg'>{item.label}</span>
            </div>
          );
        })}
      </nav>

      {/* Tweet button */}
      <div className='p-4 mt-2'>
        <Button disabled={!currentUser} className='w-full' variant='default'>
          Tweet
        </Button>
      </div>

      {/* Spacer to push profile section to bottom */}
      <div className='flex-grow'></div>

      {/* Bottom fixed section with profile and theme toggle */}
      <div className='p-4'>
        {currentUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='flex items-center justify-between p-2 rounded-full hover:bg-muted cursor-pointer'>
                <div className='flex items-center space-x-2'>
                  <div className='size-10 rounded-full bg-muted overflow-hidden relative'>
                    <Image
                      fill
                      style={{ borderRadius: '100%', objectFit: 'cover' }}
                      src={currentUser.image || '/placeholder/placeholder.svg'}
                      alt={currentUser?.name || 'Avatar'}
                    />
                  </div>
                  <div className='hidden lg:block'>
                    <p className='font-semibold'>{currentUser?.name}</p>
                    <p className='text-muted-foreground text-sm'>@{currentUser?.username}</p>
                  </div>
                </div>
                <MoreHorizontal className='w-5 h-5 text-muted-foreground hidden lg:block' />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-64' align='start' side='top' sideOffset={10}>
              <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? (
                  <>
                    <Sun className='mr-2 size-4' />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className='mr-2 size-4' />
                    Dark Mode
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <LogoutButton>
                <DropdownMenuItem variant='destructive'>
                  <LogOut className='mr-2 size-4' />
                  Logout
                </DropdownMenuItem>
              </LogoutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant='outline' className='w-full' onClick={onOpen}>
            Sign in
          </Button>
        )}
      </div>
    </div>
  );
};
