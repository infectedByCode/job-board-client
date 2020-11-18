import { shallowMount } from '@vue/test-utils';
import { render, cleanup, emitted, fireEvent, getByRole, getByText, getByLabelText } from '@testing-library/vue';
import '@testing-library/jest-dom';

import TextInput from '../../src/components/TextInput.vue';
import JobModal from '../../src/components/JobModal.vue';
import JobCard from '../../src/components/JobCard.vue';

const factory = (component, options) => {
  return shallowMount(component, {
    propsData: {
      ...options?.propsData,
    },
    slots: {
      ...options?.slots,
    },
  });
};

describe('Components', () => {
  afterEach(() => {
    cleanup();
  });
  describe('TextInput', () => {
    const baseProps = {
      name: 'input field',
      size: 'max',
      align: 'center',
      type: 'text',
      input: 'any',
      label: 'input label',
    };
    it('renders with suitable props', () => {
      const propsData = {
        name: 'testInput',
        size: 'small',
        align: 'left',
        type: 'text',
        input: 'my input string',
      };
      const { getByText, debug } = render(TextInput, {
        props: {
          ...propsData,
        },
      });
      const wrapper = factory(TextInput, { propsData });
      const props = wrapper.props();
      expect(props).toMatchObject(propsData);
    });
    it('renders with a label when label prop is passed', () => {
      const { getByText } = render(TextInput, {
        props: {
          ...baseProps,
          label: 'Email',
        },
      });
      const label = getByText('Email');
      expect(label).toHaveAttribute('for', 'input field');
    });
    it('renders a disabled input field when disabled flag is set', () => {
      const { getByLabelText } = render(TextInput, {
        props: {
          ...baseProps,
          disabled: true,
        },
      });
      const input = getByLabelText('input label');
      expect(input).toBeDisabled();
    });
    it('emits input event with user input', async () => {
      const { getByLabelText, emitted } = render(TextInput, {
        props: {
          ...baseProps,
          disabled: true,
        },
      });
      const input = getByLabelText('input label');
      await fireEvent.update(input, 'user has input');
      expect(emitted()).toHaveProperty('input');
      expect(emitted().input[0][0]).toBe('user has input');
    });
  });
  describe('JobCard', () => {
    const jobDetails = {
      jobTitle: 'sameple job',
      jobLocation: 'Manchester',
      salary: 5000,
      companyName: 'a random co',
      added: '6 days ago',
      summary: 'job details',
    };
    it('renders with data passed via props', () => {
      const wrapper = factory(JobCard, { propsData: { jobDetails } });
      const props = wrapper.props();
      expect(props).toHaveProperty('jobDetails');
      expect(props.jobDetails).toMatchObject(jobDetails);
    });
    it('emits loadjob with correct detailswhen jobCard button is clicked on', () => {
      const { getByRole, emitted } = render(JobCard, {
        props: {
          jobDetails,
        },
      });
      const button = getByRole('button', {
        name: 'Learn More',
      });
      fireEvent.click(button);
      expect(emitted()).toHaveProperty('loadJob');
      expect(emitted().loadJob[0][0].job).toMatchObject(jobDetails);
    });
  });
  describe('JobModal', () => {
    it('renders given slots', () => {
      const { getByText } = render(JobModal, {
        slots: { default: '<h1>Hello World</h1>' },
      });
      expect(getByText('Hello World')).toBeInTheDocument();
    });
    it('emits closeModal event when modal is clicked', () => {
      const { getByText, emitted } = render(JobModal, {
        slots: { default: '<h1>Hello World</h1>' },
      });
      fireEvent.click(getByText('Hello World'));
      expect(emitted()).toHaveProperty('closeModal');
    });
  });
});
