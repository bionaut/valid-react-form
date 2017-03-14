import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import wrapper from './formWrapper'
import { Slider, Button } from '../../src/index';

storiesOf('Slider', module)
  .add('default', () => (
    wrapper(
      <Slider min={0} max={10} name='slider'/>,
      '<Slider min={0} max={10} name="slider" />'
    )
  ))
  .add('with ticks', () => (
    wrapper(
      <Slider stepTicks={true} min={0} max={10} name='slider'/>,
      '<Slider stepTicks={true} min={0} max={10} name="slider" />'
    )
  ))
  .add('disabled', () => (
    wrapper(
      <Slider disabled={true} min={0} max={10} name='slider'/>,
      '<Slider disabled={true} min={0} max={10} name="slider" />'
    )
  ))
  .add('read only', () => (
    wrapper(
      <Slider value={2} readOnly={true} min={0} max={10} name='slider'/>,
      '<Slider value={2} readOnly={true} min={0} max={10} name="slider" />'
    )
  ))