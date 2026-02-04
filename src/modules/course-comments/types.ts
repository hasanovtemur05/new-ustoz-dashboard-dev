export interface CourseRating {
  id: string;
  courseId: string;
  value: number;
  content: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;

  user: {
    id: string;
    firstname: string;
    lastname: string;
    photoUrl: string | null;
  };

  // UI uchun qo‘shimcha (optional)
  userFullName?: string;
  userPhoto?: string | null;
}

export interface StatusType {
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface CourseCommentsType {
  data: {
    id: string;
    courseId: string;
    content: string;
    createdAt: string; // ISO string
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    user: {
      firstname: string;
      lastname: string;
      id: string;
      photoUrl: string | null;
    };
    userId: string;
    value: number;
  }[];
  meta: {
    pagination: {
      count: number;
      pageCount: number;
      pageNumber: number;
      pageSize: number;
    };
  };
};
