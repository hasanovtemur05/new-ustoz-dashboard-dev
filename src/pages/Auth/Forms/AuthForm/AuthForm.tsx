import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormField, FormItem } from 'components/ui/form';
import { Label } from 'components/ui/label';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import { useSignIn } from 'modules/auth/hooks/useSignIn';

const AuthForm = () => {
  const { triggerSignIn, isPending } = useSignIn();
  const formSchema = z.object({
    credentials: z.string().min(3),
    password: z.string().min(3),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      credentials: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    triggerSignIn(values);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full items-center gap-4">
          <FormField
            name="credentials"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Username" {...field} />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="Password" {...field} />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Tekshirilmoqda..' : 'Login'}
          </Button>
        </form>
      </Form>

      {/* <Toast */}
    </>
  );
};

export default AuthForm;
