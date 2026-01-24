import type { Course } from "./types"

export const getCourse = (item?: Course) => {
  return {
    id: item?.id ?? "",
    slug: item?.slug ?? "",
    title: item?.title ?? "",
    description: item?.description ?? "",
    icon: item?.icon ?? "",
    pricingType: item?.pricingType ?? "FREE",
    planLessonCount: item?.planLessonCount ?? undefined,
    type: item?.type ?? undefined,
    degree: item?.degree ?? undefined,
    price: item?.price ?? undefined,
    audioLink: item?.audioLink ?? undefined,
    teacherId: item?.teacherId ?? "",
    banner: item?.banner ?? "",
    seoKeywords: item?.seoKeywords ?? [""],
    seo: item?.seo ? item?.seo : null,
  }
}

export const getCoursesList = (data?: Course[]) => {
  return data?.length
    ? data.map((item) => {
        return getCourse(item)
      })
    : []
}

