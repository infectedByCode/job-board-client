import { rest } from 'msw';
import { generateFakeJobs } from 'faker';

export const handlers = [
  rest.get('/jobs', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        jobs: [generateFakeJobs(10)],
      })
    );
  }),
  rest.post('/auth/login', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        userId: '1234',
        token: 'a-real-token',
      })
    );
  }),
];
