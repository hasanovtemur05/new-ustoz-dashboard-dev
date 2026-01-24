import { useFieldArray, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from 'components/ui/form';
import { RadioGroup, RadioGroupItem } from 'components/ui/radio-group';
import { quizFormSchema } from './QuizForm';
import RichTextEditorForQuiz from 'components/fields/RichTextEditorForQuiz';

export default function QuizOptions() {
  const { control, setValue } = useFormContext<quizFormSchema>();
  const { fields: optionsFields } = useFieldArray({
    name: 'options',
    control,
  });


  return (
    <RadioGroup
      value={`${optionsFields.findIndex(field => field.isCorrect)}`}
      onValueChange={value => {
        optionsFields.forEach((_, index) => {
          setValue(`options.${index}.isCorrect`, index === +value);
        });
      }}
      className="flex flex-col gap-5"
    >
      {optionsFields.map((valuesField, valuesIndex) => (
        <FormField
          control={control}
          key={valuesField.id}
          name={`options.${valuesIndex}.isCorrect`}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-3">
                <FormControl>
                  <RadioGroupItem
                    value={`${valuesIndex}`}
                    checked={field.value}
                  />
                </FormControl>
                {/* <TextField
                  name={`options.${valuesIndex}.value`}
                  placeholder="Javob matni..."
                /> */}
                <RichTextEditorForQuiz name={`options.${valuesIndex}.value`} label={`Javob ${valuesIndex +1}`}  />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </RadioGroup>
  );
}
