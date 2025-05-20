import { useUserTweets } from '@/features/tweet/queries';

import { TweetPost } from '@/components/tweet/tweet-post';
import { EmptyPage } from '@/components/layouts/empty-page';
import { TweetListSkeleton } from '@/components/tweet/tweet-list-skeleton';

export const ProfileTweetsTab = ({ username }: { username: string }) => {
  const { tweets, isPending } = useUserTweets(username);

  if (isPending) {
    return <TweetListSkeleton />;
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
