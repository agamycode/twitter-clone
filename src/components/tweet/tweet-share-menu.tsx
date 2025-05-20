import { toast } from 'sonner';
import { Share, Link2, LogOut } from 'lucide-react';

import { Tweet } from '@/validators/tweet';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export const TweetShareMenu = ({ tweet }: { tweet: Tweet }) => {
  const onCopyLink = async () => {
    const tweetUrl = `${window.location.origin}/${tweet.user.username}/status/${tweet.id}`;
    try {
      await navigator.clipboard.writeText(tweetUrl);
      toast.success('Copied to clipboard');
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const onShare = async () => {
    const tweetUrl = `${window.location.origin}/${tweet.user.username}/status/${tweet.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${tweet.user.name}'s Tweet`, text: tweet.content, url: tweetUrl });
      }
    } catch (err) {
      console.error('Failed to share:', err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='hover:text-primary'>
          <Share className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onCopyLink}>
          <Link2 className='size-4 text-foreground' />
          <span className='text-sm font-bold'>Copy link</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onShare}>
          <LogOut className='size-4 -rotate-90 text-foreground' />
          <span className='text-sm font-bold'>Share post via …</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
