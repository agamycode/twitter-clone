'use client';

import { LoginDialog } from '@/components/auth/login-dialog';
import { RegisterDialog } from '@/components/auth/signup-dialog';

export const DialogProvider = () => {
  return (
    <>
      <LoginDialog />
      <RegisterDialog />
    </>
  );
};
