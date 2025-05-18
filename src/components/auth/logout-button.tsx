'use client';

import { useTransition } from 'react';

import { logout } from '@/actions/logout';

interface Props {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: Props) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      logout().then(() => {
        window.location.reload();
      });
    });
  };
  return (
    <span onClick={onClick} className='cursor-pointer' aria-disabled={isPending}>
      {children}
    </span>
  );
};
