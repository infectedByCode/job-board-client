import { render, cleanup } from '@testing-library/vue';
import '@testing-library/jest-dom';

import Home from '../../src/views/Home.vue';

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
  });
});
