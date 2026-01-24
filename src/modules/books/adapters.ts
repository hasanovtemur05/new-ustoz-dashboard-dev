import { Book } from './types';
export const getBook = (item?: Book) => {
  return {
    id: item?.id ?? '',
    name: item?.name ?? '',
    description: item?.description ?? '',
    image: item?.image ?? '',
    download_link: item?.download_link ?? {
      url: item?.download_link.url ?? '',
      name: item?.download_link.name ?? '',
    },
    mutolaa_deep_link: item?.mutolaa_deep_link ?? '',
    author: item?.author ?? '',
  };
};

export const getBooksList = (data?: Book[]) => {
  return data?.length
    ? data.map(item => {
        return getBook(item);
      })
    : [];
};
