'use client';

import { ProfileLikesTab } from '@/components/profile/profile-tabs/likes-tab';
import { ProfileTweetsTab } from '@/components/profile/profile-tabs/tweets-tab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
