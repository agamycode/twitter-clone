import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: Promise<{ username: string }> }) {
  try {
    const { username } = await params;

    const user = await db.user.findUnique({ where: { username } });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const tweets = await db.tweet.findMany({
      where: { userId: user.id },
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
        likes: user.id
          ? {
              where: { userId: user.id }
            }
          : false,
        bookmarks: user.id
          ? {
              where: { userId: user.id }
            }
          : false
      }
    });

    const data = tweets.map((tweet) => ({
      ...tweet,
      liked: tweet.likes.length > 0,
      bookmarked: tweet.bookmarks.length > 0,
      // Remove the arrays to avoid sending too much data
      likes: undefined,
      bookmarks: undefined
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error('GET_USER_TWEETS_ERROR', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
