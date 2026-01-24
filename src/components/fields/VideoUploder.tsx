import { useFormContext } from 'react-hook-form';
import { FileUploader } from 'react-drag-drop-files';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from 'components/ui/form';
import { X as CloseIcon, FileText, Music } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getMediaUrl } from 'utils/common';

interface IProps {
  name: string;
  label?: string;
  required?: boolean;
  defaultValue?: string;
  types?: string[];
}

export default function MediaUploadField({ name, label, required, defaultValue, types }: IProps) {
  const { control } = useFormContext();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  useEffect(() => {
    if (defaultValue) {
      const mediaUrl = getMediaUrl(defaultValue);
      setPreviewUrl(mediaUrl);
      if (defaultValue.endsWith('.xlsx') || defaultValue.endsWith('.xls')) {
        setFileType('excel');
      } else if (defaultValue.endsWith('.mp4') || defaultValue.endsWith('.mov')) {
        setFileType('video');
      } else if (
        defaultValue.endsWith('.mp3') ||
        defaultValue.endsWith('.wav') ||
        defaultValue.endsWith('.m4a') ||
        defaultValue.endsWith('.aac') ||
        defaultValue.endsWith('.ogg') ||
        defaultValue.endsWith('.flac')
      ) {
        setFileType('audio');
      } else {
        setFileType('image');
      }
    }
  }, [defaultValue]);

  const handleFileChange = (file: File) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setFileType('excel');
      } else if (file.type.startsWith('video')) {
        setFileType('video');
      } else if (file.type.startsWith('audio')) {
        setFileType('audio');
      } else {
        setFileType('image');
      }
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        const hasFile = value instanceof File || previewUrl || (typeof value === 'string' && value.length > 0);

        return (
          <FormItem>
            {label && (
              <FormLabel>
                {`${label} `}
                {required && <span className="text-red-500 dark:text-red-900">*</span>}
              </FormLabel>
            )}
            <FormControl>
              {hasFile ? (
                <div className="relative p-1 border rounded-md max-w-fit">
                  {fileType === 'video' ? (
                    <video
                      src={value instanceof File ? URL.createObjectURL(value) : previewUrl || ''}
                      controls
                      className="max-w-full min-w-[80%] max-h-64"
                    />
                  ) : fileType === 'excel' ? (
                    <div className="flex items-center flex-1 gap-2 w-[380px]">
                      <FileText className="size-8 stroke-1" />
                      <span className="truncate text-sm flex-[0.8]">{value instanceof File ? value.name : defaultValue?.split('/').pop()}</span>
                    </div>
                  ) : fileType === 'audio' ? (
                    <div className="flex flex-col gap-2 w-[380px]">
                      <div className="flex items-center gap-2">
                        <Music className="size-8 stroke-1" />
                        <span className="truncate text-sm flex-[0.8]">
                          {value instanceof File ? value.name : defaultValue?.split('/').pop()}
                        </span>
                      </div>
                      <audio src={value instanceof File ? URL.createObjectURL(value) : previewUrl || ''} controls className="w-full" />
                    </div>
                  ) : (
                    <img
                      src={value instanceof File ? URL.createObjectURL(value) : previewUrl || ''}
                      alt="Preview"
                      className="max-w-full min-w-[80%] max-h-64"
                    />
                  )}
                  <div
                    className="absolute top-2 right-2 cursor-pointer bg-slate-300/70"
                    onClick={() => {
                      onChange(null);
                      setPreviewUrl(null);
                      setFileType(null);
                    }}
                  >
                    <CloseIcon />
                  </div>
                </div>
              ) : (
                <FileUploader
                  handleChange={(file: File) => {
                    onChange(file);
                    handleFileChange(file);
                  }}
                  name="media"
                  types={
                    types ? types : ['MP4', 'AVI', 'MOV', 'WEBM', 'JPG', 'PNG', 'GIF', 'XLSX', 'XLS', 'MP3', 'WAV', 'M4A', 'AAC', 'OGG', 'FLAC']
                  }
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
