export interface Premium {
  id: string;
  user: {
    phone: string;
    email: string | null;
  };
  plan: {
    id: string;
    title: string;
  };
  isGift: boolean;
  startDate: string;
  endDate: string;
  amount: number;
  date: string;
  promocode: {
    id: string;
    code: string;
  };
}

export interface PremiumInputType {
  user: string;
  plan: string;
}

export interface PremiumEditBodyType {
  id: string;
  values: PremiumInputType;
}

type Address = {
  country: string;
  region: string;
  district: string;
  [key: string]: any;
};

export type User = {
  address: Address | null;
  balance: number;
  birthday: string;
  email: string | null;
  first_name: string;
  gender: string;
  image: string | null;
  last_name: string;
  onlineTime: number;
  phone_number: string;
  points: number;
  source: string;
  user: string;
};
