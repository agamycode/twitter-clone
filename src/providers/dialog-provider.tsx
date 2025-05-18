'use client';

import { LoginDialog } from '@/components/auth/login-dialog';
import { RegisterDialog } from '@/components/auth/signup-dialog';
import { EditProfileDialog } from '@/components/profile/edit-profile-dialog';

export const DialogProvider = () => {
  return (
    <>
      <LoginDialog />
      <RegisterDialog />
      <EditProfileDialog />
    </>
  );
};
