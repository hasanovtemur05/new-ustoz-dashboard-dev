export enum FortunaProductType {
  COIN = 'COIN',
  PRODUCT = 'PRODUCT',
  PROMOCODE = 'PROMOCODE',
  EMPTY = 'EMPTY',
  AMATEUR_CERTIFICATE = 'AMATEUR_CERTIFICATE',
  PROGRESSIVE_CERTIFICATE = 'PROGRESSIVE_CERTIFICATE'
}

export interface FortunaProduct {
  id: string;
  title: string;
  photo: string;
  content: string;
  probability: number;
  value: number;
  count: number;
  type: FortunaProductType;
  isActive: boolean;
}

export interface FortunaProductInputType {
  probability: number;
  value: number;
  title: string;
  photo: string;
  content: string;
  count: number;
  type: FortunaProductType;
  isActive: boolean;
}

export interface ProductEditBodyType {
  id: string;
  values: FortunaProductInputType;
}
