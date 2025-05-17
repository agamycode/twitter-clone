import { z } from 'zod';
import { NotificationTypeSchema } from '@/validators/notification-type';

export const NotificationSchema = z.object({
  id: z.number(),
  type: NotificationTypeSchema,
  message: z.string(),
  read: z.boolean().optional(),
  createdAt: z.string(),
  userId: z.number().optional(),
  tweetId: z.number().optional(),
  user: z.object({
    name: z.string(),
    username: z.string(),
    profileImage: z.string()
  }),
  tweet: z
    .object({
      content: z.string()
    })
    .optional()
});

export type Notification = z.infer<typeof NotificationSchema>;
