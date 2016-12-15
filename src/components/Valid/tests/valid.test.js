const { describe, it } = global;

import React from 'react';
import { expect } from 'chai';
import { contain } from 'chai-enzyme';
import { mount, shallow } from 'enzyme';
import { spy, stub } from 'sinon';

import Valid from '../Valid';

describe('Valid universal component', () => {

  const getWrapper = (children, props, context) => {
    return mount(
      <Valid {...props}>
        {children}
      </Valid>, { context })
  };

  it('should register component', () => {
    const registerSpy = spy();
    getWrapper(
      <input type="text"/>,
      {
        name: 'test',
        friendlyName: 'Test',
        errorMessages: 'Some error'
      },
      {
        register: registerSpy
      });
    expect(registerSpy).to.have.property('callCount', 1);
    expect(registerSpy.lastCall.args).to.be.deep.equal(['test', 'Test', 'Some error']);
  });

  it('should show error message', () => {
    const wrapper = getWrapper(
      <input type="text"/>,
      {
        name: 'test',
        value: 'passed',
        validator: 'isLength:2',
        errorMessages: 'Some error'
      },
      {
        submitted: true
      });

    wrapper.find('input').simulate('change', { target: { value: '1' } });
    expect(wrapper.find('.valid-form-error')).to.have.length(1);

  });

  it('should display external error', () => {
    const wrapper = getWrapper(
      <input type="text"/>,
      {
        name: 'test',
        value: 'passed',
        validator: 'isLength:2',
        errorMessages: 'Some error'
      },
      {
        submitted: true,
        errors: {test: 'External error'}
      });

    const error = wrapper.find('.valid-form-error');
    expect(error).to.have.length(1);
    expect(error).to.have.text('External error');
  });


});