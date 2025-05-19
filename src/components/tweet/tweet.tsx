'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { MessageCircle, Repeat2, Heart, BarChart2, Share, MoreHorizontal, Bookmark, Link2, LogOut } from 'lucide-react';

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
import { toast } from 'sonner';

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

  const handleCopyLink = async () => {
    const tweetUrl = `${window.location.origin}/${user.username}/status/${id}`;
    try {
      await navigator.clipboard.writeText(tweetUrl);

      toast.success('Copied to clipboard');
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = async () => {
    const tweetUrl = `${window.location.origin}/${user.username}/status/${id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${user.name}'s Tweet`,
          text: content,
          url: tweetUrl
        });
      }
    } catch (err) {
      console.error('Failed to share:', err);
    }
  };

  return (
    <article className='hover:bg-muted/30 transition-colors outline-none cursor-pointer flex-row px-4'>
      <div className='shrink outline-none grow'>
        <div className='flex-row'>
          <div className='pt-3 basis-0 grow' />
        </div>
        <div className='flex'>
          <div className='grow-0 basis-10 items-center mr-2'>
            <Link href={`/${user.username}`} className='w-full cursor-pointer'>
              <div className='size-10 rounded-full overflow-hidden relative'>
                <Image
                  fill
                  style={{ borderRadius: '100%', objectFit: 'cover' }}
                  src={user.profileImage || '/placeholder/placeholder.svg'}
                  alt={user.name || 'Avatar'}
                />
              </div>
            </Link>
          </div>

          <div className='grow basis-0 justify-center pb-3'>
            <div className='flex items-start justify-between mb-0.5'>
              <div className='flex items-baseline shrink space-x-1 text-sm '>
                <div className=''>
                  <Link href={`/${user.username}`} className='font-bold hover:underline truncate'>
                    {user.name}
                  </Link>
                </div>

                <div className='ml-1'>
                  <div className='flex-row shrink items-baseline'>
                    <Link href={`/${user.username}`} className='text-muted-foreground hover:underline truncate'>
                      @{user.username}
                    </Link>
                    <span className='text-muted-foreground shrink-0 leading-5 break-words text-[15px] px-1'>·</span>
                    <Link href={`/${user.username}/status/${id}`} className='text-muted-foreground hover:underline'>
                      {createdAt ? format(new Date(createdAt), 'MMM dd') : ''}
                    </Link>
                  </div>
                </div>
              </div>

              <div className='ml-2'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='icon' className='size-8'>
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

            <div className='flex justify-between gap-1 mt-3 max-w-[600px] text-muted-foreground'>
              <div className='flex-row justify-start flex-1'>
                <Button variant='ghost' size='sm' className='flex items-center space-x-1 hover:text-primary'>
                  <MessageCircle className='size-4' />
                  <span>{replyCount > 0 ? replyCount : 0}</span>
                </Button>
              </div>

              <div className='flex-row justify-start flex-1'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='flex items-center space-x-1 hover:text-green-500'
                  onClick={handleRetweet}>
                  <Repeat2 className='size-4' />
                  <span>0</span>
                </Button>
              </div>

              <div className='flex-row justify-start flex-1'>
                <Button
                  variant='ghost'
                  size='sm'
                  className={`flex items-center space-x-1 hover:text-red-500 ${liked && 'text-red-500'}`}
                  onClick={() => toggleLike(id)}
                  disabled={likeIsPending}>
                  <Heart className={`size-4 ${liked && 'fill-red-500'}`} />
                  <span>{likeCount > 0 ? likeCount : 0}</span>
                </Button>
              </div>

              <div className='flex-row justify-start flex-1'>
                <Button variant='ghost' size='sm' className='flex items-center space-x-1 hover:text-primary'>
                  <BarChart2 className='size-4' />
                  <span>100</span>
                </Button>
              </div>

              <Button
                variant='ghost'
                size='icon'
                className={`hover:text-primary ${bookmarked && 'text-primary'}`}
                onClick={() => toggleBookmark(id)}
                disabled={bookmarkIsPending}>
                <Bookmark className={`size-4 ${bookmarked && 'fill-primary'}`} />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='icon' className='hover:text-primary'>
                    <Share className='size-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleCopyLink}>
                    <Link2 className='size-4 text-foreground' />
                    <span className='text-sm font-bold'>Copy link</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleShare}>
                    <LogOut className='size-4 -rotate-90 text-foreground' />
                    <span className='text-sm font-bold'>Share post via …</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
