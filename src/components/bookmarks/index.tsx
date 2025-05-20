'use client';

import { useBookmarks } from '@/features/bookmark/queries';

import { Header } from '@/components/layouts/header';
import { TweetPost } from '@/components/tweet/tweet-post';
import { EmptyPage } from '@/components/layouts/empty-page';
import { TweetListSkeleton } from '@/components/tweet/tweet-list-skeleton';

export const BookmarksView = () => {
  const { tweets, isPending } = useBookmarks();

  if (isPending) {
    return <TweetListSkeleton />;
  }
  return (
    <div>
      <Header title='Bookmarks' />
      <div className='divide-y'>
        {tweets.length ? (
          tweets.map((tweet) => <TweetPost key={tweet.id} tweet={tweet} />)
        ) : (
          <EmptyPage
            title='Save posts for later'
            description='Bookmark posts to easily find them again in the future.'
          />
        )}
      </div>
    </div>
  );
};
