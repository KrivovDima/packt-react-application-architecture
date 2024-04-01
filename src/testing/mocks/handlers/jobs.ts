import { rest } from 'msw';

import { API_URL } from '@/config/constants';

import { db } from '../db';
import { requireAuth } from '../utils';

const getJobsHandler = rest.get(
    `${API_URL}/jobs`,
    async (req, res, ctx) => {
        const organizationId = req.url.searchParams.get(
            'organizationId'
        ) as string;

        const jobs = db.job.findMany({
            where: {
                organizationId: {
                    equals: organizationId,
                },
            },
        });

        return res(
            ctx.delay(300),
            ctx.status(200),
            ctx.json(jobs)
        );
    }
);

const getJobHandler = rest.get(
    `${API_URL}/jobs/:jobId`,
    async (req, res, ctx) => {
        const jobId = req.params.jobId as string;

        const job = db.job.findFirst({
            where: {
                id: {
                    equals: jobId,
                },
            },
        });

        if (!job) {
            return res(
                ctx.delay(300),
                ctx.status(404),
                ctx.json({ message: 'Not found!' })
            );
        }

        return res(
            ctx.delay(300),
            ctx.status(200),
            ctx.json(job)
        );
    }
);

const createJobHandler = rest.post(
    `${API_URL}/jobs`,
    async (req, res, ctx) => {
        const user = requireAuth({
            cookies: req.cookies,
        });

        const jobData = await req.json();

        const job = db.job.create({
            ...jobData,
            organizationId: user?.organizationId,
        });

        return res(
            ctx.delay(300),
            ctx.status(200),
            ctx.json(job)
        );
    }
);

// const getJobsHandler = http.get(
//     `${API_URL}/jobs`,
//     async ({ request }) => {
//         const url = new URL(request.url);
//         const organizationId = url.searchParams.get(
//             'organizationId'
//         ) as string;

//         const jobs = db.job.findMany({
//             where: {
//                 organizationId: {
//                     equals: organizationId,
//                 },
//             },
//         });

//         await delay(300);

//         return HttpResponse.json(jobs, {
//             status: 200,
//         });
//     }
// );

// const getJobHandler = http.get(
//     `${API_URL}/jobs/:jobId`,
//     //TODO посмотреть как решить вопрос типизации разных json по условию
//     //@ts-expect-error
//     async ({ params }) => {
//         const jobId = params.jobId as string;

//         const job = db.job.findFirst({
//             where: {
//                 id: {
//                     equals: jobId,
//                 },
//             },
//         });

//         await delay(300);

//         if (!job) {
//             return HttpResponse.json(
//                 { message: 'Not found!' },
//                 { status: 404 }
//             );
//         }

//         return HttpResponse.json(job, { status: 200 });
//     }
// );

// type CreateJobRequestBody = object; //TODO

// const createJobHandler = http.post<
//     PathParams,
//     CreateJobRequestBody
// >(`${API_URL}/jobs`, async ({ cookies, request }) => {
//     const user = requireAuth({ cookies });

//     const jobData = await request.json();

//     const job = db.job.create({
//         ...jobData,
//         organizationId: user?.organizationId,
//     });

//     await delay(300);

//     return HttpResponse.json(job, { status: 200 });
// });

export const jobsHandlers = [
    getJobsHandler,
    getJobHandler,
    createJobHandler,
];
