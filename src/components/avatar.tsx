'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

interface Props {
  userId: number;
  large?: boolean;
  border?: boolean;
}

export const Avatar = ({ userId, large, border }: Props) => {
  const router = useRouter();


  const onClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();

    if (user?.username) {
      router.push(`/${user.username}`);
    }
  };

  return (
    <div
      className={cn(
        border && 'border-4 border-black',
        large ? 'size-32' : 'size-12',
        'rounded-full hover:opacity-90 transition cursor-pointer relative'
      )}>
      <Image
        fill
        style={{ objectFit: 'cover', borderRadius: '100%' }}
        alt={user?.name || 'Avatar'}
        src={user?.profileImage || '/placeholder.png'}
        onClick={onClick}
      />
    </div>
  );
};
