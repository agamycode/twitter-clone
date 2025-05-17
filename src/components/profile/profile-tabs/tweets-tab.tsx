'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { TweetPost } from '@/components/tweet/tweet';
import { useUserTweets } from '@/features/tweet/queries';

export const ProfileTweetsTab = ({ username }: { username: string }) => {
  const { tweets, isPending } = useUserTweets(username);

  if (isPending) {
    return (
      <div className='divide-y'>
        {[1, 2, 3].map((i) => (
          <div key={i} className='p-4 flex space-x-4'>
            <Skeleton className='size-12 rounded-full' />
            <div className='space-y-2 flex-1'>
              <div className='flex items-center space-x-2'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-16' />
              </div>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-3/4' />
              <Skeleton className='h-32 w-full rounded-xl' />
              <div className='flex justify-between pt-2'>
                <Skeleton className='h-4 w-8' />
                <Skeleton className='h-4 w-8' />
                <Skeleton className='h-4 w-8' />
                <Skeleton className='h-4 w-8' />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='divide-y'>
      {tweets.length ? tweets.map((tweet) => <TweetPost key={tweet.id} tweet={tweet} />) : <div>No tweets</div>}
    </div>
  );
};
