import http from 'services/api';
import { GetVerificationParams } from './types';


export const GetDatasList = async (params?: GetVerificationParams) => {
    return await http.get(`/verification`, { params });
};



export const RejectVerification = async (id: string, rejectReason: string) => {
    return await http.patch(`/verification/${id}/reject`, { reject_reason: rejectReason });
};
export const ApproveVerification = async (id: string) => {
    return await http.patch(`/verification/${id}/approve`);
};
