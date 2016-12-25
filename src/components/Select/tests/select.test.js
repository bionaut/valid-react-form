const { describe, it } = global;

import React from 'react';
import { expect } from 'chai';
import { contain } from 'chai-enzyme';
import { mount, shallow } from 'enzyme';
import { spy, stub } from 'sinon';

import Select from '../Select';

describe('Select component', () => {

  const selectData = [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' },
    { value: 3, label: 'Option 3' }
  ];

  const getWrapper = (props, context) => {
    return mount(
      <Select{...props}/>, { context })
  };

  it('should render with value set and register', () => {
    const registerSpy = spy();
    const wrp = getWrapper({
      label: 'Some label',
      name: 'select',
      value: 1,
      data: selectData,
      errorMessages: 'Some error'
    }, {
      register: registerSpy
    });
    expect(registerSpy).to.have.property('callCount', 1);
    expect(registerSpy.lastCall.args).to.be.deep.equal(['select', 'Some label', 'Some error']);
    expect(wrp.find('.valid-select')).to.have.length(1);
    expect(wrp.find('.valid')).to.have.length(1);
    expect(wrp.find('.valid-select-options')).to.have.length(0);
    expect(wrp.find('.valid-select-value')).to.have.text('Option 1');
  });

  it('should update on init', () => {
    const updateSpy = spy();
    getWrapper({
      label: 'Some label',
      name: 'select',
      value: 2,
      required: true,
      data: selectData
    }, {
      updatePayload: updateSpy
    });
    expect(updateSpy).to.have.property('callCount', 1);
    expect(updateSpy.lastCall.args).to.be.deep.equal(['select', 2, null]);
  });

  it('should open options and update value', () => {
    const updateSpy = spy();
    const wrp = getWrapper({
      label: 'Some label',
      data: selectData
    }, {
      updatePayload: updateSpy
    });
    expect(updateSpy).to.have.property('callCount', 1);
    expect(wrp.find('.valid-select-options')).to.have.length(0);
    wrp.find('.valid-select-body').simulate('click');
    expect(wrp.find('.valid-select-options')).to.have.length(1);
    wrp.find({ title: 'Option 1' }).simulate('click');
    expect(updateSpy).to.have.property('callCount', 2);
  });


  it('should be readOnly and not able to open', () => {
    const updateSpy = spy();
    const wrp = getWrapper({
      label: 'Some label',
      data: selectData
    }, {
      updatePayload: updateSpy,
      readOnly: true
    });
    expect(wrp.find('.valid-select-options')).to.have.length(0);
    wrp.find('.valid-select-body').simulate('click');
    expect(wrp.find('.valid-select-options')).to.have.length(0);
    expect(wrp.find('.read-only')).to.have.length(1);
  });

  it('should be disabled and not able to open', () => {
    const updateSpy = spy();
    const wrp = getWrapper({
      label: 'Some label',
      disabled: true,
      data: selectData
    }, {
      updatePayload: updateSpy
    });
    expect(wrp.find('.valid-select-options')).to.have.length(0);
    wrp.find('.valid-select-body').simulate('click');
    expect(wrp.find('.valid-select-options')).to.have.length(0);
    expect(wrp.find('.disabled')).to.have.length(1);
  });

  it('should have custom data (properties) and update', () => {
    const updateSpy = spy();
    const wrp = getWrapper({
      label: 'Some label',
      value: 1,
      name: 'select',
      returnAs: 'customValue',
      viewAs: 'customLabel',
      data: [
        { customValue: 1, customLabel: 'Custom Option 1' },
        { customValue: 2, customLabel: 'Custom Option 2' },
        { customValue: 3, customLabel: 'Custom Option 3' }
      ]

    }, {
      updatePayload: updateSpy
    });
    expect(wrp.find('.valid-select-value')).to.have.text('Custom Option 1');
    expect(wrp.find('.valid-select-options')).to.have.length(0);
    wrp.find('.valid-select-body').simulate('click');
    expect(wrp.find('.valid-select-options')).to.have.length(1);
    expect(wrp.find({ title: 'Custom Option 1' })).to.have.length(1);
    wrp.find({ title: 'Custom Option 1' }).simulate('click');
    expect(updateSpy).to.have.property('callCount', 2);
    expect(updateSpy.lastCall.args).to.be.deep.equal(['select', 1, undefined]);
  });

  it('should be able to clear', () => {
    const updateSpy = spy();
    const wrp = getWrapper({
      label: 'Some label',
      clearButton: true,
      data: selectData
    }, {
      updatePayload: updateSpy
    });
    expect(wrp.find('.valid-select-clear')).to.have.length(0);
    wrp.find('.valid-select-body').simulate('click');
    wrp.find({ title: 'Option 1' }).simulate('click');
    expect(wrp.find('.valid-select-value')).to.have.text('Option 1');
    expect(wrp.find('.valid-select-clear')).to.have.length(1);
    wrp.find('.valid-select-clear').simulate('click');
    expect(wrp.find('.valid-select-value')).to.have.length(0);
  });

  it('should not have icons when readonly', () => {
    const wrp = getWrapper({
      label: 'Some label',
      required: true,
      icons: true,
      data: selectData
    }, {
      readOnly: true,
      submitted: true
    });
    expect(wrp.find('.valid-icon')).to.have.length(0);
  });


});