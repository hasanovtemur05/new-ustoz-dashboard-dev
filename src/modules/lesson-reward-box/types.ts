export interface ILessonRewardBox {
  id: string;
  lessonId: string;
  courseId: string;
  title: string;
  image: string;
  description?: string;
  isClaimed: boolean;
  lessonTitle?: string;
  items: ILessonRewardBoxItem[];
}

export interface ILessonRewardBoxItem {
  id: string;
  rewardId: string;
  partId?: string | null;
  rewardType: string;
  rewardTitle: string;
  rewardPhoto: string;
  rewardValue?: number | null;
}

export interface ILessonRewardBoxInput {
  lessonId: string;
  courseId: string;
  title: string;
  image: string;
  description?: string;
}

export interface ILessonRewardBoxEdit {
  title?: string;
  image?: string;
  description?: string;
}

export interface ILessonRewardBoxItemInput {
  rewardId: string;
  partId?: string;
}

export interface IClaimBoxInput {
  boxId: string;
  courseId: string;
}
