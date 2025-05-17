import { db } from '@/lib/db';

export const getNotificationsByUserId = async (userId: number) => {
  try {
    const notifications = await db.notification.findMany({
      where: { userId },
      include: {
        tweet: {
          select: {
            content: true
          }
        },
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

    return notifications;
  } catch {
    return [];
  }
};

export const getUnreadNotificationsCount = async (userId: number) => {
  try {
    const count = await db.notification.count({
      where: {
        userId,
        read: false
      }
    });

    return count;
  } catch {
    return 0;
  }
};