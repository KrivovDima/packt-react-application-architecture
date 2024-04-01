import {
    Box,
    HStack,
    Heading,
    Text,
    VStack,
} from '@chakra-ui/react';

import { Content } from '@/components/content';

import { Job } from '../../types';

type DashboardJobInfoProps = {
    job: Job;
};

export const DashboardJobInfo = ({
    job,
}: DashboardJobInfoProps) => {
    return (
        <VStack>
            <VStack pt="16" pb="4" spacing="8">
                <Heading size="2xl">
                    {job.position}
                </Heading>
                <HStack spacing="12">
                    <Text>{job.department}</Text>
                    <Text>{job.location}</Text>
                </HStack>
            </VStack>
            <Box w="full">
                <Content>{job.info}</Content>
            </Box>
        </VStack>
    );
};
