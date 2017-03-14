const { describe, it } = global;
import { expect } from 'chai';
import validator from 'validator';
import validate from '../validate';

describe('Validate', () => {
  it('should pass with value "true" ', () => {
    const actual = validate(true, null, true);
    const expected = null;
    expect(actual).to.deep.equal(expected);
  });

  it('should pass with value "123" ', () => {
    const actual = validate(true, null, 123);
    const expected = null;
    expect(actual).to.deep.equal(expected);
  });

  it('should  pass with value "123" ', () => {
    const actual = validate(true, null, '123');
    const expected = null;
    expect(actual).to.deep.equal(expected);
  });

  it('should not pass with value "" ', () => {
    const actual = validate(true, null, '');
    const expected = 'required';
    expect(actual).to.deep.equal(expected);
  });

  it('should not pass with value null ', () => {
    const actual = validate(true, null, null);
    const expected = 'required';
    expect(actual).to.deep.equal(expected);
  });

  it('should not pass with value undefined ', () => {
    const actual = validate(true, null, undefined);
    const expected = 'required';
    expect(actual).to.deep.equal(expected);
  });

  it('should not pass with value "false"', () => {
    const actual = validate(true, null, false);
    const expected = 'required';
    expect(actual).to.deep.equal(expected);
  });

  it('should validate required first', () => {
    const actual = validate(true, {isAlpha: (value) => validator.isAlpha(value)}, '123');
    const expected = 'isAlpha';
    expect(actual).to.deep.equal(expected);
  });

  it('should not pass with value "12"', () => {
    const actual = validate(true, {isLength: (value) => validator.isLength(value, {min:3})}, '12');
    const expected = 'isLength';
    expect(actual).to.deep.equal(expected);
  });

  it('should pass if disabled', () => {
    const actual = validate(true, {isLength: (value) => validator.isLength(value, {min:3})}, '12', true);
    const expected = null;
    expect(actual).to.deep.equal(expected);
  });

});