export declare namespace IApi {
  export interface SignIn {
    credentials: string;
    password: string;
  }

  export interface SignUp {
    first_name: string;
    last_name: string;
    credentials: string;
    password1: string;
    password2: string;
  }

  export interface Verify {
    key?: string;
  }

  export interface ResetPassword {
    credentials: string;
  }
}

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  COURSE_ADMIN = 'COURSE_ADMIN',
  SHOP_ADMIN = 'SHOP_ADMIN',
  NOTIFICATION_ADMIN = 'NOTIFICATION_ADMIN',
  STATISTICS_ADMIN = 'STATISTICS_ADMIN',
}

export interface IAuthData {
  accessToken: string;
  refreshToken: string;
  role: UserRole;
}
