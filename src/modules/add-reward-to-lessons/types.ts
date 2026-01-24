export interface ICourseReward {
  id: string;
  title: string;
  orderId: number;
  reward: string;
  rewardId: string;
  lessonId: string;
}

export interface ICourseRewardInput {
  courseId: string;
  lessonId: string;
  rewardId?: string;
}

export interface ICourseAssistantEdit {
  id: string;
  values: ICourseRewardInput;
}
