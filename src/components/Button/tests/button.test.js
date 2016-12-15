const { describe, it } = global;

import React from 'react';
import { expect } from 'chai';
import { contain } from 'chai-enzyme';
import { mount, shallow } from 'enzyme';
import { spy, stub } from 'sinon';

import Button from '../Button';

describe('Button component', () => {

  const getWrapper = (children, props, context) => {
    return mount(
      <Button {...props}>
        {children}
      </Button>, { context })
  };

  it('should be hidden if readOnly mode', () => {
    const wrapper = getWrapper('Submit', {}, { readOnly: true });
    expect(wrapper.find('button')).to.have.length(0);
  });

});