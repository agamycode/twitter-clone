'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCallback } from 'react';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Search, Bell, Bookmark, User, Twitter, Moon, Sun } from 'lucide-react';

import { useCurrentUser } from '@/hooks/use-current-user';
import { useLoginDialog } from '@/store/use-login-dialog';

import { Button } from '@/components/ui/button';
import { AuthButtons } from '@/components/layouts/auth-buttons';

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
    <div
      // ref={sidebarRef}
      className='flex flex-col h-full'>
      {/* Top section with logo */}
      <div className='p-4'>
        <Link href='/' className='flex items-center text-primary p-2 rounded-full size-12 hover:bg-primary/10'>
          <Twitter className='size-8' />
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
              className={`flex items-center space-x-4 px-4 py-3 rounded-full hover:bg-muted cursor-pointer ${
                isActive && 'font-bold'
              }`}>
              <item.icon className={`size-6 ${isActive && 'fill-primary'}`} />
              <span className='text-lg'>{item.label}</span>
            </div>
          );
        })}

        {/* {overflowNavItems.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className='flex items-center space-x-4 px-4 py-3 rounded-full hover:bg-muted w-full text-left'>
                <MoreHorizontal className='size-6' />
                <span className='text-lg'>More</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start' className='w-56'>
              {overflowNavItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href} className='flex items-center space-x-2 cursor-pointer'>
                    <item.icon className='w-4 h-4' />
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )} */}
      </nav>

      {/* Tweet button */}
      <div className='p-4 mt-2'>
        <Button disabled={!currentUser} className='w-full rounded-full' variant='default'>
          Tweet
        </Button>
      </div>

      {/* Spacer to push profile section to bottom */}
      <div className='flex-grow'></div>

      {/* Bottom fixed section with profile and theme toggle */}
      <div className='border-t p-4 space-y-4'>
        <AuthButtons />
        <div className='flex items-center justify-between'>
          {' '}
          {currentUser && (
            <div className='flex items-center space-x-2'>
              <div className='size-10 rounded-full bg-muted overflow-hidden relative'>
                <Image
                  fill
                  style={{ borderRadius: '100%', objectFit: 'cover' }}
                  src={currentUser.image || '/placeholder.svg'}
                  alt={currentUser?.name || 'Avatar'}
                />
              </div>
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
    </div>
  );
};
