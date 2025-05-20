import { Skeleton } from '@/components/ui/skeleton';
import { Header } from '@/components/layouts/header';
import { TweetListSkeleton } from '@/components/tweet/tweet-list-skeleton';

export const TweetDetailSkeleton = () => {
  return (
    <div>
      <Header title='Tweet' />
      <div className='p-4 border-b'>
        <div className='flex space-x-4'>
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
      </div>

      <div className='p-4 border-b'>
        <Skeleton className='h-32 w-full' />
      </div>

      <TweetListSkeleton />
    </div>
  );
};
