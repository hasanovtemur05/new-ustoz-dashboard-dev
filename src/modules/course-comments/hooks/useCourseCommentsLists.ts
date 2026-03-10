import { useQuery } from "@tanstack/react-query";
import { GetCourseComments } from "../api"; 

interface UseCourseCommentsParams {
  courseId: string;
  currentPage?: number;
  pageSize?: number;
  isEnabled?: boolean;
}

export const useCourseComments = ({ 
  courseId, 
  currentPage = 1, 
  pageSize = 10, 
  isEnabled = true,
}: UseCourseCommentsParams) => {
  const { data, isLoading, isError, ...args } = useQuery({
    queryKey: ['course_comments', courseId, currentPage],
    queryFn: () =>
      GetCourseComments({
        id: courseId,
        pageNumber: currentPage,
        pageSize,
      }),
    enabled: isEnabled && Boolean(courseId),
  });

  // API response.data ichida data va meta bor
  const responseData = data?.data;

  return {
    data: responseData?.data || [],
    isLoading,
    isError,
    paginationInfo: responseData?.meta?.pagination,
    ...args,
  };
};