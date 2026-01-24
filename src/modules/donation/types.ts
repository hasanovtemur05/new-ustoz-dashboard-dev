import { IUser } from "modules/user-certificate/types";



export interface Donation {
  id: string;
  amount: number;
  user: IUser | null;
  createdAt: string;
  transaction:{provider:string} | null
}


