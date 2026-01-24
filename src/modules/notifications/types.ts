import { BannerType } from 'modules/banner/types';

export interface Notification {
  id: string;
  title: string;
  content?: string;
  body?: string;
  photo?: string;
  type?: BannerType;
  link?: string | null;
  objectId?: string | null;
  createdAt: string;
  deliveredCount?: number;
  openedCount?: number;
}

export interface NotificationInput {
  title: string;
  content?: string;
  body?: string;
  photo?: string;
  type?: BannerType;
  link?: string | null;
  objectId?: string | null;
}

export interface NotificationEditBody {
  id: string;
  values: NotificationInput;
}
