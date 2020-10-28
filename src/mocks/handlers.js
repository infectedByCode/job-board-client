import { rest } from 'msw';
import { fakeJobs } from './faker';
const { VUE_APP_API_URL } = process.env;

export const handlers = [
  rest.get(`${VUE_APP_API_URL}/jobs`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        jobs: fakeJobs,
      })
    );
  }),
  rest.post(`${VUE_APP_API_URL}/jobseekers`, (_req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        status: 201,
        msg: 'jobseeker created',
        ref: '1234',
      })
    );
  }),
  rest.post(`${VUE_APP_API_URL}/companies`, (_req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        status: 201,
        msg: 'Company successfully created',
        ref: '1234',
      })
    );
  }),
  // rest.get(`${VUE_APP_API_URL}/jobseekers/:jobseekerId`, (_req, res, ctx) => {
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       jobseekerForename: 'Po Po',
  //       jobseekerSurname: 'Liang',
  //       jobKeywords: 'developer,backend',
  //       accountCreated: '2020-10-14 19:42:02',
  //     })
  //   );
  // }),
  rest.post(`${VUE_APP_API_URL}/auth/login`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        userId: '1234',
        token: 'a-real-token',
      })
    );
  }),
];
