'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Heart, Repeat2, User, MessageCircle } from 'lucide-react';

import { Notification } from '@/validators/notification';

import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const NotificationsView = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch notifications
    setLoading(true);
    setTimeout(() => {
      setNotifications([
        {
          id: 1,
          type: 'LIKE',
          user: {
            name: 'Jane Smith',
            username: 'janesmith',
            profileImage: '/placeholder.svg?height=40&width=40'
          },
          message: 'liked your tweet',
          tweet: { content: 'Next.js 15 is amazing! The new features are game-changing.' },
          createdAt: '2h'
        },
        {
          id: 2,
          type: 'RETWEET',
          user: {
            name: 'John Doe',
            username: 'johndoe',
            profileImage: '/placeholder.svg?height=40&width=40'
          },
          message: 'retweeted your tweet',
          tweet: { content: 'Check out this cool React pattern I discovered!' },
          createdAt: '5h'
        },
        {
          id: 3,
          type: 'FOLLOW',
          user: {
            name: 'Tech News',
            username: 'technews',
            profileImage: '/placeholder.svg?height=40&width=40'
          },
          message: 'followed you',
          createdAt: '1d'
        },
        {
          id: 4,
          type: 'MENTION',
          user: {
            name: 'React Dev',
            username: 'reactdev',
            profileImage: '/placeholder.svg?height=40&width=40'
          },
          message: 'mentioned you',
          tweet: { content: 'Hey @username, what do you think about the new React 19 features?' },
          createdAt: '2d'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className='size-5 text-red-500' />;
      case 'retweet':
        return <Repeat2 className='size-5 text-green-500' />;
      case 'follow':
        return <User className='size-5 text-primary' />;
      case 'mention':
        return <MessageCircle className='size-5 text-primary' />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className='sticky top-0 z-10 bg-background/80 backdrop-blur-sm'>
        <h1 className='font-bold text-xl p-4'>Notifications</h1>
        <Tabs defaultValue='all' className='w-full'>
          <TabsList className='w-full grid grid-cols-2 rounded-none'>
            <TabsTrigger value='all'>All</TabsTrigger>
            <TabsTrigger value='mentions'>Mentions</TabsTrigger>
          </TabsList>
          <TabsContent value='all' className='mt-0 divide-y'>
            {loading ? (
              <>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className='p-4 flex space-x-4'>
                    <Skeleton className='size-10 rounded-full' />
                    <div className='space-y-2 flex-1'>
                      <div className='flex items-center space-x-2'>
                        <Skeleton className='h-4 w-24' />
                        <Skeleton className='h-4 w-16' />
                      </div>
                      <Skeleton className='h-4 w-full' />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {notifications.map((notification) => (
                  <div key={notification.id} className='p-4 hover:bg-muted/30 flex'>
                    <div className='mr-3 mt-1'>{getNotificationIcon(notification.type)}</div>
                    <div>
                      <div className='flex items-center space-x-2'>
                        <Link href={`/${notification.user.username}`} className='shrink-0'>
                          <div className='size-10 rounded-full overflow-hidden relative'>
                            <Image
                              fill
                              style={{ objectFit: 'cover', borderRadius: '100%' }}
                              alt={notification.user.name || 'Avatar'}
                              src={notification.user.profileImage || '/placeholder.svg'}
                            />
                          </div>
                        </Link>
                        <div>
                          <Link href={`/${notification.user.username}`} className='font-bold hover:underline'>
                            {notification.user.name}
                          </Link>
                          <span> {notification.message}</span>
                        </div>
                        <span className='text-sm text-muted-foreground ml-auto'>{notification.createdAt}</span>
                      </div>

                      {notification.tweet?.content && (
                        <p className='mt-2 text-muted-foreground'>{notification.tweet.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </TabsContent>

          <TabsContent value='mentions' className='mt-0'>
            <div className='p-4'>
              {loading ? (
                <>
                  {[1, 2].map((i) => (
                    <div key={i} className='p-4 flex space-x-4'>
                      <Skeleton className='size-10 rounded-full' />
                      <div className='space-y-2 flex-1'>
                        <div className='flex items-center space-x-2'>
                          <Skeleton className='h-4 w-24' />
                          <Skeleton className='h-4 w-16' />
                        </div>
                        <Skeleton className='h-4 w-full' />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {notifications
                    .filter((notification) => notification.type === 'MENTION')
                    .map((notification) => (
                      <div key={notification.id} className='p-4 hover:bg-muted/30 flex'>
                        <div className='mr-3 mt-1'>
                          <MessageCircle className='size-5 text-primary' />
                        </div>
                        <div>
                          <div className='flex items-center space-x-2'>
                            <Link href={`/${notification.user.username}`} className='shrink-0'>
                              <div className='size-10 rounded-full overflow-hidden relative'>
                                <Image
                                  fill
                                  style={{ objectFit: 'cover', borderRadius: '100%' }}
                                  alt={notification.user.name || 'Avatar'}
                                  src={notification.user.profileImage || '/placeholder.svg'}
                                />
                              </div>
                            </Link>
                            <div>
                              <Link href={`/${notification.user.username}`} className='font-bold hover:underline'>
                                {notification.user.name}
                              </Link>
                              <span> {notification.message}</span>
                            </div>
                            <span className='text-sm text-muted-foreground ml-auto'>{notification.createdAt}</span>
                          </div>

                          {notification.tweet?.content && (
                            <p className='mt-2 text-muted-foreground'>{notification.tweet.content}</p>
                          )}
                        </div>
                      </div>
                    ))}
                </>
              )}

              {!loading && notifications.filter((notification) => notification.type === 'MENTION').length === 0 && (
                <div className='text-center py-10'>
                  <p className='text-lg font-semibold'>No mentions yet</p>
                  <p className='text-muted-foreground'>When someone mentions you, you&apos;ll find it here.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
