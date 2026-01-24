export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

export interface IStoryMedia {
  mediaType: MediaType;
  mediaUrl: string | File;
  sortId?: number;
  title: string;
  button: string;
  link?: string;
  type?: string;
  deadline: string;
  objectId?: string;
}

export interface StoryV2Type {
  id: string;
  title?: string;
  thumbnailUrl: string;
  media: IStoryMedia[];
}

export interface StoryV2InputType {
  title?: string;
  thumbnailUrl: string;
  media?: IStoryMedia[];
}

export interface StoryV2EditBodyType {
  id: string;
  values: StoryV2InputType;
}
