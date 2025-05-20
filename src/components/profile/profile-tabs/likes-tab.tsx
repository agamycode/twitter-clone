import { useLikes } from '@/features/like/queries';

import { TweetPost } from '@/components/tweet/tweet-post';
import { EmptyPage } from '@/components/layouts/empty-page';
import { TweetListSkeleton } from '@/components/tweet/tweet-list-skeleton';

export const ProfileLikesTab = () => {
  const { tweets, isPending } = useLikes();

  if (isPending) {
    return <TweetListSkeleton />;
  }

  return (
    <div className='divide-y'>
      {tweets.length ? (
        tweets.map((tweet) => <TweetPost key={tweet.id} tweet={tweet} />)
      ) : (
        <EmptyPage
          title='You don’t have any likes yet'
          description='Tap the heart on any post to show it some love. When you do, it’ll show up here.'
        />
      )}
    </div>
  );
};
