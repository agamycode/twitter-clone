'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Bell, Mail } from 'lucide-react';

export const MobileNavigation = () => {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, href: '/' },
    { icon: Search, href: '/explore' },
    { icon: Bell, href: '/notifications' },
    { icon: Mail, href: '/messages' }
  ];

  return (
    <div className='flex justify-around items-center h-14'>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center justify-center size-12 rounded-full ${
              isActive ? 'text-primary' : 'text-foreground'
            } hover:bg-muted`}>
            <item.icon className='w-6 h-6' />
          </Link>
        );
      })}
    </div>
  );
};
