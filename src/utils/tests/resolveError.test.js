const { describe, it } = global;
import { expect } from 'chai';
import resolveError from '../resolveError';

const errorMessages = {
  isLength: 'Too long',
  isAlpha: 'Only alpha',
  contains: 'Need to contains'
};

describe('Resolve error', () => {

  it('should return correct error message', () => {
    const actual = resolveError(errorMessages, 'isLength');
    const expected = 'Too long';
    expect(actual).to.deep.equal(expected);
  });

  it('should return correct error message', () => {
    const actual = resolveError(errorMessages, 'isAlpha');
    const expected = 'Only alpha';
    expect(actual).to.deep.equal(expected);
  });

  it('should return undefined', () => {
    const actual = resolveError(errorMessages, 'noMatchingMessage');
    const expected = undefined;
    expect(actual).to.deep.equal(expected);
  });

  it('should return correct single message', () => {
    const actual = resolveError('Single message', 'isAlpha');
    const expected = 'Single message';
    expect(actual).to.deep.equal(expected);
  });

});