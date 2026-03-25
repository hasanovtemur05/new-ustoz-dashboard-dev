import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form';
import { Input } from 'components/ui/input';
import { verificationSchema, VerificationFormValues } from './schema';

interface IProps {
  onSubmit: (values: VerificationFormValues) => void;
  isLoading?: boolean;
}

const CustomForm = ({ onSubmit, isLoading }: IProps) => {
  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      reject_reason: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="reject_reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rad etish sababi</FormLabel>
              <FormControl>
                <Input placeholder="Sababni kiritng..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Yuborilmoqda...' : 'Rad etish'}
        </Button>
      </form>
    </Form>
  );
};

export default CustomForm;
