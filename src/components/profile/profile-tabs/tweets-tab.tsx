import { useUserTweets } from '@/features/tweet/queries';

import { TweetPost } from '@/components/tweet/tweet';
import { EmptyPage } from '@/components/layouts/empty-page';
import { TweetsListSkeleton } from '@/components/tweet/tweets-list-skeleton';

export const ProfileTweetsTab = ({ username }: { username: string }) => {
  const { tweets, isPending } = useUserTweets(username);

  if (isPending) {
    return <TweetsListSkeleton />;
  }

  return (
    <div className='divide-y'>
      {tweets.length ? (
        tweets.map((tweet) => <TweetPost key={tweet.id} tweet={tweet} />)
      ) : (
        <EmptyPage title='No tweets yet' />
      )}
    </div>
  );
};
