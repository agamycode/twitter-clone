import { useLikes } from '@/features/like/queries';

import { TweetPost } from '@/components/tweet/tweet';
import { TweetsListSkeleton } from '@/components/tweet/tweets-list-skeleton';

export const ProfileLikesTab = () => {
  const { tweets, isPending } = useLikes();

  if (isPending) {
    return <TweetsListSkeleton />;
  }

  return (
    <div className='divide-y'>
      {tweets.length ? tweets.map((tweet) => <TweetPost key={tweet.id} tweet={tweet} />) : <div>No tweets</div>}
    </div>
  );
};
