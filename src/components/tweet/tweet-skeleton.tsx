import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { TweetsListSkeleton } from '@/components/tweet/tweets-list-skeleton';

export const TweetSkeleton = () => {
  return (
    <div>
      <div className='sticky top-0 z-10 flex items-center p-4 bg-background/80 backdrop-blur-sm'>
        <Link href='/' className='mr-6'>
          <ArrowLeft className='size-5' />
        </Link>
        <h1 className='font-bold text-xl'>Tweet</h1>
      </div>

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

      <TweetsListSkeleton />
    </div>
  );
};
