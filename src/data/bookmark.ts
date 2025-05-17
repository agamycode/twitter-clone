import { db } from '@/lib/db';

export const getBookmarksByUserId = async (userId: number) => {
  try {
    const bookmarks = await db.bookmark.findMany({
      where: { userId },
      include: {
        tweet: {
          include: {
            user: { select: { name: true, username: true, profileImage: true } }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return bookmarks;
  } catch {
    return [];
  }
};

export const getBookmarkByUserAndTweet = async (userId: number, tweetId: number) => {
  try {
    const bookmark = await db.bookmark.findUnique({ where: { userId_tweetId: { userId, tweetId } } });

    return bookmark;
  } catch {
    return null;
  }
};
