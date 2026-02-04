'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormDescription, FormMessage } from 'components/ui/form';
import LoadingButton from 'components/LoadingButton';
import QuizOptions from './QuizOptions';
import { useParams } from 'react-router-dom';

import RichTextEditorForQuiz from 'components/fields/RichTextEditorForQuiz';
import { useCreateQuiz } from 'modules/quizzes/hooks/useCreateQuiz';
import { useEditQuiz } from 'modules/quizzes/hooks/useEditQuiz';

import { useEffect, useState } from 'react';
import http from 'services/api';
import { Quiz, QuizOptionType } from 'modules/quizzes/types';
import { SelectField } from 'components/fields';
import { useEasyFileUploader } from 'hooks/useFileUploader';

const typeData = [
  { type: QuizOptionType.TEXT, name: 'Matn' },
  { type: QuizOptionType.AUDIO, name: 'Audio' },
  { type: QuizOptionType.IMAGE, name: 'Rasm' },
];



const quizSchema = z.object({
  question: z.string().min(9, { message: "Savol minimum 8 ta harifdan iborat bolishi kerak" }),
  type: z.nativeEnum(QuizOptionType).default(QuizOptionType.TEXT),
  options: z
    .array(
      z.object({
        value: z.string().optional(),
        link: z.union([z.string(), z.instanceof(File)]).optional(),
        isCorrect: z.boolean(),
        id: z.string().optional(),
      })
    )
    .refine((data) => data.some((option) => option.isCorrect), {
      message: "To'g'ri javobni belgilang",
      path: ["options"],
    }),
});

export type quizFormSchema = z.infer<typeof quizSchema>;

interface IProps {
  quiz?: Quiz;
  setSheetOpen: (state: boolean) => void;
}

export default function QuizForm({ quiz, setSheetOpen }: IProps) {
  const [loading, setLoading] = useState(false);
  const { lessonId } = useParams();
  const { uploadFile: easyUpload } = useEasyFileUploader();
  const { triggerQuizCreate, isPending: isQuizCreatePending } = useCreateQuiz({ setSheetOpen });
  const { triggerQuizEdit, isPending: isQuizEditPending } = useEditQuiz({ id: quiz?.id, setSheetOpen });

  const form = useForm<quizFormSchema>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      question: quiz?.question || '',
      type: quiz?.type || QuizOptionType.TEXT,
      options:
        quiz?.options ||
        [
          { isCorrect: false },
          { isCorrect: false },
          { isCorrect: false },
          { isCorrect: false },
        ],
    },
  });

  const { formState: { errors }, setValue } = form;

  useEffect(() => {
    if (quiz) {
      setLoading(true);
      http.get(`quiz/${quiz.id}`)
        .then((res) => {
          if (res.status === 200 && res.data?.data) {
            const data = res.data.data;
            // Ensure options match form schema
            const quizOptions = data.quizOptions.map((opt: any) => ({
              id: opt.id,
              value: opt.value || '',
              link: opt.link || '',
              isCorrect: opt.isCorrect,
            }));
            setValue('options', quizOptions);
          }
        })
        .catch(() => alert('Savollarni olishda xatolik'))
        .finally(() => setLoading(false));
    }
  }, [quiz, setValue]);

  async function onSubmit(formValues: quizFormSchema) {
    try {
      // Process files
      const processedOptions = await Promise.all(
        formValues.options.map(async (option) => {
          const processedOption = { ...option };
          if (option.link && option.link instanceof File) {
            const url = await easyUpload(option.link);
            processedOption.link = url;
          }
          return processedOption;
        })
      );

      const finalPayload = { ...formValues, options: processedOptions, lessonId: lessonId! };

      if (quiz) {
        await triggerQuizEdit(finalPayload);
      } else {
        await triggerQuizCreate(finalPayload);
      }
    } catch (err) {
      console.error('Error submitting quiz:', err);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <div className="flex gap-4 flex-col my-4">
          <RichTextEditorForQuiz name="question" label="Savol" required />
          <SelectField name="type" data={typeData} placeholder="Javob turini tanlang..." label="Javob turi" />
          <hr />
          <FormDescription className="mb-2 text-xs">Bitta to'g'ri javobni belgilang</FormDescription>
          {loading && <h3>Javoblar yuklanmoqda...</h3>}
          <QuizOptions />
          {errors.options && <FormMessage className="text-red-600">{errors.options.message}</FormMessage>}
        </div>

        <LoadingButton isLoading={quiz ? isQuizEditPending : isQuizCreatePending}>
          {quiz ? 'Tahrirlash' : 'Saqlash'}
        </LoadingButton>
      </form>
    </Form>
  );
}
