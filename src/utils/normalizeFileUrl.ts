export default function normalizeImgUrl(fileUrl: string) {
  return `${process.env.REACT_APP_UPLOAD_URL}/${fileUrl}`;
}
