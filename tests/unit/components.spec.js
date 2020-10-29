import { assert } from 'chai';
import { shallowMount } from '@vue/test-utils';

import TextInput from '@/components/TextInput.vue';
import JobModal from '@/components/JobModal.vue';
import JobCard from '@/components/JobCard.vue';

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
  describe('TextInput', () => {
    const baseProps = {
      name: 'input field',
      size: 'max',
      align: 'center',
      type: 'text',
      input: 'any',
    };
    it('renders with suitable props', () => {
      const propsData = {
        name: 'testInput',
        size: 'small',
        align: 'left',
        type: 'text',
        input: 'my input string',
      };
      const wrapper = factory(TextInput, { propsData });
      const props = wrapper.props();
      assert.hasAnyKeys(props, ['name', 'size', 'align', 'type', 'input']);
      assert.ok(props.name === propsData.name);
      assert.ok(props.size === propsData.size);
      assert.ok(props.align === propsData.align);
      assert.ok(props.type === propsData.type);
      assert.ok(props.input === propsData.input);
    });
    it('renders with a label when label prop is passed', () => {
      const propsData = { ...baseProps, label: 'Email' };
      const wrapper = factory(TextInput, { propsData });
      const label = wrapper.find('label');
      assert.isTrue(label.exists());
      assert.ok(label.attributes().for === 'input field');
      assert.ok(label.text() === 'Email');
    });
    it('renders a disabled input field when disabled flag is set', () => {
      const propsData = { ...baseProps, disabled: true };
      const wrapper = factory(TextInput, { propsData });
      const input = wrapper.find('input');
      assert.ok(wrapper.props().disabled === true);
      assert.isTrue(Boolean(input.attributes().disabled));
    });
    it('emits input event with user input', () => {
      const wrapper = factory(TextInput, { propsData: { ...baseProps } });
      const input = wrapper.find('input');
      input.setValue('user has input');
      assert.ok(wrapper.emitted().input[0][0] === 'user has input');
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
      assert.hasAllKeys(props, ['jobDetails']);
      assert.hasAllKeys(props.jobDetails, ['jobTitle', 'jobLocation', 'salary', 'companyName', 'added', 'summary']);
      assert.ok(props.jobDetails.jobTitle === jobDetails.jobTitle);
      assert.ok(props.jobDetails.jobLocation === jobDetails.jobLocation);
      assert.ok(props.jobDetails.salary === jobDetails.salary);
      assert.ok(props.jobDetails.companyName === jobDetails.companyName);
      assert.ok(props.jobDetails.added === jobDetails.added);
      assert.ok(props.jobDetails.summary === jobDetails.summary);
    });
    it('emits loadjob with correct detailswhen jobCard button is clicked on', () => {
      const jobDetailsCopy = { ...jobDetails };
      const wrapper = factory(JobCard, { propsData: { jobDetails } });
      wrapper.find('button').trigger('click');
      assert.deepStrictEqual(wrapper.emitted().loadJob[0][0].job, jobDetails);
    });
  });
  describe('JobModal', () => {
    it('renders given slots', () => {
      const wrapper = factory(JobModal, { slots: { default: '<h1>Hello World</h1>' } });
      assert.ok(wrapper.find('h1').text() === 'Hello World');
    });
    it('emits closeModal event when modal is clicked', () => {
      const wrapper = factory(JobModal);
      wrapper.trigger('click');
      assert.exists(wrapper.emitted().closeModal);
    });
  });
});
