import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "components/ui/form";
import { FileField, SelectField, TextField } from "components/fields";
import LoadingButton from "components/LoadingButton";
import useFileUploader from "hooks/useFileUploader";
import { useEffect, useState } from "react";
import { schema, useFormSchemaType } from "./schema";
import { StoryInputType, StoryType } from "modules/story/types";
import { useEditStory } from "modules/story/hooks/useEdit";
import { useCreateStory } from "modules/story/hooks/useCreate";
import DateTimePicker from "components/DateAndTimePicker";
import { BannerType } from "modules/banner/types";
import { useCoursesList } from "modules/courses/hooks/useCoursesList";
import { SelectType } from "pages/Certificate/CustomForm";
import VideoUploadField from "components/fields/VideoUploder";
import { cleanEmptyStrings } from "utils/clearEmptyKeys";
interface IProps {
  story?: StoryType;
  setSheetOpen: (state: boolean) => void;
}
const typeData = [
  { type: BannerType.COURSE, name: "Kurslar" },
  { type: BannerType.LEADERBOARD, name: "Peshqadamlar" },
  { type: BannerType.SHOP, name: "Do'kon" },
  { type: BannerType.LINK, name: "Havola" },
];
export default function CustomForm({ story, setSheetOpen }: IProps) {
  const [coursesData, setCoursesData] = useState<SelectType[]>([]);
  const [state, setState] = useState(false);
  const { uploadFile } = useFileUploader();

  const { triggerCreate, isPending: isInfoCreatePending } = useCreateStory({
    setSheetOpen,
  });
  
  const { triggerEdit, isPending: isNotificationEditPending } = useEditStory({
    id: story?.id,
    setSheetOpen,
  });


  // get courses
  const { data: coursesList } = useCoursesList();

  const form = useForm<useFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: story
      ? {
          title: story?.title,
          link: story?.link,
          deadline: story?.deadline?.replace(':00.000Z' ,''),
          photo: story?.photo,
          video: story?.video,
        }
      : {
          title: "",
          link: "",
          deadline: "",
          photo: "",
          video: "",
        },
  });

  async function onSubmit(formValues: useFormSchemaType) {
    try {
      setState(true);
      const formattedValues = { ...formValues ,deadline:formValues.deadline + ':00Z' };
      const values = await uploadFile<StoryInputType>(formattedValues, "photo");
      const valuesWithVideo = await uploadFile<StoryInputType>(values, "video");
      const payload = cleanEmptyStrings(valuesWithVideo);

      if (story) {
        triggerEdit(payload);
      } else {
        triggerCreate(payload);
      }
      setState(false);
    } catch (error) {
      setState(false);
      alert("Aniqlanmagan hatolik!");
    }
  }

  const type = form.watch("type");

  useEffect(() => {
    if (type === BannerType.COURSE || story?.type === BannerType.COURSE) {
      form.register("objectId", { required: "Kursni tanlash talab qilinadi" });
    }
    if (type === BannerType.LINK || story?.type === BannerType.LINK) {
      form.register("link", { required: "Link kiritish talab qilinadi" });
    }
    if (type === BannerType.CONTENT || story?.type === BannerType.CONTENT) {
      form.register("content", { required: "Banner kontenti talab qilinadi" });
    }
  }, [type, story]);

  useEffect(() => {
    let newArr: SelectType[] = [];
    coursesList.forEach((el) =>
      newArr.push({
        name: el.title,
        type: el.id,
      })
    );
    setCoursesData(newArr);
  }, [coursesList]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <div className="flex gap-4 flex-col my-4">
          {/* <SelectField
            name="location"
            data={locationData}
            placeholder="Locaton turini tanlang..."
            label="Locaton turini tanglang"
          /> */}
          <TextField name="title" key="title" label="Hikoya nomi" required />
          <TextField
            name="button"
            key="button"
            label="Hikoya tugmasining  nomi"
            required
            placeholder="Boshlash, Ko'rish"
          />
          <FileField name="photo" label="Hikoya rasmi" />

          <VideoUploadField
            name="video"
            label="Hikoya videosi"
            defaultValue={story?.video}
          />
          <DateTimePicker
            name="deadline"
            label="Hikoyani tugash vaqtini kiriting"
          />

          <SelectField
            name="type"
            data={typeData}
            placeholder="Hikoya turini tanlang..."
            label="Hikoya turini tanglang"
          />

          {(type === BannerType.COURSE || (story && story?.objectId)) &&
            (coursesData?.length ? (
              <SelectField
                name="objectId"
                key="objectId"
                data={coursesData}
                placeholder="Kursni  tanlang..."
                label="Kursni  tanglang"
              />
            ) : (
              "Kurslar yuklanishda hatolik!"
            ))}

          {(type === BannerType.LINK || (story && story?.link)) && (
            <TextField name="link" key="link" label="Hikoya linki" required />
          )}

          {type === BannerType.CONTENT && (
            <>
              <TextField
                name="content"
                key="content"
                label="Hikoya kontenti"
                required
              />
            </>
          )}
        </div>
        {story ? (
          <LoadingButton isLoading={isNotificationEditPending}>
            Tahrirlash
          </LoadingButton>
        ) : (
          <LoadingButton isLoading={state}>Saqlash</LoadingButton>
        )}
      </form>
    </Form>
  );
}
