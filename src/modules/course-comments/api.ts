import { GetCourseCommentsParams } from "modules/courses/types";
import { httpV2 } from "services/api";
import { StatusType } from "./types";

export const GetCourseComments = async ({id, pageNumber = 1, pageSize = 10, status,}: GetCourseCommentsParams) => {
  return await httpV2.get(`/course/${id}/ratings`, {
    params: { pageNumber, pageSize, status },
  });
};

export const RatingStatus = async (id: string, status: StatusType) => {
  return await httpV2.patch(`/course/rating/${id}/status`, status) // status allaqachon object
}