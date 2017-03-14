import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import wrapper from './formWrapper'
import { Select, Button } from '../../src/index';

const selectData = [
  {value: 1, label: 'Option 1'},
  {value: 2, label: 'Option 2'},
  {value: 3, label: 'Option 3'},
  {value: 4, label: 'Option 4'},
  {value: 5, label: 'Option 5'},
  {value: 6, label: 'Option 6'},
  {value: 7, label: 'Option 7'}
];


storiesOf('Select', module)
  .add('default', () => (
    wrapper(
      <Select data={selectData} name='selectbox'/>,
      '<Select data={selectData} name="selectbox" />',
      `const selectData = [{value: 1, label: 'Option 1'}, {..}, {..}];`
    )
  ))
  .add('with label', () => (
    wrapper(
      <Select label='Select something' data={selectData} name='selectbox'/>,
      '<Select label="Select something" data={selectData} name="selectbox" />',
      `const selectData = [{value: 1, label: 'Option 1'}, {..}, {..}];`
    )
  ))
  .add('with placeholder', () => (
    wrapper(
      <Select placeholder='Select something' data={selectData} name='selectbox'/>,
      '<Select placeholder="Select something" data={selectData} name="selectbox" />',
      `const selectData = [{value: 1, label: 'Option 1'}, {..}, {..}];`
    )
  ))
  .add('without scroll/with scroll threshold', () => (
    wrapper(
      <Select scrollTrigger={7} data={selectData} name='selectbox'/>,
      '<Select scrollTrigger={7} data={selectData} name="selectbox" />',
      `const selectData = [{value: 1, label: 'Option 1'}, {..}, {..}];`
    )
  ))
  .add('with value', () => (
    wrapper(
      <Select value={2} data={selectData} name='selectbox'/>,
      '<Select value={2} data={selectData} name="selectbox" />',
      `const selectData = [{value: 1, label: 'Option 1'}, {..}, {..}];`
    )
  ))
  .add('disabled', () => (
    wrapper(
      <Select value={2} disabled={true} data={selectData} name='selectbox'/>,
      '<Select disabled={true} value={2} data={selectData} name="selectbox" />',
      `const selectData = [{value: 1, label: 'Option 1'}, {..}, {..}];`
    )
  ))
  .add('read only', () => (
    wrapper(
      <Select value={2} readOnly={true} data={selectData} name='selectbox'/>,
      '<Select readOnly={true} value={2} data={selectData} name="selectbox" />',
      `const selectData = [{value: 1, label: 'Option 1'}, {..}, {..}];`
    )
  ))
  .add('with required', () => (
    wrapper(
      <div>
        <Select required={true} data={selectData} name='selectbox'/>
        <Button fullWidth={true}>Submit</Button>
      </div>,
      '<Select required={true} data={selectData} name="selectbox" />',
      `const selectData = [{value: 1, label: 'Option 1'}, {..}, {..}];`
    )
  ))
  .add('with error message', () => (
    wrapper(
      <div>
        <Select errorMessages='Select one!' required={true} data={selectData} name='selectbox'/>
        <Button fullWidth={true}>Submit</Button>
      </div>,
      '<Select errorMessages="Select one!" required={true} data={selectData} name="selectbox" />',
      `const selectData = [{value: 1, label: 'Option 1'}, {..}, {..}];`
    )
  ))
  .add('with clear button', () => (
    wrapper(
      <div>
        <Select clearButton={true} required={true} data={selectData} name='selectbox'/>
        <Button fullWidth={true}>Submit</Button>
      </div>,
      '<Select clearButton={true} required={true} data={selectData} name="selectbox" />',
      `const selectData = [{value: 1, label: 'Option 1'}, {..}, {..}];`
    )
  ))
  .add('with icons', () => (
    wrapper(
      <div>
        <Select icons={true} required={true} data={selectData} name='selectbox'/>
        <Button fullWidth={true}>Submit</Button>
      </div>,
      '<Select icons={true} required={true} data={selectData} name="selectbox" />',
      `const selectData = [{value: 1, label: 'Option 1'}, {..}, {..}];`
    )
  ))
  .add('with helper', () => (
    wrapper(
      <div>
        <Select helper='Some help' required={true} data={selectData} name='selectbox'/>
        <Button fullWidth={true}>Submit</Button>
      </div>,
      '<Select helper="Some help" required={true} data={selectData} name="selectbox" />',
      `const selectData = [{value: 1, label: 'Option 1'}, {..}, {..}];`
    )
  ))
  .add('with onChange', () => (
    wrapper(
      <div>
        <Select onChange={action('onChange')} required={true} data={selectData} name='selectbox'/>
        <Button fullWidth={true}>Submit</Button>
      </div>,
      '<Select onChange={action} required={true} data={selectData} name="selectbox" />',
      `const selectData = [{value: 1, label: 'Option 1'}, {..}, {..}];`
    )
  ))
