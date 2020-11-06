// @flow
import * as v from '../index';

describe('validate', () => {
  it('should check "minLength" boundaries', () => {
    const minLen2 = v.minLength(2);
    expect(minLen2('')).toBeUndefined();
    expect(minLen2('a')).toBeString();
    expect(minLen2('abc')).toBeUndefined();
    expect(minLen2('abcd')).toBeUndefined();
  });

  it('should check "maxLength" boundaries', () => {
    const maxLen3 = v.maxLength(3);
    expect(maxLen3('')).toBeUndefined();
    expect(maxLen3('abc')).toBeUndefined();
    expect(maxLen3('abcd')).toBeString();
  });

  it('should check "minValue" boundaries', () => {
    const minVal2 = v.minValue(2);
    expect(minVal2(1)).toBeString();
    expect(minVal2(2)).toBeUndefined();
    expect(minVal2(3)).toBeUndefined();
    expect(minVal2('1')).toBeString();
    expect(minVal2('2')).toBeUndefined();
    expect(minVal2('3')).toBeUndefined();
    expect(minVal2(-3000)).toBeString();
    expect(minVal2('-3000')).toBeString();
    expect(minVal2('-3000.99')).toBeString();
  });

  it('should check "maxValue" boundaries', () => {
    const maxVal2 = v.maxValue(2);
    expect(maxVal2(1)).toBeUndefined();
    expect(maxVal2(2)).toBeUndefined();
    expect(maxVal2(3)).toBeString();
    expect(maxVal2('1')).toBeUndefined();
    expect(maxVal2('2')).toBeUndefined();
    expect(maxVal2('3')).toBeString();
    expect(maxVal2(-3000)).toBeUndefined();
    expect(maxVal2('-3000')).toBeUndefined();
    expect(maxVal2('-3000.99')).toBeUndefined();
  });

  it('should check "required" boundaries', () => {
    expect(v.required('')).toBeString();
    expect(v.required()).toBeString();
    expect(v.required(null)).toBeString();
    expect(v.required('0')).toBeUndefined();
    expect(v.required(0)).toBeUndefined();
    expect(v.required(false)).toBeUndefined();
    expect(v.required(true)).toBeUndefined();
    expect(v.required('hello')).toBeUndefined();
    expect(v.required('-')).toBeUndefined();
    expect(v.required([])).toBeString();
    expect(v.required(['String'])).toBeUndefined();
  });

  it('should check "email" boundaries', () => {
    expect(v.email('hello')).toBeString();
    expect(v.email('hello@')).toBeString();
    expect(v.email('hello@example.com')).toBeUndefined();
  });

  it('should check "numeric" boundaries', () => {
    expect(v.numeric('hello')).toBeString();
    expect(v.numeric('-')).toBeString();
    expect(v.numeric('0')).toBeUndefined();
    expect(v.numeric(0)).toBeUndefined();
    expect(v.numeric(-1.09)).toBeUndefined();
    expect(v.numeric('-1.09')).toBeUndefined();
    expect(v.numeric(1.23)).toBeUndefined();
    expect(v.numeric('1.23')).toBeUndefined();
  });

  it('should check "integer" boundaries', () => {
    expect(v.integer('hello')).toBeString();
    expect(v.integer('-')).toBeString();
    expect(v.integer('0')).toBeUndefined();
    expect(v.integer(0)).toBeUndefined();
    expect(v.integer('1028801')).toBeUndefined();
    expect(v.integer(1028801)).toBeUndefined();
    expect(v.integer(-1)).toBeUndefined();
    expect(v.integer('-1')).toBeUndefined();
    expect(v.integer(1.23)).toBeString();
    expect(v.integer('1.23')).toBeString();
  });

  it('should check "uuid" boundaries', () => {
    expect(v.uuid('83cd3add-8a17-459e-b1cb-0becd3891f3d')).toBeUndefined();
    expect(v.uuid('ecf0bd9f-143f-4cb8-bf5c-0f6b209bb020')).toBeUndefined();
    expect(v.uuid('1.23')).toBeString();
    expect(v.uuid('')).toBeUndefined();
  });

  it('composeValidators', () => {
    const validate = v.composeValidators(v.required, v.integer);
    expect(validate('2222')).toBeUndefined();
    expect(validate()).toBeString();
  });
});
