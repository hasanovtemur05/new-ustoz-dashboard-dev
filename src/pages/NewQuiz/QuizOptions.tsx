import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormMessage, FormLabel } from 'components/ui/form';
import { RadioGroup, RadioGroupItem } from 'components/ui/radio-group';
import type { quizFormSchema } from './QuizForm';
import RichTextEditorForQuiz from 'components/fields/RichTextEditorForQuiz';
import { QuizOptionType } from 'modules/quizzes/types';
import MediaUploadField from 'components/fields/VideoUploder';

export default function QuizOptions() {
  const { control, setValue, watch } = useFormContext<quizFormSchema>();
  const { fields: optionsFields } = useFieldArray({
    name: 'options',
    control,
  });

  const quizType = watch('type');

  console.log(optionsFields ,"test")

  return (
    <RadioGroup
      value={`${optionsFields.findIndex((field) => field.isCorrect)}`}
      onValueChange={(value) => {
        optionsFields.forEach((_, index) => {
          setValue(`options.${index}.isCorrect`, index === +value);
        });
      }}
      className="flex flex-col gap-5"
    >
      {optionsFields.map((valuesField, valuesIndex) => {
        return (
          <div key={valuesField.id} className="border rounded-lg p-4 space-y-3">
            <FormField
              control={control}
              name={`options.${valuesIndex}.isCorrect`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-3">
                    <FormControl>
                      <RadioGroupItem value={`${valuesIndex}`} checked={field.value} />
                    </FormControl>
                    <FormLabel className="text-sm font-medium">Javob {valuesIndex + 1}</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {quizType === QuizOptionType.TEXT && <RichTextEditorForQuiz name={`options.${valuesIndex}.value`} label={`Javob matni`} />}

            {quizType === QuizOptionType.AUDIO && (
              <FormField
                control={control}
                name={`options.${valuesIndex}.link`}
                render={({ field }) => (
                  <FormItem>
                    <MediaUploadField
                      name={`options.${valuesIndex}.link`}
                      label="Audio fayl"
                      types={['MP3', 'WAV', 'M4A', 'AAC', 'OGG', 'FLAC']}
                      required
                      defaultValue={
                        typeof field.value === 'string' && field.value
                          ? field.value.includes('http')
                            ? field.value.split('/').slice(-2).join('/')
                            : field.value
                          : undefined
                      }
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {quizType === QuizOptionType.IMAGE && (
              <FormField
                control={control}
                name={`options.${valuesIndex}.link`}
                render={({ field }) => (
                  <FormItem>
                    <MediaUploadField
                      name={`options.${valuesIndex}.link`}
                      label="Rasm fayli"
                      types={['JPG', 'JPEG', 'PNG', 'GIF', 'WEBP', 'SVG']}
                      required
                      defaultValue={
                        typeof field.value === 'string' && field.value
                          ? field.value.includes('http')
                            ? field.value.split('/').slice(-2).join('/')
                            : field.value
                          : undefined
                      }
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        );
      })}
    </RadioGroup>
  );
}

// import { useFieldArray, useFormContext } from 'react-hook-form';
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from 'components/ui/form';
// import { RadioGroup, RadioGroupItem } from 'components/ui/radio-group';
// import { quizFormSchema } from './QuizForm';
// import RichTextEditorForQuiz from 'components/fields/RichTextEditorForQuiz';

// export default function QuizOptions() {
//   const { control, setValue } = useFormContext<quizFormSchema>();
//   const { fields: optionsFields } = useFieldArray({
//     name: 'options',
//     control,
//   });

//   return (
//     <RadioGroup
//       value={`${optionsFields.findIndex(field => field.isCorrect)}`}
//       onValueChange={value => {
//         optionsFields.forEach((_, index) => {
//           setValue(`options.${index}.isCorrect`, index === +value);
//         });
//       }}
//       className="flex flex-col gap-5"
//     >
//       {optionsFields.map((valuesField, valuesIndex) => (
//         <FormField
//           control={control}
//           key={valuesField.id}
//           name={`options.${valuesIndex}.isCorrect`}
//           render={({ field }) => (
//             <FormItem>
//               <div className="flex items-center space-x-3">
//                 <FormControl>
//                   <RadioGroupItem
//                     value={`${valuesIndex}`}
//                     checked={field.value}
//                   />
//                 </FormControl>
//                 {/* <TextField
//                   name={`options.${valuesIndex}.value`}
//                   placeholder="Javob matni..."
//                 /> */}
//                 <RichTextEditorForQuiz name={`options.${valuesIndex}.value`} label={`Javob ${valuesIndex +1}`}  />
//               </div>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       ))}
//     </RadioGroup>
//   );
// }
