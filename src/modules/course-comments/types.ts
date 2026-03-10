export type StatusType = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface UserInfo {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  badge?: string;
  photo?: string;
  photoUrl?: string;
}

export interface CommentReply {
  id: string;
  content: string;
  createdAt: string;
  user: UserInfo;
  likesCount: number;
  isLiked: boolean;
}

export interface CourseComment {
  id: string;
  value: number; // rating (1-5)
  content: string;
  createdAt: string;
  status: StatusType;
  user: UserInfo;
  likesCount: number;
  isLiked: boolean;
  replies: CommentReply[];
}

export interface GetCourseCommentsParams {
  id: string;
  pageNumber?: number;
  pageSize?: number;
  status?: StatusType;
}

export interface CreateReplyParams {
  ratingId: string;
  content: string;
}

export interface DeleteReplyParams {
  replyId: string;
}

export interface GetCourseCommentsResponse {
  data: CourseComment[];
  meta: {
    pagination: {
      count: number;
      pageCount: number;
      pageNumber: number;
      pageSize: number;
    };
  };
}

export interface CreateReplyResponse {
  id: string;
  content: string;
  createdAt: string;
  user: UserInfo;
  likesCount: number;
  isLiked: boolean;
}

export interface DeleteReplyResponse {
  success: boolean;
  message?: string;
}
