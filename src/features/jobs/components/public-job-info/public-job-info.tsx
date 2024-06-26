import { ViewIcon } from '@chakra-ui/icons';
import {
    HStack,
    Heading,
    Text,
    VStack,
} from '@chakra-ui/react';

import { Content } from '@/components/content';
import { Link } from '@/components/link';

import { Job } from '../../types';

type PublicJobInfoProps = {
    job: Job;
};

export const PublicJobInfo = ({
    job,
}: PublicJobInfoProps) => {
    return (
        <>
            <VStack pt="16" pb="4" spacing="8">
                <Heading size="2xl">
                    {job.position}
                </Heading>
                <HStack spacing="12">
                    <Text>{job.department}</Text>
                    <Text>{job.location}</Text>
                </HStack>
                <Link
                    href={`/organizations/${job.organizationId}`}
                    variant="outline"
                    icon={<ViewIcon />}
                >
                    View more jobs
                </Link>
            </VStack>
            <Content>{job.info}</Content>
        </>
    );
};
