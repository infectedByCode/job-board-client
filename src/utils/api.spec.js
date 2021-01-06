import nock from 'nock';
nock.disableNetConnect();
require('dotenv').config();

import * as api from './api';

describe('API calls', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
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
      result.forEach(job => {
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
  describe('#fetchUserInformation', () => {
    it('returns an object with jobseeker information', async () => {
      const jobseeker = {
        jobseekerId: '1234',
        jobseekerForename: 'A',
        jobseekerSurname: 'jobseeking-person',
        jobKeywords: null,
        accountCreated: '2020-12-13T11:41:33.000Z',
      };
      nock('http://localhost:3000')
        .defaultReplyHeaders({
          'access-control-allow-origin': '*',
        })
        .get('/jobseekers/1234?token=agoodtoken')
        .reply(200, {
          jobseeker,
        });
      const result = await api.fetchUserInformation(
        'jobseeker',
        '1234',
        'agoodtoken'
      );
      expect(result).toHaveProperty('jobseeker');
      expect(result.jobseeker).toMatchObject(jobseeker);
    });
    it('returns an object with company information', async () => {
      const company = {
        companyId: '1234',
        companyName: 'A Company',
        companyEmail: 'company@email.com',
        companyPhone: '0800000000',
        accountCreated: '2020-12-13T11:41:33.000Z',
      };
      nock('http://localhost:3000')
        .defaultReplyHeaders({
          'access-control-allow-origin': '*',
        })
        .get('/companies/1234?token=agoodtoken')
        .reply(200, {
          company,
        });
      const result = await api.fetchUserInformation(
        'company',
        '1234',
        'agoodtoken'
      );
      expect(result).toHaveProperty('company');
      expect(result.company).toMatchObject(company);
    });
    it('returns an error object if there API returns a non-20x status', async () => {
      nock('http://localhost:3000')
        .defaultReplyHeaders({
          'access-control-allow-origin': '*',
        })
        .get('/jobseekers/1234?token=agoodtoken')
        .reply(500);
      const result = await api.fetchUserInformation(
        'jobseeker',
        '1234',
        'agoodtoken'
      );
      expect(result.status).toBe(500);
      expect(result.statusText).toBe('Internal Server Error');
    });
  });
  // describe('#updateUserById', () => {
  //   it('returns a 200 with a success message when jobseeker updated', async () => {
  //     nock('http://localhost:3000')
  //       .defaultReplyHeaders({
  //         'access-control-allow-origin': '*',
  //       })
  //       .patch('/jobseekers/1234?token=token', {})
  //       .reply(200);
  //     const result = await api.updateUserById('jobseeker', '1234', 'token');
  //   });
  // });
});
