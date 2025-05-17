import Image from 'next/image';
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const RightSidebar = () => {
  const trendingTopics = [
    { category: 'Sports', title: 'World Cup', tweets: '125K' },
    { category: 'Politics', title: 'Election Results', tweets: '98K' },
    { category: 'Entertainment', title: 'New Movie Release', tweets: '85K' },
    { category: 'Technology', title: 'Next.js 15', tweets: '65K' },
    { category: 'Business', title: 'Stock Market', tweets: '42K' }
  ];

  const whoToFollow = [
    { name: 'Jane Smith', username: '@janesmith', avatar: '/placeholder.svg?height=40&width=40' },
    { name: 'John Doe', username: '@johndoe', avatar: '/placeholder.svg?height=40&width=40' },
    { name: 'Tech News', username: '@technews', avatar: '/placeholder.svg?height=40&width=40' }
  ];

  return (
    <div className='p-4 space-y-6 sticky top-0 h-screen overflow-y-auto pb-20'>
      {/* Search */}
      <div className='relative'>
        <Search className='absolute left-3 top-3 size-4 text-muted-foreground' />
        <Input placeholder='Search Twitter' className='pl-10 bg-muted border-none rounded-full' />
      </div>

      {/* Trending */}
      <div className='bg-muted/50 rounded-xl p-4'>
        <h2 className='font-bold text-xl mb-4'>What&apos;s happening</h2>
        <div className='space-y-4'>
          {trendingTopics.map((topic, index) => (
            <div key={index} className='cursor-pointer hover:bg-muted rounded-lg p-2'>
              <p className='text-xs text-muted-foreground'>{topic.category} · Trending</p>
              <p className='font-semibold'>{topic.title}</p>
              <p className='text-xs text-muted-foreground'>{topic.tweets} Tweets</p>
            </div>
          ))}
        </div>
        <Button variant='ghost' className='w-full justify-start mt-2 text-primary'>
          Show more
        </Button>
      </div>

      {/* Who to follow */}
      <div className='bg-muted/50 rounded-xl p-4'>
        <h2 className='font-bold text-xl mb-4'>Who to follow</h2>
        <div className='space-y-4'>
          {whoToFollow.map((user, index) => (
            <div key={index} className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <div className='size-10 rounded-full bg-muted overflow-hidden relative'>
                  <Image
                    fill
                    style={{ objectFit: 'cover', borderRadius: '100%' }}
                    alt={user.name || 'Avatar'}
                    src={user.avatar || '/placeholder.svg'}
                  />
                </div>
                <div>
                  <p className='font-semibold'>{user.name}</p>
                  <p className='text-sm text-muted-foreground'>{user.username}</p>
                </div>
              </div>
              <Button className='rounded-full' size='sm'>
                Follow
              </Button>
            </div>
          ))}
        </div>
        <Button variant='ghost' className='w-full justify-start mt-2 text-primary'>
          Show more
        </Button>
      </div>

      {/* Footer */}
      <div className='text-xs text-muted-foreground space-x-2'>
        <span className='hover:underline cursor-pointer'>Terms of Service</span>
        <span className='hover:underline cursor-pointer'>Privacy Policy</span>
        <span className='hover:underline cursor-pointer'>Cookie Policy</span>
        <span className='hover:underline cursor-pointer'>Accessibility</span>
        <span className='hover:underline cursor-pointer'>Ads info</span>
        <span className='hover:underline cursor-pointer'>More</span>
        <span>© 2025 Twitter Clone</span>
      </div>
    </div>
  );
};
