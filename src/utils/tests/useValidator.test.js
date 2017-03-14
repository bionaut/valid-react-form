const { describe, it } = global;
import { expect } from 'chai';
import validator from 'validator'
import useValidator from '../useValidator';

describe('Use Validator', () => {

  it('should validation result and be invalid', () => {
    const actual = useValidator({
      isAlpha: (value) => validator.isAlpha(value),
      isLength: (value) => validator.isLength(value, {min:10, max: 100}),
      contains: (value) => validator.contains(value, 'test')
    }, '123');

    const expected = 'isAlpha';
    expect(actual).to.deep.equal(expected);
  });

  it('should validation result and be valid', () => {
    const actual = useValidator({
      isAlpha: (value) => validator.isAlpha(value),
      isLength: (value) => validator.isLength(value, {min:1, max: 5}),
      contains: (value) => validator.contains(value, 'test')
    }, 'test');
    const expected = null;
    expect(actual).to.deep.equal(expected);
  });

  it('should validation result and be invalid', () => {
    const actual = useValidator({
      isLength: (value) => validator.isLength(value, {min: 1, max: 5})
    }, 'abcdefgh');
    const expected = 'isLength';
    expect(actual).to.deep.equal(expected);
  });

});