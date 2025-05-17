'use client';

import { useState } from 'react';

import { useLoginDialog } from '@/store/use-login-dialog';
import { useSignUpDialog } from '@/store/use-signup-dialog';

import { TweetList } from '@/components/tweet/tweet-list';
import { TweetComposer } from '@/components/tweet/tweet-composer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from './ui/button';
import { useSession } from 'next-auth/react';
import { LogoutButton } from './auth/logout-button';

export const HomeFeed = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('for-you');
  const { onOpen: openRegister } = useSignUpDialog();
  const { onOpen } = useLoginDialog();

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
            <div className='flex space-x-2'>
              <Button variant='outline' className='rounded-full' onClick={onOpen}>
                Sign in
              </Button>
              <Button className='rounded-full' onClick={openRegister}>
                Sign up
              </Button>
              <LogoutButton>
                <Button variant='destructive' className='rounded-full'>
                  Sign out
                </Button>
              </LogoutButton>
              {JSON.stringify(session, null, 2)}
            </div>
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
