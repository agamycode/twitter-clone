'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

import { useTweet } from '@/features/tweet/queries';

import { TweetComposer } from '@/components/tweet/tweet-composer';
import { TweetSkeleton } from '@/components/tweet/tweet-skeleton';

interface TweetDetailProps {
  id: string;
}

export const TweetDetail = ({ id }: TweetDetailProps) => {
  const { tweet, isPending } = useTweet(id);

  if (isPending) {
    return <TweetSkeleton />;
  }

  return (
    <div>
      <div className='sticky top-0 z-10 flex items-center p-4 bg-background/80 backdrop-blur-sm'>
        <Link href='/' className='mr-6'>
          <ArrowLeft className='size-5' />
        </Link>
        <h1 className='font-bold text-xl'>Tweet</h1>
      </div>

      <div className='p-4 border-b'>
        <div className='flex space-x-3'>
          <Link href={`/${tweet?.user.username}`} className='shrink-0'>
            <div className='size-12 rounded-full overflow-hidden relative'>
              <Image
                fill
                style={{ objectFit: 'cover', borderRadius: '100%' }}
                src={tweet?.user.profileImage || '/placeholder.svg'}
                alt={tweet?.user.name || 'Avatar'}
              />
            </div>
          </Link>

          <div className='flex-1 min-w-0'>
            <div className='flex flex-col'>
              <Link href={`/${tweet?.user.username}`} className='font-bold hover:underline'>
                {tweet?.user.name}
              </Link>
              <Link href={`/${tweet?.user.username}`} className='text-muted-foreground hover:underline'>
                @{tweet?.user.username}
              </Link>
            </div>

            <div className='mt-3'>
              <p className='text-xl whitespace-pre-wrap'>{tweet?.content}</p>
            </div>

            {tweet?.images.length && (
              <div className='mt-3 rounded-xl overflow-hidden'>
                {/* TODO: fix */}
                {tweet?.images.map((img: string, index: number) => (
                  <Image
                    key={index}
                    src={img || '/placeholder.svg'}
                    alt='Tweet media'
                    fill
                    style={{ objectFit: 'cover' }}
                    className='w-full h-auto object-cover'
                  />
                ))}
              </div>
            )}

            <div className='mt-3 text-muted-foreground text-sm'>
              <time>{tweet?.createdAt?.toString()}</time>
            </div>

            <div className='flex space-x-4 mt-3 py-3 border-y'>
              <div>
                <span className='font-bold'>{tweet?.replyCount}</span>
                <span className='text-muted-foreground'> Replies</span>
              </div>
              {/* <div>
                <span className='font-bold'>{tweet.stats.retweets}</span>
                <span className='text-muted-foreground'> Retweets</span>
              </div> */}
              <div>
                <span className='font-bold'>{tweet?.likeCount}</span>
                <span className='text-muted-foreground'> Likes</span>
              </div>
              <div>
                {/* TODO: Views */}
                <span className='font-bold'>0</span>
                <span className='text-muted-foreground'> Views</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='p-4 border-b'>
        <TweetComposer />
      </div>

      <div className='divide-y'>
        {/* TODO replies */}
        {/* {replies.map((reply) => (
          <TweetPost key={reply.id} tweet={reply} />
        ))} */}
      </div>
    </div>
  );
};
