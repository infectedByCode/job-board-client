import { render, cleanup, fireEvent, waitFor } from '@testing-library/vue';
import '@testing-library/jest-dom';

import App from '../../src/App.vue';
import Home from '../../src/views/Home.vue';
import JobBoard from '../../src/views/JobBoard.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/jobs', name: 'Job Board', component: JobBoard },
];

describe('Views', () => {
  afterEach(() => {
    cleanup();
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
});
