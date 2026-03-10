import http from "services/api";

interface CreateInfluencerDto {
  userId: string;
  courseId: string;
}

export const GetInfluencerList = async (courseId: string) => {
  return await http.get(`/course-influencer/public?courseId=${courseId}`);
};

export const CreateInfluencer = async (values: CreateInfluencerDto) => {
  return await http.post('/course-influencer/', values);
};

export const DeleteInfluencer = async (id: string) => {
  return await http.delete(`/course-influencer/${id}`);
};

