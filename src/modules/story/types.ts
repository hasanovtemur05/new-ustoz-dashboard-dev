export interface StoryType {
  id: string;
  title: string;
  link: string;
  photo: string;
  deadline: string;
  video: string;
  type?: string;
  content: string,
  objectId: string,
  button: string,
}


export interface StoryInputType {
  title: string;
  link: string;
  photo: string;
  deadline: string;
  video: string;
  type?: string;
  content: string,
  objectId: string,
  button: string,
}

export interface StoryEditBodyType {
  id: string;
  values: StoryInputType;
}

