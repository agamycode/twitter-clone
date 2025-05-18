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
      excludeIds = following.map((f) => f.followingId);
      // Optionally, also exclude self
      excludeIds.push(currentUserId);
    }

    const users = await db.user.findMany({
      where: currentUserId ? { id: { notIn: excludeIds } } : undefined,
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

export async function PATCH(req: Request) {
  try {
    // Get current user from session
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    const body = await req.json();

    // Extract profile data from request body
    const { name, bio, location, website, profileImage, coverImage } = body;

    // Update user profile
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        name,
        bio,
        location,
        website,
        profileImage,
        coverImage
      },
      select: {
        id: true,
        name: true,
        username: true,
        bio: true,
        location: true,
        website: true,
        profileImage: true,
        coverImage: true,
        isVerified: true,
        createdAt: true
      }
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('UPDATE_USER_ERROR', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
