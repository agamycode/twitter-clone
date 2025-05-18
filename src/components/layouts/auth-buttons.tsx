'use client';

import Image from 'next/image';

import { useCurrentUser } from '@/hooks/use-current-user';
import { useLoginDialog } from '@/store/use-login-dialog';
import { useSignUpDialog } from '@/store/use-signup-dialog';

import { Button } from '@/components/ui/button';
import { LogoutButton } from '@/components/auth/logout-button';

export function AuthButtons() {
  const currentUser = useCurrentUser();
  const { onOpen } = useLoginDialog();
  const { onOpen: openRegister } = useSignUpDialog();

  if (currentUser) {
    return (
      <div className='flex items-center justify-between w-full'>
        <div className='flex items-center space-x-2'>
          <div className='size-10 rounded-full bg-muted overflow-hidden xl:hidden relative'>
            <Image
              fill
              style={{ borderRadius: '100%', objectFit: 'cover' }}
              src={currentUser.image || '/placeholder.svg'}
              alt={currentUser?.name || 'Avatar'}
            />
          </div>
          <div className='lg:hidden'>
            <p className='font-semibold'>{currentUser?.name}</p>
            <p className='text-muted-foreground text-sm'>@{currentUser?.username}</p>
          </div>
        </div>

        <LogoutButton />
      </div>
    );
  }

  return (
    <div className='flex space-x-2 w-full'>
      <Button variant='outline' className='rounded-full w-1/2' onClick={onOpen}>
        Sign in
      </Button>
      <Button className='rounded-full w-1/2' onClick={openRegister}>
        Sign up
      </Button>
    </div>
  );
}
