import { rest } from 'msw';

import { API_URL } from '@/config/constants';
import { authHandlers } from './auth';
import { jobsHandlers } from './jobs';
import { organizationsHandlers } from './organizations';

export const handlers = [
    ...authHandlers,
    ...jobsHandlers,
    ...organizationsHandlers,
    // TODO api новой версии (не поддерживает next > 13 версии)
    // http.get(`${API_URL}/healthcheck`, async () => {
    //     return HttpResponse.json(
    //         { healthy: true },
    //         { status: 200 }
    //     );
    // }),
    rest.get(
        `${API_URL}/healthcheck`,
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({ healthy: true })
            );
        }
    ),
];
