import { useQuery } from '@tanstack/react-query';
import { GetSurveyList } from '../api';
import { ISurvey } from '../types';

export const useSurveyList = () => {
  const { data, isLoading, isError } = useQuery<{ data: ISurvey[] }>({
    queryKey: ['survey_list'],
    queryFn: GetSurveyList,
  });

  return {
    surveys: data?.data || [],
    isLoading,
    isError,
  };
};
