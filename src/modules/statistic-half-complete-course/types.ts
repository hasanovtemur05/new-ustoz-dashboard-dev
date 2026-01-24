

interface Address {
  region: string;
  district: string;
  neighborhood: string;
}

export interface HalfCompleteCourse {
  id: string;
  title: string;
  totalLessons: number;
  completedLessons: number;
  completionPercentage: number;
}

export interface IUserHalfCompleteCourse {
  id: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  address: Address;
  courses: HalfCompleteCourse[];
}
