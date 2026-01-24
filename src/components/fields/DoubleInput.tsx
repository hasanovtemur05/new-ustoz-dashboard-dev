import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from 'components/ui/form';
import { Input } from 'components/ui/input';
import NumberTextField from './Number';

interface IProps {
  name1: string;
  name2: string;
  label1?: string;
  label2?: string;
  placeholder?: string;
  required?: boolean;
}

export default function DoubleNumberField({ placeholder, required, name1, name2, label1, label2 }: IProps) {
  const { control } = useFormContext();

  return (
    <div>
      <h2 className="font-medium">Talab etadigan tajriba</h2>
      <div className="flex items-end gap-2">
        <FormField
          control={control}
          name={name1}
          render={({ field }) => (
            <FormItem className="w-full">
              {label1 && (
                <FormLabel>
                  {`${label1} `}
                  {required && <span className="text-red-500 dark:text-red-900">*</span>}
                </FormLabel>
              )}
              <FormControl>
                <Input {...field} placeholder={placeholder} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <NumberTextField name={name1}  label="Oylik maosh" required />

        <FormField
          control={control}
          name={name2}
          render={({ field }) => (
            <FormItem className="w-full">
              {label2 && (
                <FormLabel>
                  {`${label2} `}
                  {required && <span className="text-red-500 dark:text-red-900">*</span>}
                </FormLabel>
              )}
              <FormControl>
                <Input {...field} placeholder={placeholder} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
