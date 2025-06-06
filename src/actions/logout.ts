'use server';

import { revalidatePath } from 'next/cache';

import { signOut } from '@/auth';

export const logout = async () => {
  await signOut({ redirect: false });
  revalidatePath('/', 'layout');
};
