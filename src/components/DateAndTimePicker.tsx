// import React, { useState, useEffect } from 'react';

// interface DateTimePickerProps {
//     value: string;
//     setValue: React.Dispatch<React.SetStateAction<string>>;
//     title: string;
//     defaultValue?: string;
//     errorMessage?: string;
// }

// const DateTimePicker: React.FC<DateTimePickerProps> = ({ value, setValue, title, defaultValue, errorMessage }) => {

//     const [currentDateTime, setCurrentDateTime] = useState<string>('');

//     useEffect(() => {
//         const now = new Date();
//         const localOffset = now.getTimezoneOffset() * 60000;
//         const utcTime = now.getTime() + localOffset;
//         const uzbekistanTime = new Date(utcTime + 5 * 3600000);
//         const formattedDateTime = uzbekistanTime.toISOString().slice(0, 16);
//         setCurrentDateTime(formattedDateTime);
//         if (defaultValue) {
//             const oldTime = defaultValue?.split(":")[0] + ":" + defaultValue?.split(":")[1]
//             setValue(oldTime);
//         }
//     }, []);

//     return (
//         <div>
//             <label htmlFor={"date_time_picker"} className="block text-sm font-medium text-gray-700">
//                 {title}
//             </label>
//             <input
//                 type="datetime-local"
//                 id={"date_time_picker"}
//                 className="mt-1 p-2 border border-gray-300  w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md"
//                 defaultValue={currentDateTime}
//                 min={currentDateTime}
//                 value={value}
//                 onChange={(evt) => {
//                     let date = evt.target.value
//                     if (date) {
//                         setValue(date)
//                     }
//                 }}

//             />
//             {errorMessage && (
//                 <p className="text-red-500 text-sm">
//                     {String(errorMessage)}
//                 </p>
//             )}
//         </div>

//     );
// };

// export default DateTimePicker;

import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from 'components/ui/form';
import { Input } from 'components/ui/input';

interface DateTimePickerProps {
  name: string;
  label?: string;
  required?: boolean;
}

export default function DateTimePicker({ name, label, required }: DateTimePickerProps) {
  const { control } = useFormContext();

  // Function to format the datetime value (removes :00Z)
  const formatDateTime = (value: string | undefined) => {
    if (!value) return '';

    return value.replace(':00.000Z', '');
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && (
            <FormLabel>
              {`${label} `}
              {required && <span className="text-red-500 dark:text-red-900">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Input
              {...field}
              type="datetime-local"
              id="date_time_picker"
              value={formatDateTime(field.value)} // Format the value
              onChange={(e) => field.onChange(e.target.value)} // Pass the raw value back to react-hook-form
              className="mt-1 p-2 border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
