// modules/course-influencer/components/CustomForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';

import { Form, FormField, FormItem, FormLabel, FormMessage } from 'components/ui/form';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import LoadingButton from 'components/LoadingButton';
import { schema, UseFormSchemaType } from './schema';
import { useCreateInfluencer } from 'modules/course-influencer/hooks/useCreate';
import { useSearchUserId } from 'modules/orders/hooks/useList';

interface IProps {
  setSheetOpen: (state: boolean) => void;
  courseId: string;
}

export default function CustomForm({ setSheetOpen, courseId }: IProps) {
  const { triggerInfluencerCreate, isPending } = useCreateInfluencer({ setSheetOpen });

  const [userSearch, setUserSearch] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const userDropdownRef = useRef<HTMLDivElement>(null);

  const { data: userRes, isLoading: userLoading } = useSearchUserId(userSearch);
  const users = userRes?.data || [];

  const form = useForm<UseFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      userId: '',
      courseId: courseId,
    },
  });

  // Outside click — dropdownni yopish
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(e.target as Node)
      ) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  async function onSubmit(formValues: UseFormSchemaType) {
    triggerInfluencerCreate(formValues);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">

        {/* USER SEARCH */}
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Foydalanuvchi <span className="text-red-500">*</span>
              </FormLabel>

              <div className="relative" ref={userDropdownRef}>
                {selectedUser ? (
                  <div className="flex justify-between items-center p-3 border rounded-md bg-gray-50">
                    <p className="font-medium">
                      {selectedUser.firstname} {selectedUser.lastname}
                    </p>
                    <button
                      type="button"
                      className="text-sm text-red-500"
                      onClick={() => {
                        setSelectedUser(null);
                        setUserSearch('');
                        form.setValue('userId', '');
                      }}
                    >
                      O'chirish
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Foydalanuvchi qidirish..."
                        value={userSearch}
                        onChange={(e) => {
                          setUserSearch(e.target.value);
                          setShowUserDropdown(true);
                        }}
                        onClick={() => setShowUserDropdown(true)}
                      />
                      <Button
                        type="button"
                        size="icon"
                        onClick={() => setShowUserDropdown((prev) => !prev)}
                      >
                        <Search className="size-4" />
                      </Button>
                    </div>

                    {showUserDropdown && (
                      <div className="absolute z-20 w-full mt-1 bg-white border rounded-md shadow max-h-60 overflow-y-auto">
                        {userLoading ? (
                          <p className="p-3 text-center">Yuklanmoqda...</p>
                        ) : users.length ? (
                          users.map((user: any) => (
                            <div
                              key={user?.id}
                              className="p-3 cursor-pointer hover:bg-gray-50"
                              onClick={() => {
                                setSelectedUser(user);
                                setUserSearch(`${user?.firstname} ${user?.lastname}`);
                                form.setValue('userId', user?.id);
                                setShowUserDropdown(false);
                              }}
                            >
                              {user?.firstname} {user?.lastname}
                            </div>
                          ))
                        ) : (
                          <p className="p-3 text-center">Foydalanuvchi topilmadi</p>
                        )}
                      </div>
                    )}
                  </>
                )}

                <input type="hidden" {...field} />
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton isLoading={isPending}>Saqlash</LoadingButton>
      </form>
    </Form>
  );
}