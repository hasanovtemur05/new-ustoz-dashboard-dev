export interface ICourseReward {
  id: string;
  title: string;
  orderId: number;
  reward: string;
  rewardId: string;
  rewardType?: string;
  rewardPhoto?: string;
  lessonId: string;
  partId?: string;
  isPartial?: boolean;
  partNumber?: number;
  totalParts?: number;
}

export interface ICourseRewardInput {
  courseId: string;
  lessonId: string;
  rewardId?: string;
  partId?: string;
}

export interface ICourseAssistantEdit {
  id: string;
  values: ICourseRewardInput;
}
