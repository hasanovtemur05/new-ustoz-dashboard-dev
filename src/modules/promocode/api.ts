import http from "services/api";
import { IPromocodeEditBody, IPromocodeInput } from "./types";

export const GetPromocodesList = async () => {
  return await http.get(`/promocode/`);
};

export const CreatePromocode = async (values: IPromocodeInput) => {
  return await http.post(`/promocode/`, values);
};

export const EditPromocode = async ({ values, id }: IPromocodeEditBody) => {
  return await http.patch(`/promocode/${id}`, values);
};

export const DeletePromocode = async (id: string) => {
  return await http.delete(`/promocode/${id}`);
};
