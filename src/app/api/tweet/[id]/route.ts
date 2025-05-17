import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ message: 'Tweet ID is required' }, { status: 400 });
    }

    const tweetId = parseInt(id, 10);
    if (isNaN(tweetId)) {
      return NextResponse.json({ message: 'Invalid tweet ID format' }, { status: 400 });
    }

    const tweet = await db.tweet.findUnique({
      where: { id: tweetId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            profileImage: true,
            isVerified: true
          }
        }
      }
    });

    if (!tweet) {
      return NextResponse.json({ message: 'Tweet not found' }, { status: 404 });
    }

    return NextResponse.json(tweet);
  } catch (error) {
    console.error('GET_TWEET_ERROR', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
