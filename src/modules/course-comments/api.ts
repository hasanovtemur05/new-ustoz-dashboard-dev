import http from "services/api";
import { GetCourseCommentsParams } from "./types";

export const GetCourseComments = async ({
  id, 
  pageNumber = 1, 
  pageSize = 10,
}: GetCourseCommentsParams) => {
  const response = await http.get(`/rating/course/${id}`, {
    params: { pageNumber, pageSize },
  });
  return response.data;
};


export const ReplayCommits = async (ratingId: string, content: string) => {
  const response = await http.post(`/rating/${ratingId}/reply`, {
    content,
  });
  return response.data;
};

export const Delete = async (id: string) => {
  const response = await http.delete(`/rating/reply/${id}`);
  return response.data;
};