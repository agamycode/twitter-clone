'use client';

import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { TweetList } from '@/components/tweet/tweet-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const ExploreView = () => {
  const [trendingTopics, setTrendingTopics] = useState<
    Array<{
      category: string;
      title: string;
      tweets: string;
    }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch trending topics
    setLoading(true);
    setTimeout(() => {
      setTrendingTopics([
        { category: 'Technology', title: 'Next.js 15', tweets: '125K' },
        { category: 'Sports', title: 'World Cup', tweets: '450K' },
        { category: 'Entertainment', title: 'New Movie Release', tweets: '85K' },
        { category: 'Business', title: 'Stock Market', tweets: '42K' },
        { category: 'Politics', title: 'Election Results', tweets: '320K' },
        { category: 'Science', title: 'Space Exploration', tweets: '65K' },
        { category: 'Health', title: 'New Medical Research', tweets: '28K' },
        { category: 'Gaming', title: 'New Game Release', tweets: '95K' },
        { category: 'Music', title: 'Album Release', tweets: '110K' },
        { category: 'Fashion', title: 'Fashion Week', tweets: '75K' }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <div className='sticky top-0 z-10 bg-background/80 backdrop-blur-sm p-4'>
        <div className='relative'>
          <Search className='absolute left-3 top-3 size-4 text-muted-foreground' />
          <Input placeholder='Search Twitter' className='pl-10 bg-muted border-none rounded-full' />
        </div>
      </div>

      <Tabs defaultValue='for-you' className='w-full'>
        <TabsList className='w-full grid grid-cols-2 rounded-none'>
          <TabsTrigger value='for-you'>For you</TabsTrigger>
          <TabsTrigger value='trending'>Trending</TabsTrigger>
        </TabsList>

        <TabsContent value='for-you' className='mt-0'>
          <div className='p-4 border-b'>
            <h2 className='font-bold text-xl'>Trends for you</h2>
          </div>

          {loading ? (
            <div className='divide-y'>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className='p-4'>
                  <Skeleton className='h-4 w-24 mb-1' />
                  <Skeleton className='h-5 w-48 mb-1' />
                  <Skeleton className='h-4 w-32' />
                </div>
              ))}
            </div>
          ) : (
            <div className='divide-y'>
              {trendingTopics.map((topic, index) => (
                <div key={index} className='p-4 hover:bg-muted/30 cursor-pointer'>
                  <p className='text-xs text-muted-foreground'>{topic.category} · Trending</p>
                  <p className='font-bold'>{topic.title}</p>
                  <p className='text-sm text-muted-foreground'>{topic.tweets} Tweets</p>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value='trending' className='mt-0'>
          <TweetList />
        </TabsContent>
      </Tabs>
    </div>
  );
};
