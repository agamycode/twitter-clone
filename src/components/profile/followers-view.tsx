'use client';

import { useFollowers } from '@/features/follow/queries';

import { Header } from '@/components/layouts/header';
import { UserListItem } from '@/components/profile/user-list-item';
import { UserListSkeleton } from '@/components/profile/user-list-skeleton';

interface FollowersPageProps {
  username: string;
}

export const FollowersView = ({ username }: FollowersPageProps) => {
  const { followers, isPending } = useFollowers(username);
  return (
    <div>
      <Header title='Followers' subtitle={`@${username}`} />
      <div className='divide-y'>
        {isPending ? (
          <UserListSkeleton />
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
