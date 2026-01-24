import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form';
import { useFormContext } from 'react-hook-form';
import QuillEditor from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface IProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export default function RichTextEditor({
  name,
  label,
  required,
  placeholder,
}: IProps) {
  const { control } = useFormContext();

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
  ];
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, 'link'],
      ],
    },
    clipboard: {
      matchVisual: true,
    },
  };

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
            <QuillEditor
              theme="snow"
              value={field.value}
              onChange={field.onChange}
              formats={formats}
              modules={modules}
              placeholder={placeholder}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}