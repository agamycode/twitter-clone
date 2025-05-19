'use client';

import type React from 'react';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { register } from '@/actions/register';
import { useLoginDialog } from '@/store/use-login-dialog';
import { useSignUpDialog } from '@/store/use-signup-dialog';
import { type Register, RegisterSchema } from '@/validators/auth';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export function RegisterDialog() {
  const { isOpen: isRegisterOpen, onClose: closeRegister } = useSignUpDialog();
  const { onOpen } = useLoginDialog();

  const [isPending, startTransition] = useTransition();

  const form = useForm<Register>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = (values: Register) => {
    startTransition(() => {
      register(values).then((data) => {
        if (data?.success === false) {
          form.reset();
          toast.error(data.massage);
        }

        if (data?.success === true) {
          form.reset();
          toast.success(data.massage);
          closeRegister();
        }
      });
    });
  };

  const switchToLogin = () => {
    closeRegister();
    onOpen();
  };

  return (
    <Dialog open={isRegisterOpen} onOpenChange={closeRegister}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold'>Create your account</DialogTitle>
          <DialogDescription>Fill in your details to create a new Twitter account</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 py-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder='Enter your full name' type='text' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder='Choose a username' type='text' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder='john.doe@example.com' type='email' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder='******' type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full rounded-full' disabled={isPending}>
              {isPending ? 'Creating account...' : 'Sign up'}
            </Button>
          </form>
        </Form>

        <DialogFooter>
          <Button variant='link' onClick={switchToLogin} className='w-full text-primary'>
            Already have an account? Sign in
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
