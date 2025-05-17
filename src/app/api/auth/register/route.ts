import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { RegisterSchema } from '@/validators/auth';

export async function POST(req: NextRequest) {
  try {
    const values = await req.json();
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
      return NextResponse.json({ message: 'Invalid fields!' }, { status: 400 });
    }

    const { email, password, name, username } = validatedFields.data;
    const passwordHash = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return NextResponse.json({ message: 'Email already in use!' }, { status: 400 });
    }

    await db.user.create({ data: { name, username, email, password: passwordHash } });

    return NextResponse.json({ message: 'Successfully created an account!' });
  } catch (error) {
    console.error('REGISTER_ERROR', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
