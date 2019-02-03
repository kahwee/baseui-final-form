// @flow
import isNumeric from '../is-numeric';

describe('is-numeric', () => {
  it('should pass for boundaries in integer test', () => {
    expect(isNumeric('0')).toBe(true);
    expect(isNumeric('-4')).toBe(true);
    expect(isNumeric('23230')).toBe(true);
  });

  it('should pass for boundaries in float test', () => {
    expect(isNumeric('0.0')).toBe(true);
    expect(isNumeric('0.001')).toBe(true);
    expect(isNumeric('-40.34')).toBe(true);
    expect(isNumeric('23230.4')).toBe(true);
  });

  it('should not work for non-numerical examples', () => {
    expect(isNumeric('0.0a')).toBe(false);
    expect(isNumeric('c0.001')).toBe(false);
    expect(isNumeric('!40.34')).toBe(false);
    expect(isNumeric('$23230.4')).toBe(false);
    expect(isNumeric(false)).toBe(false);
    expect(isNumeric(true)).toBe(false);
    expect(isNumeric('')).toBe(false);
    expect(isNumeric(new Date())).toBe(false);
    expect(isNumeric({s: 0})).toBe(false);
    expect(isNumeric([])).toBe(false);
    expect(isNumeric([1])).toBe(false);
  });
});
