
export type VerificationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type VerificationType = 'MAHALLA_LEADER' | 'OTM_LEADER' | 'USTOZAI_SARDAR';

export interface GetVerificationParams {
    pageNumber?: number;
    pageSize?: number;
    isActive?: boolean;
    status?: VerificationStatus;
    type?: VerificationType;
    userId?: string;
    search?: string;
}