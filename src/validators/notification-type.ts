import { z } from 'zod';

export const NotificationTypeSchema = z.enum([
  'LIKE',
  'REPLY',
  'FOLLOW',
  'MENTION',
  'RETWEET'
]);

export type NotificationType = z.infer<typeof NotificationTypeSchema>;