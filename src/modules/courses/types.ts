export interface Seo {
  title: string;
  description: string;
  keywords: string | string[];
}

export type PricingType = 'FREE' | 'PAID' | 'TOURISM';

export interface Course {
  id: string;
  title: string;
  description: string;
  seo: Seo | null;
  banner: string;
  icon: string;
  slug: string;
  pricingType: PricingType;
  isActive: boolean;
  planLessonCount?: number;
  type?: string;
  degree?: string;
  price?: number;
  audioLink?: string;
  teacherId: string;
  ratingCount: number;
  seoKeywords: string | string[];
}

export interface CourseInput {
  title?: string;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string | string[];
  banner?: string;
  icon?: string;
  slug?: string;
  pricingType?: PricingType;
  isActive?: boolean;
  planLessonCount?: number;
  type?: string;
  degree?: string;
  price?: number;
  audioLink?: string;
  teacherId?: string;
  seo?: Seo | null;
}

export interface CourseEditBody {
  id: string;
  values: CourseInput;
}



  // User interfeysi
interface User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  badge: string;
  photo: string;
}

// Reply interfeysi
interface Reply {
  id: string;
  content: string;
  createdAt: string; // yoki Date, agar parse qilmoqchi bo'lsangiz
  user: User;
  likesCount: number;
  isLiked: boolean;
}

// Data item interfeysi
interface DataItem {
  id: string;
  value: number;
  content: string;
  createdAt: string; // yoki Date
  user: User;
  likesCount: number;
  isLiked: boolean;
  replies: Reply[];
}

// Pagination interfeysi
interface Pagination {
  count: number;
  pageCount: number;
  pageNumber: number;
  pageSize: number;
}

// Meta interfeysi
interface Meta {
  pagination: Pagination;
}

// Yakuniy API Response interfeysi
export interface GetCourseCommentsParams {
  data: DataItem[];
  meta: Meta;
}


// types.ts


