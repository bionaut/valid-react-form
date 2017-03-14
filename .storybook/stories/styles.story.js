import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import wrapper from './wrapper'
import { Field, ValidForm, Button } from '../../src/index';

storiesOf('Styles', module)
  .add('default', () => (
    wrapper(
      <ValidForm autoComplete="off" onSubmit={action('Form Payload')}>
        <Field label='Username' name='username' required={true} errorMessages='Fill username'/>
        <Field label='Password' name='password' type='password' required={true} errorMessages='Fill password'/>
        <Button fullWidth={true}>Submit</Button>
      </ValidForm>,
      `<ValidStyles>
  <ValidForm autoComplete="off" onSubmit={action('Form Payload')}>
    <Field label='Username' name='username' required={true} errorMessages='Fill username'/>
    <Field label='Password' name='password' type='password' required={true} errorMessages='Fill password'/>
    <Button fullWidth={true}>Submit</Button>
  </ValidForm>
</ValidStyles>
`)))
  .add('custom', () => (
    wrapper(
      <ValidForm autoComplete="off" onSubmit={action('Form Payload')}>
        <Field label='Username' name='username' required={true} errorMessages='Fill username'/>
        <Field label='Password' name='password' type='password' required={true} errorMessages='Fill password'/>
        <Button fullWidth={true}>Submit</Button>
      </ValidForm>,
      `<ValidStyles customStyles={customStyles}>
  <ValidForm autoComplete="off" onSubmit={action('Form Payload')}>
    <Field label='Username' name='username' required={true} errorMessages='Fill username'/>
    <Field label='Password' name='password' type='password' required={true} errorMessages='Fill password'/>
    <Button fullWidth={true}>Submit</Button>
  </ValidForm>
</ValidStyles>
`,
      `
const customStyles = {
  primaryColor: 'green',
  itemSize: 50,
  componentBackground: '#C4D9C7',
  borderColor: 'yellow',
  borderRadius: 10,
  borderWidth: 10,
  fontSize: 20
}
`, {
        customStyles: {
          primaryColor: 'green',
          itemSize: 50,
          componentBackground: '#C4D9C7',
          borderColor: 'yellow',
          borderRadius: 10,
          borderWidth: 10,
          fontSize: 20,
        }
      })));
