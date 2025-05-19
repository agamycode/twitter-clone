'use client';

import { useFollowing } from '@/features/follow/queries';

import { Header } from '@/components/layouts/header';
import { UserListItem } from '@/components/profile/user-list-item';
import { UserListSkeleton } from '@/components/profile/user-list-skeleton';

interface FollowingPageProps {
  username: string;
}

export const FollowingView = ({ username }: FollowingPageProps) => {
  const { following, isPending } = useFollowing(username);

  return (
    <div>
      <Header title='Following' subtitle={`@${username}`} />
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
