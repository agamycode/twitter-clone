import { db } from '@/lib/db';

export const getLikesByTweetId = async (tweetId: number) => {
  try {
    const likes = await db.like.findMany({
      where: { tweetId },
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

    return likes;
  } catch {
    return [];
  }
};

export const getLikesByUserId = async (userId: number) => {
  try {
    const likes = await db.like.findMany({
      where: { userId },
      include: {
        tweet: {
          include: {
            user: {
              select: {
                name: true,
                username: true,
                profileImage: true
              }
            }
          }
        }
      }
    });

    return likes;
  } catch {
    return [];
  }
};

export const getLikeByUserAndTweet = async (userId: number, tweetId: number) => {
  try {
    const like = await db.like.findUnique({
      where: { userId_tweetId: { userId, tweetId } }
    });

    return like;
  } catch {
    return null;
  }
};
