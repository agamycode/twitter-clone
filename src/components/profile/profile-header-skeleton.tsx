import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';

export const ProfileHeaderSkeleton = () => {
  return (
    <div>
      <div className='sticky top-0 z-10 flex items-center p-4 bg-background/80 backdrop-blur-sm'>
        <Link href='/' className='mr-6'>
          <ArrowLeft className='size-5' />
        </Link>
        <div>
          <Skeleton className='h-6 w-32' />
          <Skeleton className='h-4 w-20 mt-1' />
        </div>
      </div>
      <Skeleton className='w-full h-48' />
      <div className='px-4 pb-4 pt-2'>
        <div className='flex justify-between'>
          <Skeleton className='size-24 rounded-full mt-[-48px] border-4 border-background' />
          <Skeleton className='h-10 w-28 rounded-full' />
        </div>
        <div className='mt-4 space-y-2'>
          <Skeleton className='h-6 w-48' />
          <Skeleton className='h-4 w-32' />
          <Skeleton className='h-4 w-full' />
          <div className='flex space-x-4 mt-2'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-4 w-32' />
          </div>
          <div className='flex space-x-4'>
            <Skeleton className='h-4 w-20' />
            <Skeleton className='h-4 w-20' />
          </div>
        </div>
      </div>
    </div>
  );
};
