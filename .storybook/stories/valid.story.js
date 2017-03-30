import React from 'react';
import { storiesOf } from '@kadira/storybook';
import wrapper from './formWrapper'
import { Valid } from '../../src/index';

storiesOf('Valid component')
  .add('default', () => (
    wrapper(
      <Valid errorMessages='Hey error!' required={true} name='universal'>
        <input type="text"/>
      </Valid>,
`<Valid required={true} name="toggle">
    <input type="text">
</Valid>`
    )))