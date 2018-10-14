// @flow
import {validate as v} from '../index';

describe('validate', () => {
  Object.keys(v).forEach(validateKey => {
    it(`should pass "${validateKey}" when value isn't defined`, () => {
      // $FlowFixMe
      const results = v[validateKey]();
      if (typeof results === 'function') {
        // This is for `minLength` and others which return a function
        expect(results()).toBeUndefined();
      } else if (validateKey === 'required') {
        // Required is a special used case
        expect(results).toBeDefined();
      } else {
        expect(results).toBeUndefined();
      }
    });
  });
  it('should check "minLength" boundaries', () => {
    const minLen2 = v.minLength(2);
    expect(minLen2('')).toBeUndefined();
    expect(minLen2('a')).toBeDefined();
    expect(minLen2('abc')).toBeUndefined();
    expect(minLen2('abcd')).toBeUndefined();
  });

  it('should check "maxLength" boundaries', () => {
    const maxLen3 = v.maxLength(3);
    expect(maxLen3('')).toBeUndefined();
    expect(maxLen3('abc')).toBeUndefined();
    expect(maxLen3('abcd')).toBeDefined();
  });

  it('should check "minValue" boundaries', () => {
    const minVal2 = v.minValue(2);
    expect(minVal2(1)).toBeDefined();
    expect(minVal2(2)).toBeUndefined();
    expect(minVal2(3)).toBeUndefined();
    expect(minVal2('1')).toBeDefined();
    expect(minVal2('2')).toBeUndefined();
    expect(minVal2('3')).toBeUndefined();
    expect(minVal2(-3000)).toBeDefined();
    expect(minVal2('-3000')).toBeDefined();
    expect(minVal2('-3000.99')).toBeDefined();
  });

  it('should check "maxValue" boundaries', () => {
    const maxVal2 = v.maxValue(2);
    expect(maxVal2(1)).toBeUndefined();
    expect(maxVal2(2)).toBeUndefined();
    expect(maxVal2(3)).toBeDefined();
    expect(maxVal2('1')).toBeUndefined();
    expect(maxVal2('2')).toBeUndefined();
    expect(maxVal2('3')).toBeDefined();
    expect(maxVal2(-3000)).toBeUndefined();
    expect(maxVal2('-3000')).toBeUndefined();
    expect(maxVal2('-3000.99')).toBeUndefined();
  });

  it('should check "required" boundaries', () => {
    expect(v.required('hello')).toBeUndefined();
    expect(v.required('-')).toBeUndefined();
  });

  it('should check "email" boundaries', () => {
    expect(v.email('hello')).toBeDefined();
    expect(v.email('hello@')).toBeDefined();
    expect(v.email('hello@example.com')).toBeUndefined();
  });

  it('should check "numeric" boundaries', () => {
    expect(v.numeric('hello')).toBeDefined();
    expect(v.numeric('-')).toBeDefined();
    expect(v.numeric('0')).toBeUndefined();
    expect(v.numeric(0)).toBeUndefined();
    expect(v.numeric(-1.09)).toBeUndefined();
    expect(v.numeric('-1.09')).toBeUndefined();
    expect(v.numeric(1.23)).toBeUndefined();
    expect(v.numeric('1.23')).toBeUndefined();
  });
});
