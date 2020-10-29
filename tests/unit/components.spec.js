import { assert } from 'chai';
import { shallowMount } from '@vue/test-utils';
import TextInput from '@/components/TextInput.vue';

const factory = (component, options) => {
  return shallowMount(component, {
    propsData: {
      name: 'input field',
      size: 'max',
      align: 'center',
      type: 'text',
      input: 'any',
      ...options?.propsData,
    },
  });
};

describe('TextInput', () => {
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
    const propsData = { label: 'Email' };
    const wrapper = factory(TextInput, { propsData });
    const label = wrapper.find('label');
    assert.isTrue(label.exists());
    assert.ok(label.attributes().for === 'input field');
    assert.ok(label.text() === 'Email');
  });
  it('renders a disabled input field when disabled flag is set', () => {
    const propsData = { disabled: true };
    const wrapper = factory(TextInput, { propsData });
    const input = wrapper.find('input');
    assert.ok(wrapper.props().disabled === true);
    assert.isTrue(Boolean(input.attributes().disabled));
  });
  it('emits input event with user input', () => {
    const wrapper = factory(TextInput);
    const input = wrapper.find('input');
    input.setValue('user has input');
    assert.ok(wrapper.emitted().input[0][0] === 'user has input');
  });
});
