export enum DiscountEnum {
  PERCENT = 'PERCENT',
  FIXED = 'FIXED',
  EMPTY = '',
}

export interface IPromocode {
  id: string;
  code: string;
  discountType: DiscountEnum;
  discountValue: number;
  maxUses: number;
  userLimit: number;
  minOrderValue: number;
  startDate: string;
  endDate: string;
}

export interface IPromocodeInput {
  code: string;
  discountType: DiscountEnum;
  discountValue: number;
  maxUses?: number | string | null;
  userLimit: number;
  minOrderValue: number;
  startDate: string;
  endDate: string;
}

export interface IPromocodeEditBody {
  id: string;
  values: IPromocodeInput;
}

// export interface GetPromocodesParams {
//   search?: string;
//   currentPage?: number;  // pageNumber o'rniga currentPage
//   pageSize?: number;
//   isActive?: boolean;
// }

// Pagination info type
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}