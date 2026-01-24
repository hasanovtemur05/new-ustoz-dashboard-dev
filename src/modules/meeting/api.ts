import http from "services/api";
import { IMeetingEditBody, IMeetingInput } from "./types";

export const GetMeetingsList = async () => {
  return await http.get(`/vebinar/`);
};

export const CreateMeeting = async (values: IMeetingInput) => {
  return await http.post(`/vebinar/`, values);
};

export const EditMeeting = async ({ values, id }: IMeetingEditBody) => {
  return await http.patch(`/vebinar/${id}`, values);
};

export const DeleteMeeting = async (id: string) => {
  return await http.delete(`/vebinar/${id}`);
};
