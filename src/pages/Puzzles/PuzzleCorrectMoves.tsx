import { Button } from 'components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form';
import { Input } from 'components/ui/input';
import { Minus, Plus } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

export default function PuzzleCorrectMoves() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: 'correct_moves',
    control,
  });

  return (
    <div>
      <FormLabel>Boshqotirma javobi</FormLabel>
      <FormDescription>Eng afzal yo'lni kiriting</FormDescription>
      {fields.map((field, index) => (
        <FormField
          key={field.id}
          control={control}
          name={`correct_moves[${index}]`}
          render={({ field }) => (
            <FormItem className="mb-4">
              <div className="relative flex items-center">
                <FormControl className="w-full">
                  <Input {...field} />
                </FormControl>
                {fields.length >= 1 && (
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute right-2 text-red-500 p-1 bg-transparent hover:bg-transparent focus:bg-transparent"
                  >
                    <Minus className="size-5" />
                  </Button>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      <Button
        variant="ghost"
        type="button"
        onClick={() => append('')}
        className="flex items-center"
      >
        <Plus className="size-5 mr-2 text-blue-500 dark:text-white" />
        Afzal yo'lni qo'shish
      </Button>
    </div>
  );
}
