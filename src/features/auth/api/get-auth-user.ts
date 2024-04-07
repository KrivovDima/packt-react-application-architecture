import { apiClient } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { AuthUser } from '../types';

const getAuthUser = (): Promise<AuthUser> => {
    return apiClient.get('/auth/me');
};

export const useUser = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['auth-user'],
        queryFn: () => getAuthUser(),
    });

    return { data, isLoading };
};
