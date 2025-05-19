'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { useUsers } from '@/features/user/queries';

import { UserListItem } from '@/components/profile/user-list-item';
import { UserListSkeleton } from '@/components/profile/user-list-skeleton';

export const ConnectView = () => {
  const { users, isPending } = useUsers();
  return (
    <div>
      <div className='sticky top-0 z-10 flex items-center p-4 bg-background/80 backdrop-blur-sm'>
        <Link href='/' className='mr-6'>
          <ArrowLeft className='size-5' />
        </Link>
        <div>
          <h1 className='font-bold text-xl'>Connect</h1>
        </div>
      </div>

      <div className='divide-y'>
        {isPending ? (
          <UserListSkeleton />
        ) : (
          <>
            {users.map((user) => (
              <UserListItem key={user.id} user={user} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
