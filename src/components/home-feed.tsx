'use client';

import { useState } from 'react';

import { TweetList } from '@/components/tweet/tweet-list';
import { TweetComposer } from '@/components/tweet/tweet-composer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const HomeFeed = () => {
  const [, setActiveTab] = useState('for-you');

  return (
    <Tabs defaultValue='for-you' onValueChange={setActiveTab}>
      <TabsList className='sticky top-0 z-10 bg-background/80 backdrop-blur-sm'>
        <TabsTrigger value='for-you'>For you</TabsTrigger>
        <TabsTrigger value='following'>Following</TabsTrigger>
      </TabsList>
      <TabsContent value='for-you'>
        <TweetComposer />
        <TweetList />
      </TabsContent>
      <TabsContent value='following'>
        <TweetComposer />
        <TweetList />
      </TabsContent>
    </Tabs>
  );
};
