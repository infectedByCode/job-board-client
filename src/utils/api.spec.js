import nock from 'nock';
nock.disableNetConnect();
require('dotenv').config();

import * as api from './api';

describe('API calls', () => {
  describe('#fetchJobsBySearch', () => {
    it('returns an array of job objects if successful', async () => {
      nock('http://localhost:3000')
        .defaultReplyHeaders({
          'access-control-allow-origin': '*',
        })
        .get('/jobs/search/dev')
        .reply(200, {
          jobs: [
            {
              jobId: 1,
              jobTitle: 'title',
              jobText: 'text',
              jobLocation: 'city',
              salary: 29,
              closingDate: new Date(2020, 10, 30),
              createdAt: new Date(2020, 10, 10),
              companyName: 'company',
            },
          ],
        });
      const result = await api.fetchJobsBySearch('dev');
      expect(result).toHaveLength(1);
      result.forEach((job) => {
        expect(job).toEqual({
          jobId: 1,
          jobTitle: 'title',
          jobText: 'text',
          jobLocation: 'city',
          salary: 29,
          closingDate: '2020-11-30T00:00:00.000Z',
          createdAt: '2020-11-10T00:00:00.000Z',
          companyName: 'company',
        });
      });
    });
    it('returns an error if not successful', async () => {
      nock('http://localhost:3000')
        .defaultReplyHeaders({
          'access-control-allow-origin': '*',
        })
        .get('/jobs/search/dev')
        .reply(500);
      const result = await api.fetchJobsBySearch('dev');
      expect(result).toBeInstanceOf(Error);
    });
  });
});
