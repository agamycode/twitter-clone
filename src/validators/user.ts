import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  bio: z.string(),
  profileImage: z.string(),
  coverImage: z.string(),
  website: z.string(),
  location: z.string(),
  birthDate: z.date(),
  isVerified: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),

  tweets: z.array(z.string()),
  likes: z.array(z.string()),
  bookmarks: z.array(z.string()),
  notifications: z.array(z.string()),
  following: z.array(z.string()),
  followers: z.array(z.string()),

  isFollowing: z.boolean().optional(),
  followersCount: z.number().optional(),
  followingCount: z.number().optional(),
  tweetsCount: z.number().optional()
});

export type User = z.infer<typeof UserSchema>;

export const UpdateProfileSchema = z.object({
  name: z.string(),
  bio: z.string(),
  location: z.string(),
  website: z.string(),
  profileImage: z.string(),
  coverImage: z.string()
});

export type UpdateProfile = z.infer<typeof UpdateProfileSchema>;
