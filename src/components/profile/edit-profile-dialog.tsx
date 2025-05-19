'use client';

import type React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, LinkIcon, Calendar } from 'lucide-react';

import { useCurrentUser } from '@/hooks/use-current-user';
import { useProfileDialog } from '@/store/use-profile-dialog';
import { useUpdateProfile, useUser } from '@/features/user/queries';
import { type UpdateProfile, UpdateProfileSchema } from '@/validators/user';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/image-upload';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export function EditProfileDialog() {
  const { isOpen, onClose } = useProfileDialog();
  const currentUser = useCurrentUser();
  const { user, isPending: isPendingUser } = useUser(currentUser?.username || '');
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const form = useForm<UpdateProfile>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: '',
      bio: '',
      location: '',
      website: '',
      profileImage: '',
      coverImage: ''
    }
  });

  // Use useEffect to reset form when user data is available and dialog is open
  useEffect(() => {
    if (user && isOpen) {
      form.reset({
        name: user.name || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        profileImage: user.profileImage || '',
        coverImage: user.coverImage || ''
      });
    }
  }, [user, isOpen, form]);

  const onSubmit = (values: UpdateProfile) => {
    updateProfile({ ...values }, { onSuccess: onClose });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold'>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile information</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='coverImage'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUpload
                        variant='cover'
                        value={field.value}
                        onChange={field.onChange}
                        disabled={isPending || isPendingUser}
                        className='rounded-xl'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className='relative -mt-12 ml-4'>
                <FormField
                  control={form.control}
                  name='profileImage'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          onChange={field.onChange}
                          disabled={isPending || isPendingUser}
                          className='border-4 border-background'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className='space-y-4 pt-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          name='name'
                          type='text'
                          maxLength={50}
                          disabled={isPending || isPendingUser}
                          placeholder='Your name'
                        />
                        {/* <div className='text-xs text-muted-foreground text-right'>{field.value.length}/50</div> */}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='bio'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          maxLength={160}
                          disabled={isPending || isPendingUser}
                          className='resize-none h-20'
                        />
                      </FormControl>
                      {/* <div className='text-xs text-muted-foreground text-right'>{field.value.length}/160</div> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='location'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center gap-2'>
                        <MapPin className='h-4 w-4 text-muted-foreground' />
                        Location
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          name='location'
                          type='text'
                          maxLength={30}
                          disabled={isPending || isPendingUser}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='website'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center gap-2'>
                        <LinkIcon className='h-4 w-4 text-muted-foreground' />
                        Website
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          name='website'
                          type='text'
                          placeholder='example.com'
                          maxLength={100}
                          disabled={isPending || isPendingUser}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <Calendar className='h-4 w-4' />
                  <span>Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}</span>
                </div>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type='button' variant='outline' disabled={isPending || isPendingUser}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type='submit' disabled={isPending || isPendingUser}>
                {isPending ? 'Saving...' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
