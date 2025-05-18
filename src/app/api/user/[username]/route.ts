import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { console } from 'inspector';
import { auth } from '@/auth';

export async function GET(req: Request, { params }: { params: Promise<{ username: string }> }) {
  try {
    const { username } = await params;

    const user = await db.user.findUnique({
      where: { username },
      select: {
        id: true,
        name: true,
        username: true,
        profileImage: true,
        coverImage: true,
        location: true,
        website: true,
        bio: true,
        createdAt: true,
        updatedAt: true,
        tweets: true,
        _count: {
          select: {
            followers: true,
            following: true,
            tweets: true
          }
        }
      }
    });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Get current user from session (if authenticated)
    const session = await auth();
    const currentUserId = session?.user?.id ? parseInt(session.user.id) : null;

     // Check if current user follows this profile
     let isFollowing = false;
     if (currentUserId) {
       const followRelationship = await db.follow.findUnique({
         where: {
           followerId_followingId: {
             followerId: currentUserId,
             followingId: user.id
           }
         }
       });
       isFollowing = !!followRelationship;
     }

    const { _count, ...userDetails } = user;

    const data = {
      ...userDetails,
      isFollowing,
      followersCount: _count.following,
      followingCount: _count.followers,
      tweetsCount: _count.tweets
    };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('GET_USER_ERROR', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
