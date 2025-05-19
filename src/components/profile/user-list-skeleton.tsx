import { Skeleton } from '@/components/ui/skeleton';

export const UserListSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className='p-4 flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <Skeleton className='size-12 rounded-full' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-4 w-24' />
            </div>
          </div>
          <Skeleton className='h-9 w-24 rounded-full' />
        </div>
      ))}
    </>
  );
};
