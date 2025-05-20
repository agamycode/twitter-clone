'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Calendar, LinkIcon, MapPin } from 'lucide-react';

import { useUser } from '@/features/user/queries';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useToggleFollow } from '@/features/follow/queries';
import { useProfileDialog } from '@/store/use-profile-dialog';

import { Button } from '@/components/ui/button';
import { Header } from '@/components/layouts/header';
import { ProfileHeaderSkeleton } from '@/components/profile/profile-header-skeleton';

export const ProfileHeader = ({ username }: { username: string }) => {
  const currentUser = useCurrentUser();
  const { user, isPending } = useUser(username);
  const { onOpen } = useProfileDialog();
  const { isPending: isPendingFollow, mutate: toggleFollow } = useToggleFollow();

  if (isPending) {
    return <ProfileHeaderSkeleton />;
  }

  return (
    <div>
      <Header title={user?.name} subtitle={`${user?.followersCount || 0} Followers`} />

      <div className='relative'>
        <div className='h-48 bg-muted relative'>
          <Image
            fill
            style={{ objectFit: 'cover' }}
            src={user?.coverImage || '/placeholder/placeholder.svg'}
            alt='Cover'
          />
        </div>

        <div className='px-4 pb-4 pt-2'>
          <div className='flex justify-between'>
            <div className='size-24 rounded-full mt-[-48px] border-4 border-background overflow-hidden relative'>
              <Image
                fill
                style={{ objectFit: 'cover', borderRadius: '100%' }}
                src={user?.profileImage || '/placeholder/placeholder.svg'}
                alt={user?.name || 'Avatar'}
              />
            </div>

            {currentUser?.username === user?.username ? (
              <Button variant='outline' onClick={onOpen}>
                Edit Profile
              </Button>
            ) : (
              <Button
                variant={user?.isFollowing ? 'outline' : 'default'}
                disabled={isPendingFollow}
                onClick={() => user?.id && toggleFollow(user.id)}>
                {user?.isFollowing ? 'Following' : 'Follow'}
              </Button>
            )}
          </div>

          <div className='mt-4'>
            <h1 className='font-bold text-xl'>{user?.name}</h1>
            <p className='text-muted-foreground'>@{user?.username}</p>

            <p className='mt-3'>{user?.bio}</p>

            <div className='flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-muted-foreground'>
              {user?.location && (
                <div className='flex items-center'>
                  <MapPin className='size-4 mr-1' />
                  {user?.location}
                </div>
              )}

              {user?.website && (
                <div className='flex items-center'>
                  <LinkIcon className='size-4 mr-1' />
                  <a
                    href={`https://${user.website}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-primary hover:underline'>
                    {user.website}
                  </a>
                </div>
              )}

              <div className='flex items-center'>
                <Calendar className='size-4 mr-1' />
                Joined {user?.createdAt ? format(new Date(user.createdAt), 'MMMM yyyy') : ''}
              </div>
            </div>

            <div className='flex gap-4 mt-3 text-sm'>
              <Link href={`/${user?.username}/following`} className='hover:underline'>
                <span className='font-bold'>{user?.followingCount || 0}</span>
                <span className='text-muted-foreground'> Following</span>
              </Link>

              <Link href={`/${user?.username}/followers`} className='hover:underline'>
                <span className='font-bold'>{user?.followersCount || 0}</span>
                <span className='text-muted-foreground'> Followers</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
