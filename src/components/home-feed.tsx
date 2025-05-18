'use client';

import { useState } from 'react';

import { TweetList } from '@/components/tweet/tweet-list';
import { TweetComposer } from '@/components/tweet/tweet-composer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const HomeFeed = () => {
  const [, setActiveTab] = useState('for-you');

  return (
    <div>
      <div className='sticky top-0 z-10 bg-background/80 backdrop-blur-sm'>
        <h1 className='font-bold text-xl p-4'>Home</h1>
        <Tabs defaultValue='for-you' className='w-full' onValueChange={setActiveTab}>
          <TabsList className='w-full grid grid-cols-2 rounded-none'>
            <TabsTrigger value='for-you'>For you</TabsTrigger>
            <TabsTrigger value='following'>Following</TabsTrigger>
          </TabsList>
          <TabsContent value='for-you' className='mt-0'>
            <TweetComposer />
            <TweetList />
          </TabsContent>
          <TabsContent value='following' className='mt-0'>
            <TweetComposer />
            <TweetList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
