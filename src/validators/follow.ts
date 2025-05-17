import { z } from 'zod';

export const FollowSchema = z.object({
  followerId: z.number(),
  followingId: z.number(),
  createdAt: z.date(),
  follower: z.object({
    name: z.string().nullable(),
    username: z.string(),
    profileImage: z.string().nullable()
  }),
  following: z.object({
    name: z.string().nullable(),
    username: z.string(),
    profileImage: z.string().nullable()
  })
});

export type Follow = z.infer<typeof FollowSchema>;