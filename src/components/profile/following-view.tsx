'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { useFollowing } from '@/features/follow/queries';

import { UserListItem } from '@/components/profile/user-list-item';
import { UserListSkeleton } from '@/components/profile/user-list-skeleton';

interface FollowingPageProps {
  username: string;
}

export const FollowingView = ({ username }: FollowingPageProps) => {
  const { following, isPending } = useFollowing(username);

  return (
    <div>
      <div className='sticky top-0 z-10 flex items-center p-4 bg-background/80 backdrop-blur-sm'>
        <Link href={`/${username}`} className='mr-6'>
          <ArrowLeft className='size-5' />
        </Link>
        <div>
          <h1 className='font-bold text-xl'>Following</h1>
          <p className='text-sm text-muted-foreground'>@{username}</p>
        </div>
      </div>

      <div className='divide-y'>
        {isPending ? (
          <UserListSkeleton />
        ) : (
          <>
            {following.map((user) => (
              <UserListItem key={user.id} user={user} />
            ))}
          </>
        )}

        {!isPending && following.length === 0 && (
          <div className='text-center py-10'>
            <p className='text-lg font-semibold'>@{username} isn&apos;t following anyone</p>
            <p className='text-muted-foreground'>When they do, they&apos;ll be listed here.</p>
          </div>
        )}
      </div>
    </div>
  );
};
