'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { MessageCircle, Repeat2, Heart, BarChart2, Share, MoreHorizontal, Bookmark } from 'lucide-react';

import type { Tweet } from '@/validators/tweet';
import { useLikeToggle } from '@/features/like/queries';
import { useBookmarkToggle } from '@/features/bookmark/queries';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface TweetProps {
  tweet: Tweet;
}

export const TweetPost = ({ tweet }: TweetProps) => {
  const { replyCount, likeCount, id, user, createdAt, content, images, liked, bookmarked } = tweet;
  const { isPending: likeIsPending, mutate: toggleLike } = useLikeToggle();
  const { isPending: bookmarkIsPending, mutate: toggleBookmark } = useBookmarkToggle();

  const handleRetweet = () => {
    // Retweet functionality to be implemented
  };

  return (
    <div className='p-4 hover:bg-muted/30 transition-colors'>
      <div className='flex space-x-3'>
        <Link href={`/${user.username}`} className='shrink-0'>
          <div className='size-12 rounded-full overflow-hidden relative'>
            <Image
              fill
              style={{ borderRadius: '100%', objectFit: 'cover' }}
              src={user.profileImage || '/placeholder/placeholder.svg'}
              alt={user.name || 'Avatar'}
            />
          </div>
        </Link>

        <div className='flex-1 min-w-0'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-1 text-sm'>
              <Link href={`/${user.username}`} className='font-bold hover:underline truncate'>
                {user.name}
              </Link>
              <Link href={`/${user.username}`} className='text-muted-foreground hover:underline truncate'>
                @{user.username}
              </Link>
              <span className='text-muted-foreground'>·</span>
              <Link href={`/${user.username}/status/${id}`} className='text-muted-foreground hover:underline'>
                {createdAt ? format(new Date(createdAt), 'MMM dd') : ''}
              </Link>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='size-8 rounded-full'>
                  <MoreHorizontal className='size-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem>Not interested in this tweet</DropdownMenuItem>
                <DropdownMenuItem>Follow @{user.username}</DropdownMenuItem>
                <DropdownMenuItem>Add/remove from Lists</DropdownMenuItem>
                <DropdownMenuItem>Mute @{user.username}</DropdownMenuItem>
                <DropdownMenuItem>Block @{user.username}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='text-destructive'>Report Tweet</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className='mt-1'>
            <p className='whitespace-pre-wrap'>{content}</p>
          </div>

          {images.length > 0 && (
            <div
              className={`mt-3 grid gap-2 rounded-xl overflow-hidden ${
                images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
              }`}>
              {/* TODO: */}
              {images.map((img, index) => (
                <Image
                  key={index}
                  src={img || '/placeholder/placeholder.svg'}
                  alt='Tweet media'
                  className='w-full h-auto object-cover'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              ))}
            </div>
          )}

          <div className='flex justify-between mt-3 text-muted-foreground'>
            <Button variant='ghost' size='sm' className='flex items-center space-x-1 hover:text-primary'>
              <MessageCircle className='size-4' />
              <span>{replyCount > 0 ? replyCount : ''}</span>
            </Button>

            <Button
              variant='ghost'
              size='sm'
              className='flex items-center space-x-1 hover:text-green-500'
              onClick={handleRetweet}>
              <Repeat2 className='size-4' />
              <span></span>
            </Button>

            <Button
              variant='ghost'
              size='sm'
              className={`flex items-center space-x-1 ${liked ? 'text-red-500' : 'hover:text-red-500'}`}
              onClick={() => toggleLike(id)}
              disabled={likeIsPending}>
              <Heart className={`size-4 ${liked ? 'fill-red-500' : ''}`} />
              <span>{likeCount > 0 ? likeCount : 0}</span>
            </Button>

            <Button variant='ghost' size='sm' className='flex items-center space-x-1 hover:text-primary'>
              <BarChart2 className='size-4' />
              <span></span>
            </Button>

            <Button
              variant='ghost'
              size='sm'
              className={`flex items-center space-x-1 ${bookmarked ? 'text-primary' : 'hover:text-primary'}`}
              onClick={() => toggleBookmark(id)}
              disabled={bookmarkIsPending}>
              <Bookmark className={`size-4 ${bookmarked ? 'fill-primary' : ''}`} />
            </Button>

            <Button variant='ghost' size='sm' className='flex items-center hover:text-primary'>
              <Share className='size-4' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
