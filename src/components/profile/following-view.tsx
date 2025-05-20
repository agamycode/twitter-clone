'use client';

import { useFollowing } from '@/features/follow/queries';

import { Header } from '@/components/layouts/header';
import { EmptyPage } from '@/components/layouts/empty-page';
import { UserListItem } from '@/components/profile/user-list-item';
import { UserListSkeleton } from '@/components/profile/user-list-skeleton';

export const FollowingView = ({ username }: { username: string }) => {
  const { following, isPending } = useFollowing(username);
  return (
    <div>
      <Header title='Following' subtitle={`@${username}`} />
      <div className='divide-y'>
        {isPending ? <UserListSkeleton /> : <UserListItem users={following} />}

        {!isPending && following.length === 0 && (
          <EmptyPage
            title='Be in the know'
            description='Following accounts is an easy way to curate your timeline and know what’s happening with the topics and people you’re interested in.'
          />
          // <EmptyPage
          //   title={`@{username} isn’t following anyone`}
          //   description='Once they follow accounts, they’ll show up here.'
          // />
        )}
      </div>
    </div>
  );
};
