import { render, cleanup, fireEvent, waitFor } from '@testing-library/vue';
import '@testing-library/jest-dom';
import axios from 'axios';
jest.mock('axios');

import App from '../../src/App.vue';
import Home from '../../src/views/Home.vue';
import JobBoard from '../../src/views/JobBoard.vue';

import { fakeJobs } from '../../src/mocks/faker';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/jobs', name: 'Job Board', component: JobBoard },
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
});
