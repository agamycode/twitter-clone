'use client';

import type React from 'react';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { login } from '@/actions/login';
import { type Login, LoginSchema } from '@/validators/auth';
import { useLoginDialog } from '@/store/use-login-dialog';
import { useSignUpDialog } from '@/store/use-signup-dialog';

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

export function LoginDialog() {
  const { onOpen: openRegister } = useSignUpDialog();
  const { isOpen, onClose } = useLoginDialog();

  const [isPending, startTransition] = useTransition();

  const form = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (values: Login) => {
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.success === false) {
            toast.error(data.massage);
            form.reset();
            window.location.reload();
          }

          if (data?.success === true) {
            toast.success(data.massage);
            form.reset();
            onClose();
            window.location.reload();
          }
        })
        .catch(() => toast.error('Something went wrong'));
    });
  };

  const switchToRegister = () => {
    onClose();
    openRegister();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold'>Sign in to Twitter</DialogTitle>
          <DialogDescription>Enter your username and password to access your account</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 py-4'>
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

            <Button type='submit' className='w-full' disabled={isPending}>
              {isPending ? (
                <>
                  <Loader className='size-4 animate-spin' />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>
        </Form>

        <DialogFooter className='flex flex-col sm:flex-row sm:justify-between items-center'>
          <Button variant='link' onClick={switchToRegister} className='text-primary'>
            Don&apos;t have an account? Sign up
          </Button>

          <Button
            variant='link'
            className='text-primary'
            onClick={() => {
              toast.info('Password reset functionality will be implemented soon!');
            }}>
            Forgot password?
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
