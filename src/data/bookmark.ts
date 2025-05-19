import { db } from '@/lib/db';

export const getBookmarkByUserAndTweet = async (userId: number, tweetId: number) => {
  try {
    const bookmark = await db.bookmark.findUnique({ where: { userId_tweetId: { userId, tweetId } } });

    return bookmark;
  } catch {
    return null;
  }
};
