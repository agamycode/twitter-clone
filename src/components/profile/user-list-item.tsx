'use client';

import Link from 'next/link';
import Image from 'next/image';

import type { User } from '@/validators/user';
import { useToggleFollow } from '@/features/follow/queries';

import { Button } from '@/components/ui/button';

export const UserListItem = ({ users }: { users: User[] }) => {
  const { isPending, mutate: toggleFollow } = useToggleFollow();
  return (
    <>
      {users.map((user) => (
        <div key={user.id} className='p-4 hover:bg-muted/30 flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <Link href={`/${user.username}`} className='shrink-0'>
              <div className='size-12 rounded-full overflow-hidden relative'>
                <Image
                  fill
                  style={{ objectFit: 'cover', borderRadius: '100%' }}
                  src={user.profileImage || '/placeholder/placeholder.svg'}
                  alt={user.name || 'Avatar'}
                />
              </div>
            </Link>
            <div>
              <Link href={`/${user.username}`} className='font-bold hover:underline'>
                {user.name}
              </Link>
              <div className='text-muted-foreground'>@{user.username}</div>
              <p className='text-sm mt-1 line-clamp-2'>{user.bio}</p>
            </div>
          </div>
          {
            <Button
              variant={user.isFollowing ? 'outline' : 'default'}
              className='rounded-full'
              disabled={isPending}
              onClick={() => toggleFollow(user.id)}>
              {user.isFollowing ? 'Following' : 'Follow'}
            </Button>
          }
        </div>
      ))}
    </>
  );
};
