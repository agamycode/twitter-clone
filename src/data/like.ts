import { db } from '@/lib/db';

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
