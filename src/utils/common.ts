import { baseMediaUrl } from "services/api";

export function isYouTubeUrl(url: string): boolean {
  if (!url) return false;
  const pattern =
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\/.+$/i;
  return pattern.test(url.trim());
}

export const getMediaUrl = (path?: string): string => {
  if (path && !path.startsWith('http')) {
    return `${baseMediaUrl}/${path}`;
  } else if (path) {
    return path;
  }
  return '';
};