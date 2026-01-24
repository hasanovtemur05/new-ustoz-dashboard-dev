export interface ICourseAssistant {
  id: string;
  courseId: string;
  assistantId: string;
  staticAnimation: string;
  thinkingAnimation: string;
  course: null | { title: string };
}

export interface ICourseAssistantInput {
  courseId: string;
  assistantId: string;
  staticAnimation: string | File;
  thinkingAnimation: string | File;
}

export interface ICourseAssistantEdit {
  id: string;
  values: ICourseAssistantInput;
}
