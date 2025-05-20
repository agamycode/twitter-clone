'use client';

import { useUsers } from '@/features/user/queries';

import { Header } from '@/components/layouts/header';
import { UserListItem } from '@/components/profile/user-list-item';
import { UserListSkeleton } from '@/components/profile/user-list-skeleton';

export const ConnectView = () => {
  const { users, isPending } = useUsers();
  return (
    <div>
      <Header title='Connect' />
      <div className='divide-y'>{isPending ? <UserListSkeleton /> : <UserListItem users={users} />}</div>
    </div>
  );
};
