import { Book } from './types';
export const getBook = (item?: Book) => {
  return {
    id: item?.id ?? '',
    name: item?.name ?? '',
    photo: item?.photo ?? '',
    file: item?.file ?? '',
    pagesCount: item?.pagesCount ?? 0,
    description: item?.description ?? '',
    createdAt: item?.createdAt ?? ''
  };
};

export const getBooksList = (data?: Book[]) => {
  return data?.length
    ? data.map(item => {
        return getBook(item);
      })
    : [];
};
