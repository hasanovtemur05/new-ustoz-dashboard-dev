export interface DailyData {
  count: number;
  date: Date;
  amount: number;
}

export interface IOwerviewData {
  users: number;
  lessons: number;
  courses: number;
  courseViews: number;
  certificates: number;
  premiumAmount: number;
  donationAmount: number;
  freePremiums: number;
  payedPremiums: number;
}

export enum AuthType {
  GOOGLE = 'GOOGLE',
  APPLE = 'APPLE',
  EMAIL = 'EMAIL',
}
// export interface IMonthlyOwerviewData {
//   users: number;
//   lessons: number;
//   courses: number;
//   views: number;
//   quizes: number;
//   certificates: number;
//   gender: {
//     Ayol: number;
//     Erkak: number;
//   };
// }
export interface IMonthlyOwerviewData {
  users: {
    all: number;
    monthly: number;
  };
  lessons: {
    all: number;
    monthly: number;
  };
  certificates: {
    all: number;
    monthly: number;
  };
  quizes: {
    all: number;
    monthly: number;
  };
  views: {
    all: number;
    monthly: number;
  };
  courses: {
    all: number;
    monthly: number;
  };
  gender: {
    Ayol: {
      all: number;
      monthly: number;
    };
    Erkak: {
      all: number;
      monthly: number;
    };
  };
  dau: {
    dau: number;
    mau: number;
    dauMauRate: number;
    churnRate: number;
  };
}
