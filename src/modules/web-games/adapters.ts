
import { WebGamesResponse } from "./types";
export const adaptGamesList = (item?: WebGamesResponse) => {
  return {
   id:item?.id || '',
   name: item?.name || '',
   logo: item?.logo || '',
   description: item?.description || '',
   link: item?.link || '',
   isActive: item?.isActive || false,
  };
};

export const getGamesList = (data?: WebGamesResponse[]) => {
  return data?.length
    ? data.map((item) => {
        return adaptGamesList(item);
      })
    : [];
};
