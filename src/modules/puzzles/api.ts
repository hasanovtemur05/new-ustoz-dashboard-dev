import http from 'services/api';
import { PuzzleEditBody, PuzzleInput } from './types';

export const GetPuzzlesList = async (currentPage: number) => {
  return await http.get(`/puzzles/all?sort=created_at&pageNumber=${currentPage}`);
};

export const CreatePuzzle = async (values: PuzzleInput) => {
  return await http.post(`/puzzles/`, values);
};

export const EditPuzzle = async ({ values, id }: PuzzleEditBody) => {
  return await http.patch(`/puzzles/${id}`, values);
};

export const DeletePuzzle = async (id: string) => {
  return await http.delete(`/puzzles/${id}`);
};
