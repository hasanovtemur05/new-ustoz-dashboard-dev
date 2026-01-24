import { useQuery } from "@tanstack/react-query";
import { GetCourseComments } from "../api"; 

interface UseCourseCommentsParams {
  courseId: string;
  currentPage?: number;
  pageSize?: number;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  isEnabled?: boolean;
}

export const useCourseComments = ({ courseId, currentPage = 1, pageSize = 10, status, isEnabled = true,}: UseCourseCommentsParams) => {
  const initialData = {
    data: [],
    paginationInfo: null,
  };

  const { data = initialData, ...args } = useQuery({
    queryKey: ['course_comments', courseId, currentPage, status],
    queryFn: () =>
      GetCourseComments({
        id: courseId,
        pageNumber: currentPage,
        pageSize,
        status,
      }),
    enabled: isEnabled && Boolean(courseId),
  });

  return {
    ...data?.data,
    ...args,
  };
};