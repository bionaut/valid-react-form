const { describe, it } = global;

import React from 'react';
import { expect } from 'chai';
import { contain } from 'chai-enzyme';
import { mount, shallow } from 'enzyme';
import { spy, stub } from 'sinon';

import ValidForm from '../ValidForm';
import Field from '../../Field/Field';

describe('Valid Form', () => {
  const errorMessages = {
    required: 'This field is required'
  };

  const submitSpy = spy();

  const wrp = mount(
    <ValidForm errorPanel={true} onSubmit={submitSpy} extended={{ extended: 'extended_data' }}>
      <Field errorMessages={errorMessages} required={true} name='field1' friendlyName='Demo Field'/>
      <Field placeholder='world' errorMessages={errorMessages} name='field2' friendlyName='Test Field 3' required={true}/>
      <button type='submit'>Submit</button>
    </ValidForm>
  );

  it('should render', () => {
    expect(wrp.find('form')).to.have.length(1);
    expect(wrp.props().children).to.have.length(3);
  });

  it('should have 2 component registered', () => {
    expect(wrp.state('components')).to.deep.equal({
      field1: {
        friendlyName: 'Demo Field',
        errorMessages,
        failedValidator: 'required'
      },
      field2: {
        failedValidator: 'required',
        friendlyName: 'Test Field 3',
        errorMessages
      }
    });
  });

  it('should have 2 payload items', () => {
    expect(Object.keys(wrp.state('payload'))).to.have.length(2);
  });

  it('should submit and be invalid - no callback', () => {
    expect(submitSpy).to.have.property('callCount', 0);
    wrp.find('button').simulate('submit');
    expect(submitSpy).to.have.property('callCount', 0);
    expect(wrp.state('submitted')).to.equal(true);
  });

  it('should display error panel and one error', () => {
    expect(wrp.find('.valid-form-errors')).to.have.length(1);
  });


  it('should submit and have extended data + input data', () => {
    const wrapper = mount(
      <ValidForm errorPanel={true} onSubmit={submitSpy} extended={{ extended: 'extended_data' }}>
        <Field errorMessages={errorMessages} required={true} name='field1' friendlyName='Demo Field'/>
        <button type='submit'>Submit</button>
      </ValidForm>
    );
    expect(submitSpy).to.have.property('callCount', 0);
    wrapper.find('input').simulate('change', { target: { value: 'My new value' } });
    wrapper.find('button').simulate('submit');
    expect(submitSpy).to.have.property('callCount', 1);
    expect(submitSpy.lastCall.args).to.be.deep.equal(
      [{
        field1: 'My new value',
        extended: 'extended_data'
      }]);
  });

  it('should display external errors in panel', () => {
    const onSubmitSpy = spy();
    const wrapper = mount(
      <ValidForm errorPanel={true} onSubmit={onSubmitSpy} errors={{ field1: 'Some external error!' }}>
        <Field errorMessages={errorMessages} required={true} name='field1' friendlyName='Demo Field'/>
        <button type='submit'>Submit</button>
      </ValidForm>
    );
    expect(onSubmitSpy).to.have.property('callCount', 0);
    wrapper.find('input').simulate('change', { target: { value: 'My new value' } });
    wrapper.find('button').simulate('submit');
    expect(onSubmitSpy).to.have.property('callCount', 1);
    expect(wrapper.find('.valid-form-error')).to.have.length(1);
    expect(wrapper.find('.valid-form-error')).to.have.text('Demo Field: Some external error!');
  });

});