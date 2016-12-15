const { describe, it } = global;

import React from 'react';
import { expect } from 'chai';
import { contain } from 'chai-enzyme';
import { mount, shallow } from 'enzyme';
import { spy, stub } from 'sinon';

import ValidForm from '../../ValidForm/ValidForm';
import Field from '../Field';

describe('Valid Field', () => {

  it('should render label', () => {
    const wrp = shallow(<Field name='test' label="Test"/>);
    expect(wrp.find('label')).to.have.length(1);
    expect(wrp.find('label')).to.have.attr('for', 'test');
  });

  it('should register', () => {
    const registerSpy = spy();
    mount(<Field name='test' friendlyName="Test" errorMessages="Some error"/>, { context: { register: registerSpy } });
    expect(registerSpy).to.have.property('callCount', 1);
    expect(registerSpy.lastCall.args).to.be.deep.equal(['test', 'Test', 'Some error']);
  });

  it('should update payload on init', () => {
    const updateSpy = spy();
    mount(<Field name='test' label="Test Field" value='testValue' required={true}/>, { context: { updatePayload: updateSpy } });
    expect(updateSpy).to.have.property('callCount', 1);
    expect(updateSpy.lastCall.args).to.be.deep.equal(['test', 'testValue', null]);
  });

  it('should update when cleared', () => {
    const updateSpy = spy();
    const wrp = mount(<Field name='test' label="Test Field" value='some value' required={true}/>, { context: { updatePayload: updateSpy } });
    expect(updateSpy).to.have.property('callCount', 1);
    expect(updateSpy.lastCall.args).to.be.deep.equal(['test', 'some value', null]);
    wrp.find('input').simulate('change', { target: { value: '' } });
    expect(updateSpy).to.have.property('callCount', 2);
    expect(updateSpy.lastCall.args).to.be.deep.equal(['test', '', 'required']);
  });

  it('should call onChange callback when value is defined', () => {
    const callback = spy();
    mount(<Field name='test' value='testValue' onChange={callback}/>);
    expect(callback).to.have.property('callCount', 1);
  });

  it('should not call onChange callback', () => {
    const callback = spy();
    mount(<Field name='test' onChange={callback}/>);
    expect(callback).to.have.property('callCount', 0);
  });

  it('should invoke onChange callback', () => {
    const callback = spy();
    const wrp = mount(<Field name='test' onChange={callback}/>);
    expect(callback).to.have.property('callCount', 0);
    wrp.find('input').simulate('change', { target: { value: 'My new value' } });
    expect(callback).to.have.property('callCount', 1);
    expect(callback.lastCall.args[0]).to.be.equal('My new value');
  });

  it('should change value from outside after init', () => {
    const callback = spy();
    const wrp = mount(<Field name='test' onChange={callback}/>);
    const Input = wrp.find('input');

    Input.simulate('change', { target: { value: 'Foo' } });
    expect(callback).to.have.property('callCount', 1);
    expect(Input).to.have.value('Foo');

    wrp.setProps({ value: 'Bar' });
    expect(Input).to.have.value('Bar');
    expect(callback).to.have.property('callCount', 2);

    wrp.setProps({ value: '' });
    expect(Input).to.have.value('');
    expect(callback).to.have.property('callCount', 3);
  });

  it('should show error icon in standalone mode and init value', () => {
    const wrp = mount(<Field standalone={true} icons={true} name='test' validator="isLength:4" value="123"/>);
    const icon = wrp.find('.valid-icon');
    expect(icon).to.have.className('error');
  });

  it('should show OK icon in standalone mode and init value', () => {
    const wrp = mount(<Field standalone={true} icons={true} name='test' validator="isLength:4" value="1234"/>);
    const icon = wrp.find('.valid-icon');
    expect(icon).to.have.className('valid');
  });

  it('should show error message in standalone mode and init value', () => {
    const wrp = mount(<Field standalone={true} errorMessages="Error" name='test' validator="isLength:4" value="123"/>);
    const error = wrp.find('.valid-form-error');
    expect(error).to.have.length(1);
  });

  it('should not show error message if errorPanel=true', () => {
    const wrp = mount(<Field errorMessages="Error" name='test' validator="isLength:4" value="123"/>, { context: { errorPanel: true } });
    const error = wrp.find('.valid-form-error');
    expect(error).to.have.length(0);
  });

  it('should display external error', () => {
    const wrp = mount(<Field standalone={true} errorMessages="Local Error" name='test' validator="isLength:4" value="123"/>, { context: { errors: {test: 'External error'} } });
    const error = wrp.find('.valid-form-error');
    expect(error).to.have.length(1);
    expect(error).to.have.text('External error');
  });

  it('should be disabled', () => {
    const wrp = mount(<Field name="test" validator="isLength:0:2" disabled={true} value="1234"/>);
    expect(wrp.find('input')).to.be.disabled();
    expect(wrp.find('.valid-icon')).to.have.length(0);
    expect(wrp.find('.valid-form-error')).to.have.length(0);
  });

  it('should have a placeholder', () => {
    const wrp = mount(<Field name="test" placeholder="write here"/>);
    expect(wrp.find('input')).to.have.attr('placeholder', 'write here');
  });

  it('should unregister', () => {
    const unregisterSpy = spy();
    const wrp = mount(<Field name="test"/>, { context: { unregister: unregisterSpy } });
    wrp.unmount();
    expect(unregisterSpy).to.have.property('callCount', 1);
    expect(unregisterSpy.lastCall.args).to.be.deep.equal(['test']);
  });

  it('should validate required first', () => {
    const errorMessages = {
      isAlpha: 'Only alpha',
      contains: 'This has to contain test',
      required: 'This field is required'
    };

    const wrp = mount(
      <ValidForm>
        <Field placeholder="world" errorMessages={errorMessages} name="testField3" friendlyName="Test Field 3" validator="isAlpha|contains:test" required={true}/>
      </ValidForm>
    );
    wrp.find('form').simulate('submit');
    expect(wrp.find('.valid-form-error')).to.have.length(1);
    expect(wrp.find('.valid-form-error')).to.have.text('This field is required')
  });

  it('should debounce', (done) => {
    const onChangeSpy = spy();
    const wrp = mount(<Field debounce={100} onChange={onChangeSpy} name="test"/>)
    wrp.find('input').simulate('change', { target: { value: 'My new value' } });
    expect(onChangeSpy).to.have.property('callCount', 0);
    setTimeout(() => {
      expect(onChangeSpy).to.have.property('callCount', 1);
      done();
    }, 150)
  });

  it('should switch readOnly mode when global readOnly', () => {
    const wrp = mount(<Field name="test"/>, {context: { readOnly: true }})
    expect(wrp.find('.read-only')).to.have.length(1);
  });

  it('should switch readOnly mode when local readOnly', () => {
    const wrp = mount(<Field readOnly={true} name="test"/>);
    expect(wrp.find('.read-only')).to.have.length(1);
  });

  it('should have disabled class when disabled', () => {
    const wrp = mount(<Field disabled={true} name="test"/>);
    expect(wrp.find('.disabled')).to.have.length(1);
  });

  it('should not be have disabled class when readOnly', () => {
    const wrp = mount(<Field disabled={true} readOnly={true} name="test"/>);
    expect(wrp.find('.disabled')).to.have.length(0);
    expect(wrp.find('.read-only')).to.have.length(1);
  });

  it('should not display error when readOnly', () => {
    const wrp = mount(<Field errorMessages="Some error" readOnly={true} required={true} name="test"/>, {context: {submitted: true}});
    expect(wrp.find('.valid-form-error')).to.have.length(0);
  });

  it('should not display error when disabled', () => {
    const wrp = mount(<Field errorMessages="Some error" disabled={true} required={true} name="test"/>, {context: {submitted: true}});
    expect(wrp.find('.valid-form-error')).to.have.length(0);
  });

});