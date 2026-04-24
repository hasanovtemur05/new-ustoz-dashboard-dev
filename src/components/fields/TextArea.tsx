import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form';
import { Textarea } from 'components/ui/textarea';
import { stripHtml } from 'utils/stripHtml';

interface IProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export default function TextAreaField({
  placeholder,
  required,
  name,
  label,
}: IProps) {
  const { control, setValue, watch } = useFormContext();
  const fieldValue = watch(name);

  // Dastlabki qiymatda HTML teglar bo'lsa, ularni tozalab qo'yamiz
  useEffect(() => {
    if (fieldValue && typeof fieldValue === 'string' && /<[^>]*>?/gm.test(fieldValue)) {
      setValue(name, stripHtml(fieldValue), { shouldDirty: false });
    }
  }, [fieldValue, name, setValue]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {`${label} `}
              {required && (
                <span className="text-red-500 dark:text-red-900">*</span>
              )}
            </FormLabel>
          )}
          <FormControl>
            <Textarea
              {...field}
              value={field.value || ''}
              onChange={(e) => field.onChange(stripHtml(e.target.value))}
              placeholder={placeholder}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
