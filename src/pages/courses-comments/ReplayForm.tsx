import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from 'components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form';
import { Textarea } from 'components/ui/textarea';
import { useCreateReplay } from 'modules/course-comments/hooks/useReply'; 

const replayFormSchema = z.object({
  content: z.string().min(1, { message: 'Javob matnini kiriting' }),
});

type ReplayFormValues = z.infer<typeof replayFormSchema>;

interface ReplayFormProps {
  comment: any;
  setReplayOpen: (state: boolean) => void;
}

const ReplayForm = ({ comment, setReplayOpen }: ReplayFormProps) => {
  const { triggerCreate, isPending } = useCreateReplay({ setReplayOpen });

  const form = useForm<ReplayFormValues>({
    resolver: zodResolver(replayFormSchema),
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (data: ReplayFormValues) => {
    if (!comment?.id) return;

    await triggerCreate({
      ratingId: comment.id,
      content: data.content,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            <strong>{comment?.user?.firstname} {comment?.user?.lastname}</strong> izohiga javob:
          </p>
          <p className="text-sm">{comment?.content}</p>
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Javob matni</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Javobingizni kiriting..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => setReplayOpen(false)}
            disabled={isPending}
          >
            Bekor qilish
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Yuborilmoqda...' : 'Yuborish'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ReplayForm;