'use client';

import { ProfileLikesTab } from '@/components/profile/profile-tabs/likes-tab';
import { ProfileTweetsTab } from '@/components/profile/profile-tabs/tweets-tab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const ProfileTabs = ({ username }: { username: string }) => {
  return (
    <Tabs defaultValue='tweets'>
      <TabsList className='grid grid-cols-4'>
        <TabsTrigger value='tweets'>Tweets</TabsTrigger>
        <TabsTrigger value='likes'>Likes</TabsTrigger>
      </TabsList>
      <TabsContent value='tweets'>
        <ProfileTweetsTab username={username} />
      </TabsContent>
      <TabsContent value='likes'>
        <ProfileLikesTab />
      </TabsContent>
    </Tabs>
  );
};
