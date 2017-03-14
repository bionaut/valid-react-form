import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import wrapper from './formWrapper'
import { Button } from '../../src/index';

storiesOf('Button', module)
  .add('default', () => (
    wrapper(
      <Button >Submit</Button>,
      '<Button>Submit</Button>'
    )
  ))
  .add('full width', () => (
    wrapper(
      <Button fullWidth={true}>Submit</Button>,
      '<Button fullWidth={true}>Submit</Button>'
    )
  ))
  .add('custom style', () => (
    wrapper(
      <Button style={{ borderRadius: 10, color: 'white' }}>Submit</Button>,
      '<Button style={{ borderRadius:10, color: "white" }} >Submit</Button>'
    )
  ));
