import { useFormContext } from 'react-hook-form';
import { FileUploader } from 'react-drag-drop-files';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form';
import { X as CloseIcon, FileText } from 'lucide-react';
import normalizeFileUrl from 'utils/normalizeFileUrl';
import calculateFileSize from 'utils/calculateFileSize';

interface IProps {
  name: string;
  label?: string;
  required?: boolean;
  isFileUpload?: boolean;
}

export default function FileField({
  name,
  label,
  required,
  isFileUpload,
}: IProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
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
            {value ? (
              <div className="relative p-1 border rounded-md max-w-fit">
                {value?.type?.includes('pdf') ? (
                  <div className="flex items-center flex-1 gap-2">
                    <FileText className="size-8 stroke-1" />
                    <span className="truncate text-sm flex-[0.65]">
                      {value?.name}
                    </span>
                    <span className="text-sm flex-[0.2]">
                      {calculateFileSize(value.size)}
                    </span>
                  </div>
                ) : (
                  <>
                    {value?.url?.includes('pdf') ? (
                      <div className="flex items-center flex-1 gap-2 w-[380px]">
                        <FileText className="size-8 stroke-1" />
                        <span className="truncate text-sm flex-[0.8]">
                          {value?.name}
                        </span>
                      </div>
                    ) :value?.includes?.('<img') ? <div dangerouslySetInnerHTML={{__html:value}}  /> : (
                      <div className="max-w-96">
                        <img
                          src={
                            typeof value === 'string' ||
                            typeof value?.url === 'string'
                              ? normalizeFileUrl(value) : value?.id  ?normalizeFileUrl(value?.photo)
                              : URL.createObjectURL(value)
                          }
                          alt="preview"
                          className="min-w-28"
                        />
                      </div>
                    )}
                  </>
                )}

                <div
                  className="absolute top-2 right-2 cursor-pointer bg-slate-300/70"
                  onClick={() => onChange('')}
                >
                  <CloseIcon />
                </div>
              </div>
            ) : (
              <FileUploader
                handleChange={onChange}
                name="file"
                types={isFileUpload ? ['PDF'] : ['PNG', 'JPG']}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
