import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { content, images = [] } = await req.json();

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    await db.tweet.create({
      data: { content, images, userId },
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

    return NextResponse.json({ message: 'Tweet created successfully' }, { status: 201 });
  } catch (error) {
    console.error('CREATE_TWEET_ERROR', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const tweets = await db.tweet.findMany({
      orderBy: { createdAt: 'desc' },
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

    return NextResponse.json(tweets, { status: 200 });
  } catch (error) {
    console.error('GET_TWEETS_ERROR', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
