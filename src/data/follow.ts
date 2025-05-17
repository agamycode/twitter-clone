import { db } from '@/lib/db';

export const getFollowersByUserId = async (userId: number) => {
  try {
    const followers = await db.follow.findMany({
      where: { followingId: userId },
      include: {
        follower: { select: { id: true, name: true, username: true, profileImage: true } }
      }
    });

    return followers.map((follow) => follow.follower);
  } catch {
    return [];
  }
};

export const getFollowingByUserId = async (userId: number) => {
  try {
    const following = await db.follow.findMany({
      where: { followerId: userId },
      include: {
        following: { select: { id: true, name: true, username: true, profileImage: true } }
      }
    });

    return following.map((follow) => follow.following);
  } catch {
    return [];
  }
};

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
