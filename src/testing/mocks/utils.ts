import { IS_TEST } from '@/config/constants';
import { AuthUser } from '@/features/auth';

import { testData } from '../test-data';

import { db } from './db';
import { LoginRequestBody } from './types';

const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

export const AUTH_COOKIE = 'auth-token';

const sanitizeUser = (user: any): AuthUser => {
    const sanitizedUser = { ...user };
    delete sanitizedUser.password;
    return sanitizedUser;
};

export const authenticate = ({
    email,
    password,
}: LoginRequestBody) => {
    const user = db.user.findFirst({
        where: {
            email: {
                equals: email,
            },
        },
    });

    if (password === user?.password) {
        const sanitizedUser = sanitizeUser(user);
        const encodedToken = AUTH_TOKEN;

        return { user: sanitizedUser, jwt: encodedToken };
    }

    throw new Error('Invalid username or password');
};

export const getUser = () =>
    sanitizeUser(testData.users[0]);

export const requireAuth = ({
    cookies,
    shouldThrow,
}: {
    cookies: Record<string, string>;
    shouldThrow?: boolean;
}) => {
    if (IS_TEST) {
        return getUser();
    }

    const encodedToken = cookies[AUTH_COOKIE];

    if (encodedToken !== AUTH_TOKEN) {
        if (shouldThrow) {
            throw new Error(
                'No authorization token provided!'
            );
        }

        return null;
    }

    return getUser();
};
