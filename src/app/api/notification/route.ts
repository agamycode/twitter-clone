import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const notifications = await db.notification.findMany({
      where: { userId: parseInt(session.user.id) },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            profileImage: true
          }
        },
        tweet: true
      }
    });

    return NextResponse.json(notifications);
  } catch (error) {
    console.error('GET_NOTIFICATIONS_ERROR', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function PATCH() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await db.notification.updateMany({
      where: { userId: parseInt(session.user.id), read: false },
      data: { read: true }
    });

    return NextResponse.json({ message: 'Notifications marked as read' });
  } catch (error) {
    console.error('UPDATE_NOTIFICATIONS_ERROR', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
