import http from 'services/api';
import { WebGamesBody, WebGamesInput } from './types';


export const GetgamesList = async () => {
  return await http.get(`/web-games`);
};

export const CreateGames = async (values: WebGamesInput) => {
  return await http.post(`/web-games/`, values);
};

export const EditGames = async ({ id, value }: WebGamesBody) => {
  return await http.patch(`/web-games/${id}`, value);
};

export const DeleteGames = async (id: string) => {
  return await http.delete(`/web-games/${id}`);
};
