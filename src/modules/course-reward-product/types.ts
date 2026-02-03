export enum LessonRewardType {
  COIN = 'COIN',
  PRODUCT = 'PRODUCT',
  PROMOCODE = 'PROMOCODE',
  FILE = 'FILE',
  EMPTY = 'EMPTY',
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
}

export interface LessonRewardInputType {
  value?: any;
  title: string;
  photo: string;
  description?: string;
  count?: any;
  type: LessonRewardType;
  file?: any;
}

export interface LessonRewardEditBodyType {
  id: string;
  values: LessonRewardInputType;
}
