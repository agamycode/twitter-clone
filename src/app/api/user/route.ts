import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { auth } from '@/auth';

export async function GET() {
  try {
    // Get current user from session (if authenticated)
    const session = await auth();
    const currentUserId = session?.user?.id ? parseInt(session.user.id) : null;

    let excludeIds: number[] = [];
    if (currentUserId) {
      // Get all users the current user is following
      const following = await db.follow.findMany({
        where: { followerId: currentUserId },
        select: { followingId: true }
      });
      excludeIds = following.map(f => f.followingId);
      // Optionally, also exclude self
      excludeIds.push(currentUserId);
    }

    const users = await db.user.findMany({
      where: currentUserId
        ? { id: { notIn: excludeIds } }
        : undefined,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        username: true,
        profileImage: true,
        isVerified: true
      }
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('GET_ALL_USERS_ERROR', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
