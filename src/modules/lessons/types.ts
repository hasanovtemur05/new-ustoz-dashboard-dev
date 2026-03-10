export interface Lesson {
  thumbnail?: string;
  id: string;
  title: string;
  description: string;
  link: string;
  moduleId: string;
  duration: number;
  linkType: LessonLinkType;
  isSoon: boolean;
  isActive: boolean;
  orderId: number;

}

export interface LessonInput {
  title: string;
  description: string;
  link: string | File;
  moduleId: string;
  duration?: number;
  isSoon: boolean;
  isActive: boolean;
  thumbnail?: string;
}

export interface LessonEditBody {
  id: string;
  values: LessonInput;
}

export enum LessonLinkType {
  YOU_TUBE = 'YOU_TUBE',
  VIDEO = 'VIDEO',
}
