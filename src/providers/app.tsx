import {
    ChakraProvider,
    GlobalStyle,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

import { theme } from '@/config/theme';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Notifications } from '@/components/notifications';

type AppProviderProps = {
    children: ReactNode;
};

export const AppProvider = ({
    children,
}: AppProviderProps) => {
    return (
        <ChakraProvider theme={theme}>
            <ErrorBoundary
                fallback={<div>Something went wrong</div>}
                onError={console.error}
            >
                <GlobalStyle />
                <Notifications />
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools
                        initialIsOpen={false}
                    />
                    {children}
                </QueryClientProvider>
            </ErrorBoundary>
        </ChakraProvider>
    );
};
