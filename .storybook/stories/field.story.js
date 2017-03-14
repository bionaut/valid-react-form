import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import wrapper from './formWrapper'
import { Field, Button } from '../../src/index';
import validator from 'validator';

storiesOf('Field', module)
  .add('empty', () => (
    wrapper(
      <Field name='username'/>,
      '<Field name="username" />'
    )
  ))
  .add('with label', () => (
    wrapper(
      <Field name='username' label='Username'/>,
      '<Field name="username" label="Username" />'
    )
  ))
  .add('with placeholder', () => (
    wrapper(
      <Field name='username' placeholder='Username'/>,
      '<Field name="username" placeholder="Username" />'
    )
  ))
  .add('with icons', () => (
    wrapper(
      <div>
        <Field icons={true} validator={{ isLength: (value) => value.length > 3 }} required={true} name='username' placeholder='Username'/>
      </div>,
      '<Field icons={true} validator={{ isLength: (value) => value.length > 3 }} name="username" placeholder="Username" />'
    )
  ))
  .add('with value', () => (
    wrapper(
      <Field name='username' value='Username'/>,
      '<Field name="username" value="Username" />'
    )
  ))
  .add('disabled', () => (
    wrapper(
      <Field disabled={true} name='username' value='Username'/>,
      '<Field disabled={true} name="username" value="Username" />'
    )
  ))
  .add('with custom style', () => (
    wrapper(
      <Field style={{ borderRadius: 20 }} name='username' value='Username'/>,
      '<Field style={{ borderRadius: 20 }} name="username" value="Username" />'
    )
  ))
  .add('read only', () => (
    wrapper(
      <Field readOnly={true} name='username' value='Username'/>,
      '<Field readOnly={true} name="username" value="Username" />'
    )
  ))
  .add('with required', () => (
    wrapper(
      <div>
        <Field name='username' required={true}/>
        <Button fullWidth={true}>Submit</Button>
      </div>,
      '<Field name="username" required={true} />'
    )
  ))
  .add('with error message', () => (
    wrapper(
      <div>
        <Field errorMessages='Single error message' name='username' required={true}/>
        <Button fullWidth={true}>Submit</Button>
      </div>,
`<Field 
  errorMessages="Single error message" 
  name="username" 
  required={true} 
/>`)))
  .add('with validator', () => (
    wrapper(
      <div>
        <Field validator={{
          isLength: (value) => value.length > 3,
        }} errorMessages='Need to be longer!' name='username' required={true}/>
        <Button fullWidth={true}>Submit</Button>
      </div>,
`<Field 
  validator={{ isLength: (value) => value.length > 3 }}
  errorMessages="Need to be longer!" 
  name="username" 
  required={true} 
/>`)))
  .add('with multiple validators / er. messages', () => (
    wrapper(
      <div>
        <Field validator={{
          isLength: (value) => value.length > 3,
          contains: (value) => validator.contains(value, 'test')
        }} errorMessages={{ isLength: 'This has to be longer!', contains: 'This has to contian "test"!', required: 'This is required!' }} name='username' required={true}/>
        <Button fullWidth={true}>Submit</Button>
      </div>,
      `<Field {...fieldProps}/>`,
`import validator from 'validator'

const fieldProps = {
  name: 'username',
  required: true,
  validator: {
    minLength: (value) => value.length > 3,
    contains: (value) => validator.contains(value, 'test')      
  },
  errorMessages: {
    minLength: 'This has to be longer!',
    contains: 'This has to contain "test"!',
    required: 'This is required!'
  },
}`)))
  .add('with server / async error', () => (
    wrapper(
      <div>
        <Field
          error='Some error from server'
          validator={{ isLength: (value) => value.length > 3 }}
          errorMessages={{ isLength: 'This has to be longer!', contains: 'This has to contian "test"!', required: 'This is required!' }}
          name='username'
          required={true}/>
        <Button fullWidth={true}>Submit</Button>
      </div>,
      `<Field {...fieldProps}/>`,
`const fieldProps = {
  name: 'username',
  required: true,
  validator: {
    minLength: (value) => value.length > 3
  },
  errorMessages: {
    minLength: 'This has to be longer!',
    required: 'This is required!'
  },
}`)))
  .add('with onChange callback', () => (
    wrapper(
      <div>
        <Field validator={{ isLength: (value) => value.length > 3 }} onChange={action('onChange')} errorMessages='Single error message' name='username' required={true}/>
        <Button fullWidth={true}>Submit</Button>
      </div>,
      `<Field 
  errorMessages="Single error message"
  validator={{ isLength: (value) => value.length > 3 }}
  onChange={callback}
  name="username" 
  required={true} 
/>`)))
  .add('with debounced callback', () => (
    wrapper(
      <div>
        <Field debounce={500} validator={{ isLength: (value) => value.length > 3 }} onChange={action('onChange')} errorMessages='Single error message' name='username' required={true}/>
        <Button fullWidth={true}>Submit</Button>
      </div>,
      `<Field 
  debounce={500}
  errorMessages="Single error message"
  validator={{ isLength: (value) => value.length > 3 }}
  onChange={callback}
  name="username" 
  required={true} 
/>`)))
