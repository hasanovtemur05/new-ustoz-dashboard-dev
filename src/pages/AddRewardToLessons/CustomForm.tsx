import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'components/ui/form';
import { SelectField } from 'components/fields';
import LoadingButton from 'components/LoadingButton';
import { useCoursesList } from 'modules/courses/hooks/useCoursesList';
import { useEffect, useState } from 'react';
import { schema, useFormSchemaType } from './schema';
import { ICourseReward } from 'modules/add-reward-to-lessons/types';
import { useCourseLessonsList } from 'modules/lessons/hooks/useCourseLessonsList';
import { useCreateCourseReward } from 'modules/add-reward-to-lessons/hooks/useCreate';
import { useEditCourseReward } from 'modules/add-reward-to-lessons/hooks/useEdit';
import { useLessonRewardList } from 'modules/course-reward-product/hooks/useList';
import { useSearchParams } from 'react-router-dom';
interface IProps {
  selectedData?: ICourseReward;
  setSheetOpen: (state: boolean) => void;
}

export type SelectType = { name: string; type: string; disabled?: boolean };

export default function CustomForm({ selectedData, setSheetOpen }: IProps) {
  const [searchParams] = useSearchParams();

  const [coursesData, setCoursesData] = useState<SelectType[]>([]);
  const [lessonsData, setLessonsData] = useState<SelectType[]>([]);
  const [rewardsData, setRewardsData] = useState<SelectType[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [state, setState] = useState(false);

  const { triggerCreate, isPending: isInfoCreatePending } = useCreateCourseReward({ setSheetOpen });
  const { triggerEdit, isPending: isNotificationEditPending } = useEditCourseReward({
    id: selectedData?.id,
    setSheetOpen,
  });

  // Get data
  const { data: coursesList, isLoading: loadingCourses } = useCoursesList();
  const { data: lessons, isLoading: loadingLessons } = useCourseLessonsList(selectedCourseId);
  const { data: rewards, isLoading: loadingRewards } = useLessonRewardList(100);

  

  const form = useForm<useFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: selectedData
      ? {
          courseId: selectedData ? searchParams.get('courseId') || '' : '',
          lessonId: selectedData.lessonId || '',
          rewardId: selectedData.rewardId || '',
        }
      : {
          courseId: '',
          lessonId: '',
          rewardId: '',
        },
  });

  // Watch courseId changes
  const watchedCourseId = form.watch('courseId');

  async function onSubmit(formValues: useFormSchemaType) {
    setState(true);
    try {
      if (selectedData) {
        triggerEdit(formValues);
      } else {
        triggerCreate(formValues);
      }
    } catch (error) {
      alert('Aniqlanmagan hatolik!');
    } finally {
      setState(false);
    }
  }

  // Update courses dropdown
  useEffect(() => {
    if (coursesList) {
      const newArr: SelectType[] = coursesList.map((el) => ({
        name: el.title,
        type: el.id,
      }));
      setCoursesData(newArr);
    }
  }, [coursesList]);

  // Update selected course and reset lesson when course changes
  useEffect(() => {
    if (watchedCourseId) {
      setSelectedCourseId(watchedCourseId);
      // Reset lessonId when course changes
      // if (watchedCourseId !== selectedData?.courseId) {
      //   form.setValue('lessonId', '');
      // }
    }
  }, [watchedCourseId, form, selectedData]);

  // Update lessons dropdown
  useEffect(() => {
    if (lessons) {
      const newArr: SelectType[] = lessons.map((el) => ({
        name: el.title,
        type: el.id,
      }));
      setLessonsData(newArr);
    } else {
      setLessonsData([]);
    }
  }, [lessons]);

  // Update rewards dropdown
  useEffect(() => {
    if (rewards) {
      const newArr: SelectType[] = rewards.map((el) => ({
        name: el.title,
        type: el.id,
      }));
      setRewardsData(newArr);
    }
  }, [rewards]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-4 flex-col my-4">
          {/* Kurs tanlash */}
          {loadingCourses ? (
            <SelectField name="courseId" data={[]} placeholder="Kurslar yuklanmoqda..." label="Kursni tanlang" />
          ) : (
            <SelectField name="courseId" data={coursesData} placeholder="Kursni tanlang..." label="Kursni tanlang" />
          )}

          {/* Dars tanlash */}
          {loadingLessons ? (
            <SelectField name="lessonId" data={[]} placeholder="Darslar yuklanmoqda..." label="Darsni tanlang" />
          ) : (
            <SelectField
              name="lessonId"
              data={lessonsData}
              placeholder={!lessonsData?.length ? 'Darslar yoq' : selectedCourseId ? 'Darsni tanlang...' : 'Avval kursni tanlang'}
              label="Darsni tanlang"
            />
          )}

          {/* Mukofot ID tanlash */}
          {loadingRewards ? (
            <SelectField name="rewardId" data={[]} placeholder="Mukofotlar yuklanmoqda..." label="Mukofot " />
          ) : (
            <SelectField name="rewardId" data={rewardsData} placeholder="Mukofotni tanlang..." label="Mukofot " />
          )}
        </div>

        <LoadingButton isLoading={state || isInfoCreatePending || isNotificationEditPending}>
          {selectedData ? 'Tahrirlash' : 'Saqlash'}
        </LoadingButton>
      </form>
    </Form>
  );
}
