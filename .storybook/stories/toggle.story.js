import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import wrapper from './formWrapper'
import { Toggle, Button } from '../../src/index';

storiesOf('Toggle', module)
  .add('default', () => (
    wrapper(
      <Toggle name='toggle'/>,
      '<Toggle name="toggle" />'
    )
  ))
  .add('with label', () => (
    wrapper(
      <Toggle label='This is toggle' name='toggle'/>,
      '<Toggle label="This is toggle" name="toggle" />'
    )
  ))
  .add('disabled', () => (
    wrapper(
      <Toggle disabled={true} name='toggle'/>,
      '<Toggle disabled={true} name="toggle" />'
    )
  ))
  .add('read only', () => (
    wrapper(
      <Toggle readOnly={true} name='toggle'/>,
      '<Toggle readOnly={true} name="toggle" />'
    )
  ))
  .add('with value', () => (
    wrapper(
      <Toggle value={true} name='toggle'/>,
      '<Toggle value={true} name="toggle" />'
    )
  ))
  .add('with required', () => (
    wrapper(
      <div>
        <Toggle required={true} name='toggle'/>
        <Button fullWidth={true}>Submit</Button>
      </div>,
      '<Toggle required={true} name="toggle" />'
    )
  ))
  .add('with error message', () => (
    wrapper(
      <div>
        <Toggle errorMessages='Toggle it!' required={true} name='toggle'/>
        <Button fullWidth={true}>Submit</Button>
      </div>,
      '<Toggle errorMessages="Toggle it!" required={true} name="toggle" />'
    )
  ))
  .add('with onChange', () => (
    wrapper(
      <div>
        <Toggle onChange={action('Toggle')} required={true} name='toggle'/>
        <Button fullWidth={true}>Submit</Button>
      </div>,
      '<Toggle onChange={action} required={true} name="toggle" />'
    )
  ))