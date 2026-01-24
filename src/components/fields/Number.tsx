import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form';
import { Input } from 'components/ui/input';

interface IProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export default function NumberTextField({
  placeholder,
  required,
  name,
  label,
}: IProps) {
  const { control } = useFormContext();
  const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) || value === '') {
      return value; // Allow only numbers or empty string
    }
    return ''; // Block invalid input
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
              {required && (
                <span className="text-red-500 dark:text-red-900">*</span>
              )}
            </FormLabel>
          )}
          <FormControl>
            <Input {...field} placeholder={placeholder} type="text" onChange={(e) => {
              const value = +handleNumericInput(e);
              console.log(value);
              
              field.onChange(value);
            }}

            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}



// import { useFormContext } from 'react-hook-form';
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from 'components/ui/form';
// import { Input } from 'components/ui/input';

// interface IProps {
//   name: string;
//   label?: string;
//   placeholder?: string;
//   required?: boolean;
// }

// export default function NumberTextField({
//   placeholder,
//   required,
//   name,
//   label,
// }: IProps) {
//   const { control } = useFormContext();

//   // Helper function to allow only numeric input
//   const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     if (!isNaN(Number(value)) || value === '') {
//       return value; // Allow only numbers or empty string
//     }
//     return ''; // Block invalid input
//   };

//   return (
//     <FormField
//       control={control}
//       name={name}
//       render={({ field }) => (
//         <FormItem className="w-full">
//           {label && (
//             <FormLabel>
//               {`${label} `}
//               {required && (
//                 <span className="text-red-500 dark:text-red-900">*</span>
//               )}
//             </FormLabel>
//           )}
//           <FormControl>
//             <Input
//               {...field}
//               placeholder={placeholder}
//               type="text" // Type is text, but we filter input
//               onChange={(e) => {
//                 const value = handleNumericInpatch(e);
//                 field.onChange(value);
//               }}
//             />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// }
