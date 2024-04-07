import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';
import { AuthUser, LoginData } from '../types';

export const login = (
    data: LoginData
): Promise<{ user: AuthUser }> => {
    return apiClient.post('auth/login', data);
};

type UseLoginOptions = {
    onSuccess?: (user: AuthUser) => void;
};

export const useLogin = ({
    onSuccess,
}: UseLoginOptions) => {
    const { mutate: submit, isPending } = useMutation({
        mutationFn: login,
        onSuccess: ({ user }) => {
            queryClient.setQueryData(['auth-user'], user);
            onSuccess?.(user);
        },
    });

    return { submit, isPending };
};
