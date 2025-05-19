'use client';

import { useTweets } from '@/features/tweet/queries';

import { TweetPost } from '@/components/tweet/tweet';
import { TweetsListSkeleton } from '@/components/tweet/tweets-list-skeleton';

export const TweetList = () => {
  const { tweets, isPending } = useTweets();

  if (isPending) {
    return <TweetsListSkeleton />;
  }

  return (
    <div className='divide-y'>
      {tweets.map((tweet) => (
        <TweetPost key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};
