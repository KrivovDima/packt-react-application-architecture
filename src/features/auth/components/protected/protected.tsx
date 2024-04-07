import { Loading } from '@/components/loading';
import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useUser } from '../../api/get-auth-user';

type ProtectedProps = {
    children: ReactNode;
};

export const Protected = ({
    children,
}: ProtectedProps) => {
    const { replace, asPath } = useRouter();
    const user = useUser();

    const isNotUserData = !user.data && !user.isLoading;

    useEffect(() => {
        if (isNotUserData) {
            replace(
                `/auth/login?redirect=${asPath}`,
                undefined,
                { shallow: true }
            );
        }
    }, [user, asPath, replace]);

    if (user.isLoading) {
        return (
            <Flex
                direction="column"
                justify="center"
                h="full"
            >
                <Loading />
            </Flex>
        );
    }

    if (isNotUserData) {
        return null;
    }

    return <>{children}</>;
};
