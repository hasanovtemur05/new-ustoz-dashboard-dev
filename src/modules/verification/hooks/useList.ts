import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { GetDatasList } from '../api';
import { GetVerificationParams } from '../types';

export const useVerificationList = (params: GetVerificationParams) => {
    const { data = [], ...args } = useQuery({
        queryKey: ['verification_list', params],
        queryFn: () => GetDatasList(params),
        select: (data) => get(data, 'data.data.data'),
    });

    return {
        data,
        ...args,
    };
};
