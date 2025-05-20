'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

interface Props {
  showBackButton?: boolean;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export const Header = ({ showBackButton = true, title, subtitle }: Props) => {
  const router = useRouter();

  return (
    <header className='sticky top-0 z-10 flex items-center h-[53px] px-4 bg-background/80 backdrop-blur-md border-b border-border/40'>
      {showBackButton && (
        <div className='min-w-14 flex items-center justify-start'>
          <Button size='icon' variant='ghost' onClick={() => router.back()} className='rounded-full size-9'>
            <ArrowLeft className='size-5' />
            <span className='sr-only'>Go back</span>
          </Button>
        </div>
      )}

      <div className='flex flex-col justify-center h-full grow'>
        <h2 className='font-bold text-xl leading-6 truncate'>{title || ''}</h2>
        {subtitle && <p className='text-[13px] text-muted-foreground leading-4 truncate'>{subtitle}</p>}
      </div>
    </header>
  );
};
