'use server';

import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { type Register, RegisterSchema } from '@/validators/auth';

export const register = async (values: Register) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, massage: 'Invalid fields!' };
  }

  const { email, password, name, username } = validatedFields.data;
  const passwordHash = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { success: false, massage: 'Email already in use!' };
  }

  await db.user.create({ data: { name, username, email, password: passwordHash } });

  return { success: true, massage: 'Successfully created an account!' };
};
