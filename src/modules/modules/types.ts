export interface Module {
  id: string;
  title: string;
  courseId: string;
  isActive: boolean;
  degree?: string;
}

export interface ModuleCreateInput {
  title: string;
  courseId: string;
  isActive: boolean;
  degree?: string;
}

export interface ModuleEditInput {
  title: string;
  courseId: string;
  isActive: boolean;
  degree?: string;
}

export interface ModuleEditBody {
  id: string;
  values: ModuleEditInput;
}
