'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { useFollowers } from '@/features/follow/queries';

import { Skeleton } from '@/components/ui/skeleton';
import { UserListItem } from '@/components/profile/user-list-item';

interface FollowersPageProps {
  username: string;
}

export const FollowersView = ({ username }: FollowersPageProps) => {
  const { followers, isPending } = useFollowers(username);
  return (
    <div>
      <div className='sticky top-0 z-10 flex items-center p-4 bg-background/80 backdrop-blur-sm'>
        <Link href={`/${username}`} className='mr-6'>
          <ArrowLeft className='size-5' />
        </Link>
        <div>
          <h1 className='font-bold text-xl'>Followers</h1>
          <p className='text-sm text-muted-foreground'>@{username}</p>
        </div>
      </div>

      <div className='divide-y'>
        {isPending ? (
          <>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className='p-4 flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <Skeleton className='size-12 rounded-full' />
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
          <>
            {followers.map((user) => (
              <UserListItem key={user.id} user={user} />
            ))}
          </>
        )}

        {!isPending && followers.length === 0 && (
          <div className='text-center py-10'>
            <p className='text-lg font-semibold'>@{username} doesn&apos;t have any followers yet</p>
            <p className='text-muted-foreground'>When someone follows them, they&apos;ll be listed here.</p>
          </div>
        )}
      </div>
    </div>
  );
};
