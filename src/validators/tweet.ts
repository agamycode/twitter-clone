import { z } from 'zod';

export const TweetSchema = z.object({
  id: z.number(),
  content: z.string(),
  images: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
  likeCount: z.number(),
  replyCount: z.number(),
  userId: z.number(),
  parentId: z.number().nullable(),
  liked: z.boolean().optional(),
  bookmarked: z.boolean().optional(),
  user: z.object({
    name: z.string().nullable(),
    username: z.string(),
    profileImage: z.string().nullable()
  })
});

export type Tweet = z.infer<typeof TweetSchema>;

export const CreateTweetSchema = TweetSchema.pick({ content: true, images: true });

export type CreateTweet = z.infer<typeof CreateTweetSchema>;
