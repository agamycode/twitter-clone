'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { logout } from '@/actions/logout';

import { Button } from '@/components/ui/button';

export const LogoutButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => logout().then(() => router.push('/')));
  };
  return (
    <Button onClick={onClick} variant='outline' className='rounded-full' disabled={isPending}>
      Sign out
    </Button>
  );
};
