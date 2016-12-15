const { describe, it } = global;
import { expect } from 'chai';
import classes from '../classes';

describe('Classes', () => {
  it('should return string of classes', () => {
    const someCondition = 0 < 1;
    const actual = classes('class1', someCondition && 'class2', !someCondition && 'class3', null, 'class5');
    const expected = 'class1 class2 class5';
    expect(actual).to.equal(expected);
  });
});