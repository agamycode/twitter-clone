'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { MessageCircle, Repeat2, Heart, BarChart2, MoreHorizontal, Bookmark } from 'lucide-react';

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
import { TweetShareMenu } from '@/components/tweet/tweet-share-menu';

export const TweetPost = ({ tweet }: { tweet: Tweet }) => {
  const { isPending: likeIsPending, mutate: toggleLike } = useLikeToggle();
  const { isPending: bookmarkIsPending, mutate: toggleBookmark } = useBookmarkToggle();

  const onRetweet = () => {
    // Retweet functionality to be implemented
  };

  return (
    <article className='hover:bg-muted/30 transition-colors outline-none cursor-pointer flex-row px-4'>
      <div className='shrink outline-none grow'>
        <div className='flex-row'>
          <div className='pt-3 basis-0 grow' />
        </div>
        <div className='flex'>
          <div className='grow-0 basis-10 items-center mr-2'>
            <Link href={`/${tweet.user.username}`} className='w-full cursor-pointer'>
              <div className='size-10 rounded-full overflow-hidden relative'>
                <Image
                  fill
                  style={{ borderRadius: '100%', objectFit: 'cover' }}
                  src={tweet.user.profileImage || '/placeholder/placeholder.svg'}
                  alt={tweet.user.name || 'Avatar'}
                />
              </div>
            </Link>
          </div>

          <div className='grow basis-0 justify-center pb-3'>
            <div className='flex items-start justify-between mb-0.5'>
              <div className='flex items-baseline shrink space-x-1 text-sm '>
                <div className=''>
                  <Link href={`/${tweet.user.username}`} className='font-bold hover:underline truncate'>
                    {tweet.user.name}
                  </Link>
                </div>

                <div className='ml-1'>
                  <div className='flex-row shrink items-baseline'>
                    <Link href={`/${tweet.user.username}`} className='text-muted-foreground hover:underline truncate'>
                      @{tweet.user.username}
                    </Link>
                    <span className='text-muted-foreground shrink-0 leading-5 break-words text-[15px] px-1'>·</span>
                    <Link
                      href={`/${tweet.user.username}/status/${tweet.id}`}
                      className='text-muted-foreground hover:underline'>
                      {tweet.createdAt ? format(new Date(tweet.createdAt), 'MMM dd') : ''}
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
                    <DropdownMenuItem>Follow @{tweet.user.username}</DropdownMenuItem>
                    <DropdownMenuItem>Add/remove from Lists</DropdownMenuItem>
                    <DropdownMenuItem>Mute @{tweet.user.username}</DropdownMenuItem>
                    <DropdownMenuItem>Block @{tweet.user.username}</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='text-destructive'>Report Tweet</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className='mt-1'>
              <p className='whitespace-pre-wrap'>{tweet.content}</p>
            </div>

            {tweet.images.length > 0 && (
              <div
                className={`mt-3 grid gap-2 rounded-xl overflow-hidden ${
                  tweet.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
                }`}>
                {/* TODO: */}
                {tweet.images.map((img, index) => (
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
                  <span>{tweet.replyCount > 0 ? tweet.replyCount : 0}</span>
                </Button>
              </div>

              <div className='flex-row justify-start flex-1'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='flex items-center space-x-1 hover:text-green-500'
                  onClick={onRetweet}>
                  <Repeat2 className='size-4' />
                  <span>0</span>
                </Button>
              </div>

              <div className='flex-row justify-start flex-1'>
                <Button
                  variant='ghost'
                  size='sm'
                  className={`flex items-center space-x-1 hover:text-red-500 ${tweet.liked && 'text-red-500'}`}
                  onClick={() => toggleLike(tweet.id)}
                  disabled={likeIsPending}>
                  <Heart className={`size-4 ${tweet.liked && 'fill-red-500'}`} />
                  <span>{tweet.likeCount > 0 ? tweet.likeCount : 0}</span>
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
                className={`hover:text-primary ${tweet.bookmarked && 'text-primary'}`}
                onClick={() => toggleBookmark(tweet.id)}
                disabled={bookmarkIsPending}>
                <Bookmark className={`size-4 ${tweet.bookmarked && 'fill-primary'}`} />
              </Button>

              <TweetShareMenu tweet={tweet} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
