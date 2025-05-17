import { db } from '@/lib/db';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: number) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const user = await db.user.findUnique({ where: { username } });

    return user;
  } catch {
    return null;
  }
};

export const getUserProfile = async (username: string) => {
  try {
    const user = await db.user.findUnique({
      where: { username },
      select: {
        id: true,
        name: true,
        username: true,
        bio: true,
        profileImage: true,
        coverImage: true,
        website: true,
        location: true,
        birthDate: true,
        isVerified: true,
        createdAt: true,
        _count: {
          select: {
            tweets: true,
            following: true,
            followers: true
          }
        }
      }
    });

    return user;
  } catch {
    return null;
  }
};

export const searchUsers = async (query: string, limit = 10) => {
  try {
    if (!query || query.length < 1) {
      return [];
    }

    const users = await db.user.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: 'insensitive' } },
          { name: { contains: query, mode: 'insensitive' } }
        ]
      },
      select: {
        id: true,
        name: true,
        username: true,
        profileImage: true,
        isVerified: true
      },
      take: limit
    });

    return users;
  } catch {
    return [];
  }
};
