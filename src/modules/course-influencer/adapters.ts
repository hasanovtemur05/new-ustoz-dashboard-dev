import { Influencer } from "./types";

export const getInfluencerList = (data?: any[]): Influencer[] => {
  if (!data) return [];


  return data.map((item) => ({
    id: item.id,
    user: {
      id: item.user.id,
      firstname: item.user.firstname,
      lastname: item.user.lastname,
      username: item.user.username, 
      badge: item.user.badge || '—',
    },
  }));
};