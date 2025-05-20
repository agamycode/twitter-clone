import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
  try {
    const { tweetId } = await req.json();
    if (!tweetId) {
      return NextResponse.json({ message: 'Tweet ID is required' }, { status: 400 });
    }

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    const tweet = await db.tweet.findUnique({ where: { id: tweetId }, select: { id: true } });
    if (!tweet) {
      return NextResponse.json({ message: 'Tweet not found' }, { status: 404 });
    }

    const existingBookmark = await db.bookmark.findUnique({ where: { userId_tweetId: { userId, tweetId } } });
    if (existingBookmark) {
      await db.bookmark.delete({ where: { userId_tweetId: { userId, tweetId } } });
      return NextResponse.json({ message: 'Removed from your Bookmarks', bookmarked: false });
    } else {
      await db.bookmark.create({ data: { userId, tweetId } });
      return NextResponse.json({ message: 'Added to your Bookmarks', bookmarked: true });
    }
  } catch (error) {
    console.error('TOGGLE_BOOKMARK_ERROR', error);
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

    const bookmarks = await db.tweet.findMany({
      where: { bookmarks: { some: { userId } } },
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

    const data = bookmarks.map((tweet) => ({
      ...tweet,
      liked: tweet.likes.length > 0,
      bookmarked: tweet.bookmarks.length > 0,
      // Remove the arrays to avoid sending too much data
      likes: undefined,
      bookmarks: undefined
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error('GET_BOOKMARK_ERROR', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
