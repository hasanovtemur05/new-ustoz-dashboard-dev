import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import LoadingButton from 'components/LoadingButton';

import { schema, useFormSchemaType } from './schema';
import { OrdersFormType } from 'modules/orders/types';
import {
  useSearchCoursesId,
  useSearchUserId,
} from 'modules/orders/hooks/useList';
import { useCreateEnrollment } from 'modules/orders/hooks/useCreateEnrollment';

interface IProps {
  selectedData?: OrdersFormType;
  setSheetOpen: (state: boolean) => void;
}

export default function OrdersForm({ selectedData, setSheetOpen }: IProps) {
  const [loading, setLoading] = useState(false);

  // search states
  const [userSearch, setUserSearch] = useState('');
  const [courseSearch, setCourseSearch] = useState('');

  // dropdown states
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);

  // selected items
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const courseDropdownRef = useRef<HTMLDivElement>(null);

  const { triggerCreate } = useCreateEnrollment({ setSheetOpen });

  // API hooks
  const { data: userRes, isLoading: userLoading } =
    useSearchUserId(userSearch);
  const { data: courseRes, isLoading: courseLoading } =
    useSearchCoursesId(courseSearch);

  // API response parsing
  const users = userRes?.data || [];
  const courses = courseRes?.data || [];

  console.log(users, "user data");
  

  const form = useForm<useFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      userId: '',
      courseId: '',
    },
  });

  // outside click close dropdown
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(e.target as Node)
      ) {
        setShowUserDropdown(false);
      }

      if (
        courseDropdownRef.current &&
        !courseDropdownRef.current.contains(e.target as Node)
      ) {
        setShowCourseDropdown(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  async function onSubmit(values: useFormSchemaType) {
    try {
      setLoading(true);
      triggerCreate({
        userId: values.userId,
        courseId: values.courseId,
      });
    } catch {
      alert('Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {/* USER SEARCH */}
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                User <span className="text-red-500">*</span>
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
                      O‘chirish
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <Input
                        placeholder="User qidirish..."
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
                        onClick={() =>
                          setShowUserDropdown((prev) => !prev)
                        }
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
                              key={user.id}
                              className="p-3 cursor-pointer hover:bg-gray-50"
                              onClick={() => {
                                setSelectedUser(user);
                                setUserSearch(
                                  `${user.firstname} ${user.lastname}`
                                );
                                form.setValue('userId', user.id);
                                setShowUserDropdown(false);
                              }}
                            >
                              {user.firstname} {user.lastname}
                            </div>
                          ))
                        ) : (
                          <p className="p-3 text-center">User topilmadi</p>
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

        {/* COURSE SEARCH */}
        <FormField
          control={form.control}
          name="courseId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Kurs <span className="text-red-500">*</span>
              </FormLabel>

              <div className="relative" ref={courseDropdownRef}>
                {selectedCourse ? (
                  <div className="flex justify-between items-center p-3 border rounded-md bg-gray-50">
                    <p className="font-medium">{selectedCourse.title}</p>
                    <button
                      type="button"
                      className="text-sm text-red-500"
                      onClick={() => {
                        setSelectedCourse(null);
                        setCourseSearch('');
                        form.setValue('courseId', '');
                      }}
                    >
                      O‘chirish
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Kurs qidirish..."
                        value={courseSearch}
                        onChange={(e) => {
                          setCourseSearch(e.target.value);
                          setShowCourseDropdown(true);
                        }}
                        onClick={() => setShowCourseDropdown(true)}
                      />

                      <Button
                        type="button"
                        size="icon"
                        onClick={() =>
                          setShowCourseDropdown((prev) => !prev)
                        }
                      >
                        <Search className="size-4" />
                      </Button>
                    </div>

                    {showCourseDropdown && (
                      <div className="absolute z-20 w-full mt-1 bg-white border rounded-md shadow max-h-60 overflow-y-auto">
                        {courseLoading ? (
                          <p className="p-3 text-center">Yuklanmoqda...</p>
                        ) : courses.length ? (
                          courses.map((course: any) => (
                            <div
                              key={course.id}
                              className="p-3 cursor-pointer hover:bg-gray-50"
                              onClick={() => {
                                setSelectedCourse(course);
                                setCourseSearch(course.title);
                                form.setValue('courseId', course.id);
                                setShowCourseDropdown(false);
                              }}
                            >
                              {course.title}
                            </div>
                          ))
                        ) : (
                          <p className="p-3 text-center">Kurs topilmadi</p>
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

        {/* SUBMIT */}
        <LoadingButton isLoading={loading}>
          {selectedData ? 'Tahrirlash' : 'Saqlash'}
        </LoadingButton>
      </form>
    </Form>
  );
}
