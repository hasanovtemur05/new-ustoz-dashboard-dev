export interface PlayList {
  title: string;
  short_description: string;
  youtube_link: string;
}

export interface Tournament {
  id: string;
  title: string;
  thumbnail: string;
  short_description: string;
  date: string;
  playlist: PlayList[];
}
