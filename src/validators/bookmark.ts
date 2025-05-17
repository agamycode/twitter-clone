import { z } from 'zod';

export const BookmarkSchema = z.object({
  id: z.number(),
  createdAt: z.date(),
  userId: z.number(),
  tweetId: z.number(),
  user: z.object({
    name: z.string().nullable(),
    username: z.string(),
    profileImage: z.string().nullable()
  }),
  tweet: z.object({
    content: z.string(),
    images: z.array(z.string())
  })
});

export type Bookmark = z.infer<typeof BookmarkSchema>;