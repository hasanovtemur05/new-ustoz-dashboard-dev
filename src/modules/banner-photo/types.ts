export interface BannerPhoto {
  id: string;
  title: string;
  photo: string;
  whereIs: string;
  createdAt: string;
}

export interface CreateBannerPhotoPayload {
  title: string;
  whereIs: string;
  photo: File;
}
