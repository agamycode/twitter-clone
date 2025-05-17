import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { auth } from '@/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  try {
    const { type } = await params;
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json({ message: 'Username is required' }, { status: 400 });
    }

    // Get the user by username
    const user = await db.user.findUnique({
      where: { username },
      select: { id: true }
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Get current user from session (if authenticated)
    const session = await auth();
    const currentUserId = session?.user?.id ? parseInt(session.user.id) : null;

    // Determine if we're getting followers or following
    if (type === 'followers') {
      // Get users who follow the specified user
      const followers = await db.follow.findMany({
        where: { followingId: user.id },
        include: {
          follower: {
            select: {
              id: true,
              name: true,
              username: true,
              profileImage: true,
              bio: true,
              isVerified: true,
              _count: {
                select: {
                  followers: true,
                  following: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      // If authenticated, check if current user follows each of these users
      const followersWithFollowStatus = await Promise.all(
        followers.map(async (follow) => {
          let isFollowing = false;

          if (currentUserId) {
            // Check if current user follows this follower
            const followRelationship = await db.follow.findUnique({
              where: {
                followerId_followingId: {
                  followerId: currentUserId,
                  followingId: follow.follower.id
                }
              }
            });
            isFollowing = !!followRelationship;
          }

          return {
            ...follow.follower,
            isFollowing,
            followersCount: follow.follower._count.following,
            followingCount: follow.follower._count.followers,
            _count: undefined
          };
        })
      );

      return NextResponse.json(followersWithFollowStatus);
    } else if (type === 'following') {
      // Get users who the specified user follows
      const following = await db.follow.findMany({
        where: { followerId: user.id },
        include: {
          following: {
            select: {
              id: true,
              name: true,
              username: true,
              profileImage: true,
              bio: true,
              isVerified: true,
              _count: {
                select: {
                  followers: true,
                  following: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      // If authenticated, check if current user follows each of these users
      const followingWithFollowStatus = await Promise.all(
        following.map(async (follow) => {
          let isFollowing = false;

          if (currentUserId) {
            // Check if current user follows this user
            const followRelationship = await db.follow.findUnique({
              where: {
                followerId_followingId: {
                  followerId: currentUserId,
                  followingId: follow.following.id
                }
              }
            });
            isFollowing = !!followRelationship;
          }

          return {
            ...follow.following,
            isFollowing,
            // Convert counts to numbers
            followersCount: follow.following._count.following,
            followingCount: follow.following._count.followers,
            _count: undefined
          };
        })
      );

      return NextResponse.json(followingWithFollowStatus);
    } else {
      return NextResponse.json({ message: 'Invalid type. Use "followers" or "following"' }, { status: 400 });
    }
  } catch (error) {
    console.error('GET_FOLLOW_ERROR', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
