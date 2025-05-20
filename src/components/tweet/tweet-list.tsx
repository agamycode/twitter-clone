'use client';

import { useTweets } from '@/features/tweet/queries';

import { TweetPost } from '@/components/tweet/tweet-post';
import { TweetListSkeleton } from '@/components/tweet/tweet-list-skeleton';

export const TweetList = () => {
  const { tweets, isPending } = useTweets();

  if (isPending) {
    return <TweetListSkeleton />;
  }

  return (
    <div className='divide-y'>
      {tweets.map((tweet) => (
        <TweetPost key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};
