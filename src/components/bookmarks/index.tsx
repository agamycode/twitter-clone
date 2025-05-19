'use client';

import { MoreHorizontal } from 'lucide-react';

import { useBookmarks } from '@/features/bookmark/queries';

import { Button } from '@/components/ui/button';
import { TweetPost } from '@/components/tweet/tweet';
import { TweetsListSkeleton } from '@/components/tweet/tweets-list-skeleton';

export const BookmarksView = () => {
  const { tweets, isPending } = useBookmarks();

  if (isPending) {
    return <TweetsListSkeleton />;
  }
  return (
    <div>
      <div className='sticky top-0 z-10 bg-background/80 backdrop-blur-sm p-4 flex items-center justify-between'>
        <div>
          <h1 className='font-bold text-xl'>Bookmarks</h1>
        </div>
        <Button variant='ghost' size='icon' className='rounded-full'>
          <MoreHorizontal className='size-5' />
        </Button>
      </div>

      <div className='divide-y'>
        {tweets.length ? tweets.map((tweet) => <TweetPost key={tweet.id} tweet={tweet} />) : <div>No tweets</div>}
      </div>
    </div>
  );
};
