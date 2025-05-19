import { Skeleton } from '../ui/skeleton';

export const NotificationsSkeleton = ({ count = 4 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className='p-4 flex space-x-4'>
          <Skeleton className='size-10 rounded-full' />
          <div className='space-y-2 flex-1'>
            <div className='flex items-center space-x-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-4 w-16' />
            </div>
            <Skeleton className='h-4 w-full' />
          </div>
        </div>
      ))}
    </>
  );
};
