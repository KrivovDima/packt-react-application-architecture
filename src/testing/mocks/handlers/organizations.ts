import { rest } from 'msw';

import { API_URL } from '@/config/constants';

import { db } from '../db';

const getOrganizationHandler = rest.get(
    `${API_URL}/organizations/:organizationId`,
    async (req, res, ctx) => {
        const organizationId = req.params
            .organizationId as string;

        const organization = db.organization.findFirst({
            where: {
                id: {
                    equals: organizationId,
                },
            },
        });

        if (!organization) {
            return res(
                ctx.delay(300),
                ctx.status(404),
                ctx.json({ message: 'Not found' })
            );
        }

        return res(
            ctx.delay(300),
            ctx.status(200),
            ctx.json(organization)
        );
    }
);

// const getOrganizationHandler = http.get(
//     `${API_URL}/organizations/:organizationId`,
//     //TODO посмотреть как решить вопрос типизации разных json по условию
//     //@ts-expect-error
//     async ({ params }) => {
//         const organizationId =
//             params.organizationId as string;

//         const organization = db.organization.findFirst({
//             where: {
//                 id: {
//                     equals: organizationId,
//                 },
//             },
//         });

//         await delay(300);

//         if (!organization) {
//             return HttpResponse.json(
//                 { message: 'Not found' },
//                 { status: 404 }
//             );
//         }

//         return HttpResponse.json(organization, {
//             status: 200,
//         });
//     }
// );

export const organizationsHandlers = [
    getOrganizationHandler,
];
