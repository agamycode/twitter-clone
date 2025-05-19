'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';

import { useUsers } from '@/features/user/queries';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export function RightSidebar() {
  const { users, isPending } = useUsers();

  return (
    <div className='h-full flex flex-col'>
      {/* Search - Fixed at top */}
      <div className='p-4 sticky top-0 bg-background z-10'>
        <div className='relative'>
          <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
          <Input placeholder='Search Twitter' className='pl-10 bg-muted border-none rounded-full' />
        </div>
      </div>

      {/* Scrollable content */}
      <div className='flex-1 overflow-y-auto p-4 space-y-6'>
        {/* Who to follow */}
        <div className='bg-muted/50 rounded-xl p-4'>
          <h2 className='font-bold text-xl mb-4'>Who to follow</h2>
          <div className='space-y-4'>
            {isPending ? (
              <>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className='flex items-center justify-between'>
                    <div className='flex items-center space-x-3'>
                      <Skeleton className='size-10 rounded-full' />
                      <div className='space-y-2'>
                        <Skeleton className='h-4 w-32' />
                        <Skeleton className='h-4 w-24' />
                      </div>
                    </div>
                    <Skeleton className='h-9 w-24 rounded-full' />
                  </div>
                ))}
              </>
            ) : (
              users.map((user, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <div className='flex items-center space-x-3'>
                    <div className='size-10 rounded-full bg-muted overflow-hidden relative'>
                      <Image
                        fill
                        style={{ borderRadius: '100%', objectFit: 'cover' }}
                        src={user.profileImage || '/placeholder/placeholder.svg'}
                        alt={user.name || 'Avatar'}
                      />
                    </div>
                    <div>
                      <p className='font-semibold'>{user.name}</p>
                      <p className='text-sm text-muted-foreground'>{user.username}</p>
                    </div>
                  </div>
                  <Button className='rounded-full' size='sm'>
                    Follow
                  </Button>
                </div>
              ))
            )}
          </div>
          <Link
            href={'/i/connect_people'}
            className='h-9 px-4 py-2 w-full inline-flex items-center justify-start mt-2 text-primary hover:text-primary/90 text-sm font-medium'>
            Show more
          </Link>
        </div>

        {/* Footer */}
        <div className='text-xs text-muted-foreground space-x-2'>
          <span className='hover:underline cursor-pointer'>Terms of Service</span>
          <span className='hover:underline cursor-pointer'>Privacy Policy</span>
          <span className='hover:underline cursor-pointer'>Cookie Policy</span>
          <span className='hover:underline cursor-pointer'>Accessibility</span>
          <span className='hover:underline cursor-pointer'>Ads info</span>
          <span className='hover:underline cursor-pointer'>More</span>
          <span>© 2025 Twitter Clone</span>
        </div>
      </div>
    </div>
  );
}
