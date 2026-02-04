import { z } from 'zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormDescription, FormMessage } from 'components/ui/form';
import { Quiz } from 'modules/lastexam/types';
import LoadingButton from 'components/LoadingButton';
import QuizOptions from './QuizOptions';
import { useParams } from 'react-router-dom';
import { useCreateQuiz } from 'modules/lastexam/hooks/useCreateQuiz';
import { useEditQuiz } from 'modules/lastexam/hooks/useEditQuiz';
import RichTextEditorForQuiz from 'components/fields/RichTextEditorForQuiz';
import http from 'services/api';
import { useEffect, useState } from 'react';

const quizSchema = z.object({
  question: z.string().min(9, { message: 'Savol minimum 8 ta harifdan iborat bolishi karak' }),
  options: z
    .array(
      z.object({
        value: z.string().min(1, { message: 'Javobni kiriting' }),
        isCorrect: z.boolean(),
        id: z.string().optional(),
      })
    )
    .refine((data) => data.some((option) => option.isCorrect), {
      message: "To'g'ri javobni belgilang",
      path: ['options'],
    }),
});

export type quizFormSchema = z.infer<typeof quizSchema>;

interface IProps {
  quiz?: Quiz;
  setSheetOpen: (state: boolean) => void;
}

export default function QuizForm({ quiz, setSheetOpen }: IProps) {
  const { lessonId } = useParams();
  const [loading, setLoading] = useState(false);

  const { triggerQuizCreate, isPending: isQuizCreatePending } = useCreateQuiz({
    setSheetOpen,
  });
  const { triggerQuizEdit, isPending: isQuizEditPending } = useEditQuiz({
    id: quiz?.id,
    setSheetOpen,
  });

  const getOneQuiz = async (id: string) => {
    setLoading(true);
    try {
      const res = await http.get(`exam/${id}`);
      if (res.status === 200) {
        const data = res?.data?.data;

        form.setValue('options', data?.examOptions);
      }
    } catch (error) {
      alert('Savollarni olishda hatolik');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (quiz) {
      getOneQuiz(quiz.id);
    }
  }, [quiz]);

  const form = useForm<quizFormSchema>({
    resolver: zodResolver(quizSchema),
    defaultValues: quiz
      ? {
          question: quiz.question,
          options: quiz.options,
        }
      : {
          // question: "<p><br></p>",
          options: [
            {
              // value: "",
              isCorrect: false,
            },
            {
              // value: "",
              isCorrect: false,
            },
            {
              // value: "",
              isCorrect: false,
            },
            {
              // value: "",
              isCorrect: false,
            },
          ],
        },
  });
  const {
    control,
    formState: { errors },
    getValues,
  } = form;

  const { fields: questionFields } = useFieldArray({
    name: 'options',
    control,
  });

  function onSubmit(formValues: quizFormSchema) {
    if (quiz) {
      triggerQuizEdit({ ...formValues, courseId: lessonId! });
    } else {
      triggerQuizCreate({ ...formValues, courseId: lessonId! });
    }
  }

  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        onSubmit={form.handleSubmit(onSubmit, (err) => console.log('Validation error: ', err))}
        className="flex flex-col gap-2"
      >
        <div className="flex gap-4 flex-col my-4">
          {/* <TextAreaField name={`question`} label="Savol" required /> */}
          <RichTextEditorForQuiz name="question" label="Savol" required />
          <hr />
          <FormDescription className="mb-2 text-xs">Bitta to'g'ri javobni belgilang</FormDescription>
          {loading && <h3>Javoblar yuklanmoqda... </h3>}

          <QuizOptions />

          {errors.options && (
            // @ts-ignore
            <FormMessage className="text-red-600">{errors.options?.message}</FormMessage>
          )}
        </div>
        {quiz ? (
          <LoadingButton isLoading={isQuizEditPending}>Tahrirlash</LoadingButton>
        ) : (
          <LoadingButton isLoading={isQuizCreatePending}>Saqlash</LoadingButton>
        )}
      </form>
    </Form>
  );
}
