import http from 'services/api';
export const GetTournamentsList = async () => {
  return await http.get(`/tournaments/`);
};
