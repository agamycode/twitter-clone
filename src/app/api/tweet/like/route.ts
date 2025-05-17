import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { auth } from '@/auth';
import { getLikeByUserAndTweet } from '@/data/like';

export async function POST(req: NextRequest) {
  try {
    const { tweetId } = await req.json();

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    const tweet = await db.tweet.findUnique({ where: { id: tweetId }, select: { id: true, userId: true } });
    if (!tweet) {
      return NextResponse.json({ message: 'Tweet not found' }, { status: 404 });
    }

    const existingLike = await getLikeByUserAndTweet(userId, tweetId);
    if (existingLike) {
      await db.like.delete({ where: { userId_tweetId: { userId, tweetId } } });

      // Decrement the like count
      await db.tweet.update({ where: { id: tweetId }, data: { likeCount: { decrement: 1 } } });

      return NextResponse.json({ message: 'Tweet Unliked Successfully!' });
    } else {
      // Like the tweet
      await db.like.create({ data: { userId, tweetId } });

      // Increment the like count
      await db.tweet.update({ where: { id: tweetId }, data: { likeCount: { increment: 1 } } });

      // Create notification for the tweet author (if not the same user)
      if (tweet.userId !== userId) {
        await db.notification.create({
          data: { type: 'LIKE', message: 'liked your tweet', userId: tweet.userId, tweetId, sourceUserId: userId }
        });
      }

      return NextResponse.json({ message: 'Tweet Liked Successfully!' });
    }
  } catch (error) {
    console.error('TOGGLE_LIKE_ERROR', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    const likes = await db.tweet.findMany({
      where: { likes: { some: { userId } } },
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
        likes: userId
          ? {
              where: { userId }
            }
          : false,
        bookmarks: userId
          ? {
              where: { userId }
            }
          : false
      }
    });

    const data = likes.map((tweet) => ({
      ...tweet,
      liked: tweet.likes.length > 0,
      bookmarked: tweet.bookmarks.length > 0,
      // Remove the arrays to avoid sending too much data
      likes: undefined,
      bookmarks: undefined
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error('GET_LIKES_ERROR', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
