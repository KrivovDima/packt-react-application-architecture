import { Entity } from '@/types';

export type AuthUser = Entity & {
    email: string;
    organizationId: string;
};
