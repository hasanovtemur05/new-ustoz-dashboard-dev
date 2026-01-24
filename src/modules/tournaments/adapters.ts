import { PlayList, Tournament } from './types';

export const getTournament = (item?: Tournament) => {
  return {
    id: item?.id ?? '',
    title: item?.title ?? '',
    thumbnail: item?.thumbnail ?? '',
    short_description: item?.short_description ?? '',
    date: item?.date ?? '',
    playlist: item?.playlist?.length
      ? item.playlist.map(list => getPlayList(list))
      : [],
  };
};

export const getTournamentsList = (data?: Tournament[]) => {
  return data?.length
    ? data.map(item => {
        return getTournament(item);
      })
    : [];
};

function getPlayList(item: PlayList) {
  return {
    title: item?.title ?? '',
    short_description: item?.short_description ?? '',
    youtube_link: item?.youtube_link ?? '',
  };
}
