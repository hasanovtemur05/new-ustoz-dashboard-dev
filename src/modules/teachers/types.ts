export interface TeacherType {
  id: string;
  fullname: string;
  photo: string;
  isActive?:boolean;
}


export interface TeacherInputType {
  fullname: string;
  photo: string;
}

export interface TeacherEditBodyType {
  id: string;
  values: TeacherInputType;
}

