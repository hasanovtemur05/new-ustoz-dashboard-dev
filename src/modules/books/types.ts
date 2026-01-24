interface DownloadLink {
  url: string;
  name: string;
}

export interface Book {
  id: string;
  name: string;
  description: string;
  image: string;
  download_link: DownloadLink;
  mutolaa_deep_link: string;
  author: string;
}

export interface BookInput {
  name: string;
  description: string;
  image: string;
  download_link: DownloadLink | string;
  mutolaa_deep_link?: string;
  author: string;
}

export interface BookEditBody {
  id: string;
  values: BookInput;
}
