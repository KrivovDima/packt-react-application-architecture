import { rest } from 'msw';

import { API_URL } from '@/config/constants';

import {
    AUTH_COOKIE,
    authenticate,
    requireAuth,
} from '../utils';

const loginHandler = rest.post(
    `${API_URL}/auth/login`,
    async (req, res, ctx) => {
        const credentials = await req.json();
        const { jwt, user } = authenticate(credentials);

        return res(
            ctx.delay(300),
            ctx.cookie(AUTH_COOKIE, jwt, {
                path: '/',
                httpOnly: true,
            }),
            ctx.json({ user })
        );
    }
);

const logoutHandler = rest.post(
    `${API_URL}/auth/logout`,
    async (req, res, ctx) => {
        return res(
            ctx.delay(300),
            ctx.cookie(AUTH_COOKIE, '', {
                path: '/',
                httpOnly: true,
            }),
            ctx.json({ success: true })
        );
    }
);

const meHandler = rest.get(
    `${API_URL}/auth/logout`,
    async (req, res, ctx) => {
        const user = requireAuth({
            cookies: req.cookies,
            shouldThrow: false,
        });

        return res(ctx.delay(300), ctx.json(user));
    }
);

// const loginHandler = http.post<
//     PathParams,
//     LoginRequestBody
// >(`${API_URL}/auth/login`, async ({ request }) => {
//     const credentials = await request.json();
//     const { jwt, user } = authenticate(credentials);

//     await delay(300);

//     return HttpResponse.json(
//         { user },
//         {
//             headers: {
//                 'Set-Cookie': `${AUTH_COOKIE}=${jwt}; Path=/; HttpOnly`,
//             },
//         }
//     );
// });

// const logoutHandler = http.post(
//     `${API_URL}/auth/logout`,
//     async () => {
//         await delay(300);

//         return HttpResponse.json(
//             { success: true },
//             {
//                 headers: {
//                     'Set-Cookie': `${AUTH_COOKIE}=; Path=/; HttpOnly`,
//                 },
//             }
//         );
//     }
// );

// const meHandler = http.get(
//     `${API_URL}/auth/logout`,
//     async ({ cookies }) => {
//         const user = requireAuth({
//             cookies,
//             shouldThrow: false,
//         });

//         await delay(300);

//         return HttpResponse.json(user);
//     }
// );

export const authHandlers = [
    loginHandler,
    logoutHandler,
    meHandler,
];
