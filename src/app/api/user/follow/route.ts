import { NextRequest, NextResponse } from 'next/server';
import { NotificationType } from '@prisma/client';

import { db } from '@/lib/db';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
  try {
    const { targetUserId } = await req.json();

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const followerId = parseInt(session.user.id);
    if (followerId === targetUserId) {
      return NextResponse.json({ message: 'Cannot follow yourself' }, { status: 400 });
    }

    const targetUser = await db.user.findUnique({ where: { id: targetUserId }, select: { id: true } });
    if (!targetUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const existingFollow = await db.follow.findUnique({
      where: { followerId_followingId: { followerId, followingId: targetUserId } }
    });
    if (existingFollow) {
      await db.follow.delete({ where: { followerId_followingId: { followerId, followingId: targetUserId } } });
      return NextResponse.json({ message: 'Unfollowed successfully' }, { status: 200 });
    } else {
      await db.follow.create({ data: { followerId, followingId: targetUserId } });
      await db.notification.create({
        data: { type: NotificationType.FOLLOW, message: 'followed you', userId: targetUserId, sourceUserId: followerId }
      });

      return NextResponse.json({ message: 'Followed successfully' }, { status: 200 });
    }
  } catch (error) {
    console.error('TOGGLE_FOLLOW_ERROR', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
