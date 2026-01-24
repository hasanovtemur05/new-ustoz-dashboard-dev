export interface IUser {
  id?: string;
  phone?: string;
  birthday: string;
  email?: string | null;
  firstname?: string;
  lastname?: string;
  address?: {
    id?: string;
    country?: string;
    region?: string;
    district?: string;
    neighborhood?: string;
  };
}

export interface IUserCertificate {
  id?: string;
  user?: IUser | null;
  course?: {
    id?: string;
    title?: string;
  } | null;
  file?: string;

}
