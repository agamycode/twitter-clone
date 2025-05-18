'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileTweetsTab } from './tweets-tab';
import { ProfileLikesTab } from './likes-tab';

export const ProfileTabs = ({ username }: { username: string }) => {
  return (
    <Tabs defaultValue='tweets' className='w-full'>
      <TabsList className='w-full grid grid-cols-4 rounded-none'>
        <TabsTrigger value='tweets'>Tweets</TabsTrigger>
        <TabsTrigger value='likes'>Likes</TabsTrigger>
      </TabsList>
      <TabsContent value='tweets' className='mt-0'>
        <ProfileTweetsTab username={username} />
      </TabsContent>
      <TabsContent value='likes' className='mt-0'>
        <ProfileLikesTab />
      </TabsContent>
    </Tabs>
  );
};
