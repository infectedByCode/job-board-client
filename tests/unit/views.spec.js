import {
  cleanup,
  fireEvent,
  getAllByRole,
  getAllByText,
  render,
  waitFor,
} from '@testing-library/vue';
import '@testing-library/jest-dom';
import axios from 'axios';
jest.mock('axios');

import App from '../../src/App.vue';
import Home from '../../src/views/Home.vue';
import JobBoard from '../../src/views/JobBoard.vue';
import JobAdvert from '../../src/views/JobAdvert.vue';

import { fakeJobs } from '../../src/mocks/faker';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/jobs', name: 'Job Board', component: JobBoard },
  { path: '/jobs/:jobId', name: 'Job Advert', component: JobAdvert },
];

describe('Views', () => {
  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });
  describe('Home', () => {
    it('renders a job search form with relevant elements', () => {
      const { getByTitle, getByRole, getByLabelText } = render(Home);
      getByTitle('job search form');
      getByLabelText('What');
      getByLabelText('Where');
      getByRole('button', { name: 'Search' });
      // Add select
    });
    it('submits the form with search term typed', async () => {
      const { getByRole, getByLabelText } = render(Home, { routes });
      expect(location.href).not.toContain('/jobs');
      const input = getByLabelText('What');
      await fireEvent.update(input, 'developer');
      fireEvent.click(getByRole('button', { name: 'Search' }));
      expect(location.href).toContain('/jobs');
    });
  });
  describe('JobBoard', () => {
    it('renders jobs cards on load without a search term', async () => {
      axios.get.mockResolvedValue({
        status: 200,
        data: {
          jobs: fakeJobs(10),
        },
      });
      const { findAllByRole } = render(JobBoard, { routes });
      const listItems = await findAllByRole('listitem');
      expect(listItems).toHaveLength(10);
    });
    it('renders jobs cards on load without a search term', async () => {
      axios.get.mockResolvedValue({
        status: 200,
        data: {
          jobs: fakeJobs(5),
        },
      });
      const { findAllByRole } = render(JobBoard, {
        routes,
        props: {
          searchTerm: 'developer',
        },
      });
      const listItems = await findAllByRole('listitem');
      expect(listItems).toHaveLength(5);
    });
  });
  describe('JobAdvert', () => {
    const jobDetails = {
      added: '4 days ago',
      applyEmail: 'myemail@email.com',
      closingDate: '2021-09-01T23:00:00.000Z',
      companyAddress: '123 Dev Street',
      companyEmail: 'email@company.com',
      companyName: 'Ample Devs',
      companyPhone: '12345678',
      jobLocation: 'Manchester',
      jobText:
        'A developer with over 200 years experience required for a startup.',
      jobTitle: 'Web Developer',
      salary: 15000,
      tags: 'MySQL,NodeJS',
    };
    it('renders job advertisement and application form to client', () => {
      const { getByText, getByRole, getAllByRole, getByLabelText } = render(
        JobAdvert,
        {
          routes,
          props: { jobDetails },
        }
      );
      getByText(jobDetails.jobText);
      getByText(jobDetails.jobTitle);
      getByText(`Posted ${jobDetails.added}`);
      getByText(`Salary: £${jobDetails.salary}`);
      getByText(`Location: ${jobDetails.jobLocation}`);
      const listItems = getAllByRole('listitem');
      expect(listItems).toHaveLength(2);
      expect(listItems[0]).toHaveTextContent('MySQL');
      expect(listItems[1]).toHaveTextContent('NodeJS');
      getByText(jobDetails.companyName);
      getByRole('button', { name: 'Email' });
      getByRole('button', { name: 'Call' });
      getByLabelText(/forename/i);
      getByLabelText(/surname/i);
      getByLabelText(/email/i);
      getByLabelText(/telephone/i);
      getByLabelText(/resume/i);
      getByLabelText(/letter/i);
      getByRole('button', { name: 'Apply' });
    });
    it('allows a user to complete application form and submit application', () => {
      const { getByRole, getByLabelText } = render(JobAdvert, {
        routes,
        props: { jobDetails },
      });
      const forenameInput = getByLabelText(/forename/i);
      const surnameInput = getByLabelText(/surname/i);
      const emailInput = getByLabelText(/email/i);
      const telephoneInput = getByLabelText(/telephone/i);
      const resumeUpload = getByLabelText(/resume/i);
      const letterUpload = getByLabelText(/letter/i);
      const applyButton = getByRole('button', { name: 'Apply' });
      // TODO: add filling in of data and test for data to be correct
      fireEvent.click(applyButton);
    });
  });
});
