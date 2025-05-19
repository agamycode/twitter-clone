import { db } from '@/lib/db';

export const getFollowByUsers = async (followerId: number, followingId: number) => {
  try {
    const follow = await db.follow.findUnique({
      where: {
        followerId_followingId: { followerId, followingId }
      }
    });

    return follow;
  } catch {
    return null;
  }
};
