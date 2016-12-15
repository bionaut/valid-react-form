const { describe, it } = global;

import React from 'react';
import { expect } from 'chai';
import { contain } from 'chai-enzyme';
import { mount, shallow } from 'enzyme';
import { spy, stub } from 'sinon';

import Toggle from '../Toggle';

describe('Toggle component', () => {

  const getWrapper = (children, props, context) => {
    return mount(
      <Toggle {...props}>
        {children}
      </Toggle>, { context })
  };

  it('should register component', () => {
    const registerSpy = spy();
    getWrapper(
      'Some label',
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
      'Some label',
      {
        name: 'test',
        required: true,
        errorMessages: 'Some error'
      },
      {
        submitted: true
      });

    expect(wrapper.find('.valid-form-error')).to.have.length(1);

  });

  it('should update payload', () => {
    const updatePayloadSpy = spy();
    const wrapper = getWrapper(
      'Some label',
      {
        name: 'test',
        required: true,
        errorMessages: 'Some error'
      },
      {
        updatePayload: updatePayloadSpy
      });

    wrapper.find('.valid-toggle-body').simulate('click');
    expect(updatePayloadSpy).to.have.property('callCount', 2);
    expect(updatePayloadSpy.lastCall.args).to.be.deep.equal(['test', true, null]);

  });

  it('should call onChange', () => {
    const onChangeSpy = spy();
    const wrapper = getWrapper(
      'Some label',
      {
        name: 'test',
        required: true,
        onChange: onChangeSpy
      });

    wrapper.find('.valid-toggle-body').simulate('click');
    expect(onChangeSpy).to.have.property('callCount', 1);
    expect(onChangeSpy.lastCall.args).to.be.deep.equal([true, true]);

  });

  it('should display external error', () => {
    const wrapper = getWrapper(
      'Some label',
      {
        name: 'test',
        errorMessages: 'Some error'
      },
      {
        submitted: true,
        errors: { test: 'External error' }
      });

    const error = wrapper.find('.valid-form-error');
    expect(error).to.have.length(1);
    expect(error).to.have.text('External error');
  });


  it('should work standalone', () => {
    const onChangeSpy = spy();
    const wrapper = getWrapper(
      'Some label',
      {
        name: 'test',
        errorMessages: 'Some error',
        onChange: onChangeSpy
      });
    expect(wrapper.find('.valid-toggle-body')).to.have.length(1);
    wrapper.find('.valid-toggle-body').simulate('click');
    expect(onChangeSpy).to.have.property('callCount', 1);
  });

  it('should switch readOnly mode when global readOnly', () => {
    const onChangeSpy = spy();
    const wrapper = getWrapper(
      'Some label',
      {
        name: 'test',
        required: true,
        onChange: onChangeSpy
      },
      {
        readOnly: true
      });

    expect(wrapper.find('.read-only')).to.have.length(1);
    expect(onChangeSpy).to.have.property('callCount', 0);
    wrapper.find('.valid-toggle-body').simulate('click');
    expect(onChangeSpy).to.have.property('callCount', 0);
  });

  it('should switch readOnly mode when local readOnly', () => {
    const onChangeSpy = spy();
    const wrapper = getWrapper(
      'Some label',
      {
        name: 'test',
        required: true,
        readOnly: true,
        onChange: onChangeSpy
      });

    expect(wrapper.find('.read-only')).to.have.length(1);
    expect(onChangeSpy).to.have.property('callCount', 0);
    wrapper.find('.valid-toggle-body').simulate('click');
    expect(onChangeSpy).to.have.property('callCount', 0);
  });

  it('should be valid if disabled', () => {
    const updatePayloadSpy = spy();
    const wrapper = getWrapper(
      'Some label',
      {
        name: 'test',
        required: true,
        disabled: true
      }, {
        updatePayload: updatePayloadSpy
      });

    expect(wrapper.find('.disabled')).to.have.length(1);
    expect(updatePayloadSpy).to.have.property('callCount', 1);
    wrapper.find('.valid-toggle-body').simulate('click');
    expect(updatePayloadSpy).to.have.property('callCount', 1);
  });

  it('should not display error when readOnly', () => {
    const wrapper = getWrapper(
      'Some label',
      {
        name: 'test',
        required: true,
        readOnly: true,
        errorMessages: 'Some error'
      },
      {
        submitted: true
      });

    expect(wrapper.find('.valid-form-error')).to.have.length(0);
  });

  it('should not display error when disabled', () => {
    const wrapper = getWrapper(
      'Some label',
      {
        name: 'test',
        required: true,
        disabled: true,
        errorMessages: 'Some error'
      },
      {
        submitted: true
      });

    expect(wrapper.find('.valid-form-error')).to.have.length(0);
  });

});