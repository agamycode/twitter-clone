'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Heart, Repeat2, User, MessageCircle } from 'lucide-react';

import { useNotifications } from '@/features/notification/queries';

import { Header } from '@/components/layouts/header';
import { EmptyPage } from '@/components/layouts/empty-page';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NotificationsSkeleton } from '@/components/notifications/notifications-skeleton';

export const NotificationsView = () => {
  const { notifications, isPending } = useNotifications();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'LIKE':
        return <Heart className='size-5 text-red-500' />;
      case 'RETWEET':
        return <Repeat2 className='size-5 text-green-500' />;
      case 'FOLLOW':
        return <User className='size-5 text-primary' />;
      case 'MENTION':
        return <MessageCircle className='size-5 text-primary' />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Header title='Notifications' showBackButton={false} />
      <Tabs defaultValue='all'>
        <TabsList>
          <TabsTrigger value='all'>All</TabsTrigger>
          <TabsTrigger value='mentions'>Mentions</TabsTrigger>
        </TabsList>
        <TabsContent value='all' className='divide-y'>
          {isPending ? (
            <NotificationsSkeleton />
          ) : (
            <>
              {notifications.map((notification) => (
                <div key={notification.id} className='p-4 hover:bg-muted/30 flex'>
                  <div className='mr-3 mt-1'>{getNotificationIcon(notification.type)}</div>
                  <div>
                    <div className='flex items-center space-x-2'>
                      <Link href={`/${notification.sourceUser.username}`} className='shrink-0'>
                        <div className='size-10 rounded-full overflow-hidden relative'>
                          <Image
                            fill
                            style={{ objectFit: 'cover', borderRadius: '100%' }}
                            alt={notification.sourceUser.name || 'Avatar'}
                            src={notification.sourceUser.profileImage || '/placeholder/placeholder.svg'}
                          />
                        </div>
                      </Link>
                      <div>
                        <Link href={`/${notification.sourceUser.username}`} className='font-bold hover:underline'>
                          {notification.sourceUser.name}
                        </Link>
                        <span> {notification.message}</span>
                      </div>
                      <span className='text-sm text-muted-foreground ml-auto'>
                        {format(new Date(notification.createdAt), 'MMM dd')}
                      </span>
                    </div>

                    {notification.tweet?.content && (
                      <p className='mt-2 text-muted-foreground'>{notification.tweet.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}

          {!isPending && notifications.length === 0 && (
            <EmptyPage
              title='Nothing to see here — yet'
              description='From likes to reposts and a whole lot more, this is where all the action happens.'
            />
          )}
        </TabsContent>

        <TabsContent value='mentions'>
          <div className='p-4'>
            {isPending ? (
              <NotificationsSkeleton count={2} />
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
                          <Link href={`/${notification.sourceUser.username}`} className='shrink-0'>
                            <div className='size-10 rounded-full overflow-hidden relative'>
                              <Image
                                fill
                                style={{ objectFit: 'cover', borderRadius: '100%' }}
                                alt={notification.sourceUser.name || 'Avatar'}
                                src={notification.sourceUser.profileImage || '/placeholder/placeholder.svg'}
                              />
                            </div>
                          </Link>
                          <div>
                            <Link href={`/${notification.sourceUser.username}`} className='font-bold hover:underline'>
                              {notification.sourceUser.name}
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

            {!isPending && notifications.filter((notification) => notification.type === 'MENTION').length === 0 && (
              <EmptyPage
                title='Nothing to see here — yet'
                description='When someone mentions you, you’ll find it here.'
              />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
