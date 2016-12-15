const { describe, it } = global;
import { expect } from 'chai';
import useValidator from '../useValidator';

describe('Use Validator', () => {

  it('should validation result and be invalid', () => {
    const actual = useValidator('isLength:1:5|isAlpha|contains:test', '123');
    const expected = 'isAlpha';
    expect(actual).to.deep.equal(expected);
  });

  it('should validation result and be valid', () => {
    const actual = useValidator('isLength:1:5|isAlpha|contains:test', 'test');
    const expected = null;
    expect(actual).to.deep.equal(expected);
  });

  it('should validation result and be invalid', () => {
    const actual = useValidator('isLength:1:5', 'abcdefgh');
    const expected = 'isLength';
    expect(actual).to.deep.equal(expected);
  });

});