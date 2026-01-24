import * as React from 'react';
import { format } from 'date-fns';
import { useFormContext } from 'react-hook-form';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from 'utils/styleUtils';
import { Button } from 'components/ui/button';
import { Calendar } from 'components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form';
import { TimePicker } from '../TimePicker';

interface IProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export default function DatePickerField({
  placeholder,
  required,
  name,
  label,
}: IProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          {label && (
            <FormLabel>
              {`${label} `}
              {required && (
                <span className="text-red-500 dark:text-red-900">*</span>
              )}
            </FormLabel>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    'pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value ? (
                    format(field.value, 'dd/MM/yyyy')
                  ) : (
                    <span>{placeholder}</span>
                  )}

                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={date => {
                  const today = new Date();
                  today?.setHours?.(0, 0, 0, 0);
                  return date < today;
                }}
                initialFocus
              />
              <div className="p-3 border-t border-border">
                <TimePicker setDate={field.onChange} date={field.value} />
              </div>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
