export enum DiscountEnum {
  PERCENT ='PERCENT',
  FIXED  ='FIXED',
  EMPTY ='',
} 
export interface IPromocode {
  id: string;
  code: string,
  discountType: DiscountEnum ,
  discountValue: number,
  maxUses: number,
  userLimit: number,
  minOrderValue: number,
  startDate: string,
  endDate: string
}

export interface IPromocodeInput {
  code: string,
  discountType: DiscountEnum ,
  discountValue: number,
  maxUses?: number | string | null,
  userLimit: number,
  minOrderValue: number,
  startDate: string,
  endDate: string
}

export interface IPromocodeEditBody {
  id: string;
  values: IPromocodeInput;
}
