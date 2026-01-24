export interface IMarketPromocode {
  id?: string;
  file?: string;
  productId?: string;
  title?: string;
  total?: number;
  unused?: number;
}

export interface IMarketPromocodeInput {
  file: string;
  productId: string;
}

export interface IMarketPromocodeEditBody {
  id: string;
  values: IMarketPromocodeInput;
}
