import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';
import { CreateJobData, Job } from '../types';

type CreateJobOptions = {
    data: CreateJobData;
};

export const createJob = ({
    data,
}: CreateJobOptions): Promise<Job> => {
    return apiClient.post('/jobs', data);
};

type UseCreateJobOptions = {
    onSuccess?: (job: Job) => void;
};

export const useCreateJob = ({
    onSuccess,
}: UseCreateJobOptions) => {
    const { mutate: submit, isPending } = useMutation({
        mutationFn: createJob,
        onSuccess: (job) => {
            queryClient.invalidateQueries({
                queryKey: ['jobs'],
            });
            onSuccess?.(job);
        },
    });

    return { submit, isPending };
};
