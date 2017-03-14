import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { ValidStyles, ValidForm, Field, Button } from '../../src/index';
import wrapper from './wrapper'

storiesOf('ValidForm', module)
  .add('default', () => (
    wrapper(
      <ValidForm autoComplete="off" onSubmit={action('Form Payload')}>
        <Field label='Username' name='username' required={true} errorMessages='Fill username'/>
        <Field label='Password' name='password' type='password' required={true} errorMessages='Fill password'/>
        <Button fullWidth={true}>Submit</Button>
      </ValidForm>,
`<ValidStyles>
  <ValidForm autoComplete="off" onSubmit={action('Form Payload')}>
    <Field label='Username' name='username' required={true} errorMessages='Fill username' />
    <Field label='Password' name='password' type='password' required={true} errorMessages='Fill password' />
    <Button fullWidth={true}>Submit</Button>
  </ValidForm>
 </ValidStyles>
`)))
  .add('with debug', () => (
    wrapper(
      <ValidForm debug={true} autoComplete="off" onSubmit={action('Form Payload')}>
        <Field label='Username' name='username' required={true} errorMessages='Fill username'/>
        <Field label='Password' name='password' type='password' required={true} errorMessages='Fill password'/>
        <Button>Submit</Button>
      </ValidForm>,
`<ValidStyles>
  <ValidForm debug={true} autoComplete="off" onSubmit={action('Form Payload')}>
    <Field label='Username' name='username' required={true} errorMessages='Fill username' />
    <Field label='Password' name='password' type='password' required={true} errorMessages='Fill password' />
    <Button>Submit</Button>
  </ValidForm>
 </ValidStyles>
`)))
  .add('with spread operator', () => (
    wrapper(
      <ValidForm autoComplete="off" onSubmit={action('Form Payload')}>
        <Field label='Username' name='username' required={true} errorMessages='Fill username'/>
        <Field label='Password' name='password' type='password' required={true} errorMessages='Fill password'/>
        <Button>Submit</Button>
      </ValidForm>,
`<ValidStyles>
  <ValidForm {...formProps}>
    <Field {...userProps} />
    <Field {...passProps} />
    <Button>Submit</Button>
  </ValidForm>
 </ValidStyles>
`,
`const formProps = {autoComplete: 'off', onSubmit: action}
const userProps = {label: 'Username', name: 'username', required: true, errorMessages: 'Fill Username!'}
const passProps = { label: 'Password', name: 'password', required: true, errorMessages: 'Fill Password!'}
`)))
