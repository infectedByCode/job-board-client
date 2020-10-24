import { rest } from 'msw';
import { fakeJobs } from './faker';

export const handlers = [
  rest.get('/jobs', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        jobs: fakeJobs,
      })
    );
  }),
  rest.post('/jobseekers', (_req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        status: 201,
        msg: 'jobseeker created',
        ref: '1234',
      })
    );
  }),
  rest.post('/companies', (_req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        status: 201,
        msg: 'Company successfully created',
        ref: '1234',
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
