import { db } from '@/lib/db';

export const getTweetById = async (id: number) => {
  try {
    const tweet = await db.tweet.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            username: true,
            profileImage: true
          }
        }
      }
    });

    return tweet;
  } catch {
    return null;
  }
};

export const getTweetsByUserId = async (userId: number) => {
  try {
    const tweets = await db.tweet.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            name: true,
            username: true,
            profileImage: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return tweets;
  } catch {
    return [];
  }
};

export const getFeedTweets = async (limit = 20, cursor?: number) => {
  try {
    const tweets = await db.tweet.findMany({
      take: limit,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      where: {
        parentId: null // Only get top-level tweets, not replies
      },
      include: {
        user: {
          select: {
            name: true,
            username: true,
            profileImage: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const nextCursor = tweets.length === limit ? tweets[tweets.length - 1].id : undefined;

    return {
      tweets,
      nextCursor
    };
  } catch {
    return {
      tweets: [],
      nextCursor: undefined
    };
  }
};

export const getRepliesByTweetId = async (tweetId: number) => {
  try {
    const replies = await db.tweet.findMany({
      where: { parentId: tweetId },
      include: {
        user: {
          select: {
            name: true,
            username: true,
            profileImage: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return replies;
  } catch {
    return [];
  }
};