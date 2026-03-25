import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RejectVerification, ApproveVerification } from '../api';

export const useRejectVerification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, rejectReason }: { id: string; rejectReason: string }) =>
            RejectVerification(id, rejectReason),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['verification_list'] });
        },
    });
};

export const useApproveVerification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => ApproveVerification(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['verification_list'] });
        },
    });
};