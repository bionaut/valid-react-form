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
const passProps = { label: 'Password', name: 'password', required: true, errorMessages: 'Fill Password!', type: 'password'}
`)))
  .add('error panel mode', () => (
    wrapper(
      <ValidForm errorPanel autoComplete="off" onSubmit={action('Form Payload')}>
        <Field label='Username' name='username' required={true} errorMessages='Fill username'/>
        <Field label='Email' name='email' required={true} errorMessages='Fill email'/>
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
`const formProps = {errorPanel: true, autoComplete: 'off', onSubmit: action}
const userProps = {label: 'Username', name: 'username', required: true, errorMessages: 'Fill Username!'}
const passProps = { label: 'Email', name: 'email', required: true, errorMessages: 'Fill Email!'}
`)))
  .add('read-only mode', () => (
    wrapper(
      <ValidForm readOnly autoComplete="off" onSubmit={action('Form Payload')}>
        <Field value='John Wick' label='Username' name='username' required={true} errorMessages='Fill username'/>
        <Field value='john.wick@movies.com' label='Email' name='email' required={true} errorMessages='Fill email'/>
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
`const formProps = {readOnly: true, autoComplete: 'off', onSubmit: action}
const userProps = {label: 'Username', name: 'username', required: true, errorMessages: 'Fill Username!'}
const passProps = { label: 'Email', name: 'email', required: true, errorMessages: 'Fill Email!'}
`)))
  .add('external errors after submit', () => (
    wrapper(
      <ValidForm errors={{username: 'Username already exists!'}} autoComplete="off" onSubmit={action('Form Payload')}>
        <Field value='John Wick' label='Username' name='username' required={true} errorMessages='Fill username'/>
        <Field value='john.wick@movies.com' label='Email' name='email' required={true} errorMessages='Fill email'/>
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
`const formProps = {errors: {username: 'Username already exists!'}, autoComplete: 'off', onSubmit: action}
const userProps = {label: 'Username', name: 'username', required: true, errorMessages: 'Fill Username!'}
const passProps = { label: 'Email', name: 'email', required: true, errorMessages: 'Fill Email!'}
`)))
