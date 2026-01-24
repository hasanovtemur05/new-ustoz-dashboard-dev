import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { useFormContext } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRef, useMemo } from "react";
import { useEasyFileUploader } from "hooks/useFileUploader";
import normalizeImgUrl from "utils/normalizeFileUrl";
import toast, { Toaster } from "react-hot-toast";

interface IProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export default function RichTextEditorForQuiz({
  name,
  label,
  required,
  placeholder,
}: IProps) {
  const { control } = useFormContext();
  const quillRef = useRef<ReactQuill | null>(null);
  const { uploadFile: easyUpload } = useEasyFileUploader();
  const formats = ["header", "link", "image"];

  // Rasm yuklash handlerini funksiyaga biriktirish
  const imageHandler = async () => {
   
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          // const imageUrl = '0a838597-2e14-4c9d-ba17-418174b995b6.jpg ';
          const quill = quillRef.current?.getEditor();
          const range = quill?.getSelection();
          const toastId = toast.loading("Rasm yuklanmoqda ...");
          const imageUrl = await easyUpload(file);
          if (range && quill) {
            quill.insertEmbed(range.index, "image", normalizeImgUrl(imageUrl));
          }
          toast.dismiss(toastId);
        } catch (error) {
          console.error("Rasm yuklashda xatolik:", error);
        }finally{
        }
      }
    };
  };

  // Modullarni `useMemo` bilan bir marta yaratamiz
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [[{ header: [4, false] }], ["link", "image"]],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    };
  }, []);

  return (
    <div className="quiz_quill">
    <FormField
      control={control}
      defaultValue={"<p><br></p>"}
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
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={field.value}
              defaultValue={"<p><br></p>"}
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
    <Toaster/>
    </div>
  );
}
