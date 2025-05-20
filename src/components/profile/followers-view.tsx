'use client';

import { useFollowers } from '@/features/follow/queries';

import { Header } from '@/components/layouts/header';
import { EmptyPage } from '@/components/layouts/empty-page';
import { UserListItem } from '@/components/profile/user-list-item';
import { UserListSkeleton } from '@/components/profile/user-list-skeleton';

export const FollowersView = ({ username }: { username: string }) => {
  const { followers, isPending } = useFollowers(username);
  return (
    <div>
      <Header title='Followers' subtitle={`@${username}`} />
      <div className='divide-y'>
        {isPending ? <UserListSkeleton /> : <UserListItem users={followers} />}

        {!isPending && followers.length === 0 && (
          <EmptyPage
            title='Looking for followers?'
            description='When someone follows this account, they’ll show up here. Posting and interacting with others helps boost followers.'
          />
        )}
      </div>
    </div>
  );
};
