'use client';

import { useBookmarks } from '@/features/bookmark/queries';

import { Header } from '@/components/layouts/header';
import { TweetPost } from '@/components/tweet/tweet';
import { TweetsListSkeleton } from '@/components/tweet/tweets-list-skeleton';

export const BookmarksView = () => {
  const { tweets, isPending } = useBookmarks();

  if (isPending) {
    return <TweetsListSkeleton />;
  }
  return (
    <div>
      <Header title='Bookmarks' />

      <div className='divide-y'>
        {tweets.length ? tweets.map((tweet) => <TweetPost key={tweet.id} tweet={tweet} />) : <div>No tweets</div>}
      </div>
    </div>
  );
};
