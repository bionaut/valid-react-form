const { describe, it } = global;

import React from 'react';
import { expect } from 'chai';
import { contain } from 'chai-enzyme';
import { mount } from 'enzyme';
import { spy, stub } from 'sinon';

import Slider from '../Slider';
import styles, {Styles} from '../../ValidStyles/mainStyles';

describe('Slider component', () => {

  const getWrapper = (props, context) => {
    return mount(
      <Slider{...props}/>, { context })
  };

  it('should render with value set and register', () => {
    const registerSpy = spy();
    const wrp = getWrapper({
      name: 'slider',
      friendlyName: 'Friendly',
      value: 1,
      min: 0,
      max: 5,
      errorMessages: 'Some error'
    }, {
      register: registerSpy,
      styles: styles(new Styles())
    });
    expect(registerSpy).to.have.property('callCount', 1);
    expect(registerSpy.lastCall.args).to.be.deep.equal(['slider', 'Friendly', 'Some error']);
    expect(wrp.find('.valid-slider')).to.have.length(1);
    expect(wrp.find('.valid')).to.have.length(1);
  });

  it('should update on init', () => {
    const updateSpy = spy();
    getWrapper({
      name: 'slider',
      friendlyName: 'Friendly',
      value: 1,
      min: 0,
      max: 5,
    }, {
      updatePayload: updateSpy
    });
    expect(updateSpy).to.have.property('callCount', 1);
    expect(updateSpy.lastCall.args).to.be.deep.equal(['slider', 1, undefined]);
  });

});