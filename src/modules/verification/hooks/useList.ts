import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { GetDatasList } from '../api';
import { GetVerificationParams } from '../types';

export const useVerificationList = (params: GetVerificationParams) => {
    const { data, ...args } = useQuery({
        queryKey: ['verification_list', params],
        queryFn: () => GetDatasList(params),
        select: (res) => ({
            list: get(res, 'data.data.data'),
            paginationInfo: get(res, 'data.data.meta.pagination'),
        }),
    });

    return {
        list: data?.list || [],
        paginationInfo: data?.paginationInfo,
        ...args,
    };
};
