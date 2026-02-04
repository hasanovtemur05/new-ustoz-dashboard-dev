export enum DonationStatus {
  NEW = 'NEW',
  PENDING = 'PENDING',
  DONE = 'DONE',
  CANCELED = 'CANCELED',
}

export enum OrderType {
  ALL = 'ALL',
  DELETED = 'DELETED',
  ACTIVE = 'ACTIVE',
}

interface User {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
}
interface IProduct {
  title: string;
  count: number;
}
export interface IOrder {
  id: string;
  orderId: number;
  price: number;
  comment: string;
  status: DonationStatus;
  user?: User | null;
  product?: IProduct | null;
  updatedAt?: string;
  createdAt?: string;
}

export interface IOrderInput {
  id: string;
  status: DonationStatus;
}

export interface OrdersCreateType {
  userId: string;
  productId: string;
}

export interface IOrdersFilter {
  id: string,
  userId: string,
  courseId: string,
  amount: number,
  createdAt: string,
  user: {},
  course: {}
}

export interface OrdersFormType {
  userId: string;
  courseId: string;
}
