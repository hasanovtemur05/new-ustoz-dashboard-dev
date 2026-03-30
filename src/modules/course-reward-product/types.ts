export enum LessonRewardType {
  COIN = 'COIN',
  PRODUCT = 'PRODUCT',
  PROMOCODE = 'PROMOCODE',
  FILE = 'FILE',
  EMPTY = 'EMPTY',
  AMATEUR_CERTIFICATE = 'AMATEUR_CERTIFICATE',
<<<<<<< HEAD
  PROFESSIONAL_CERTIFICATE = 'PROFESSIONAL_CERTIFICATE',
=======
  PROGRESSIVE_CERTIFICATE = 'PROGRESSIVE_CERTIFICATE'
>>>>>>> ede40e2eeea9f88bd42150309374bf2498843de0
}

export interface LessonReward {
  id: string;
  title: string;
  photo: string;
  description: string;
  value?: number;
  count?: number;
  type: LessonRewardType;
  file?: string;
  isPartial?: boolean;
  courseId?: string;
  parts?: { title: string; photo: string; value: number; lessonId: string }[];
}

export interface LessonRewardInputType {
  value?: any;
  title: string;
  photo: string;
  description: string;
  count?: any;
  type: LessonRewardType;
  file?: any;
  isPartial?: boolean;
  courseId?: string;
  parts?: { title: string; photo?: any; value: number; lessonId: string }[];
}

export interface LessonRewardEditBodyType {
  id: string;
  values: LessonRewardInputType;
}
