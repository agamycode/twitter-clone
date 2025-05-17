'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { getUserByEmail } from '@/data/user';
import { type Login, LoginSchema } from '@/validators/auth';

export const login = async (values: Login) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, massage: 'Invalid fields!' };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { success: false, massage: 'Email does not exist!' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    return { success: true, massage: 'Login successful!' };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, massage: 'Invalid credentials!' };
        default:
          return { success: false, massage: 'Something went wrong!' };
      }
    }

    throw error;
  }
};
