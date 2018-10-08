// @flow
import isNumeric from './util/is-numeric';

export function minLength(len: number) {
  return function(value: ?string) {
    if (value && value.length < len) {
      return `Length is too short, you need at least ${String(
        len
      )} characters.`;
    }
  };
}

export function maxLength(len: number) {
  return function(value: ?string) {
    if (value && value.length > len) {
      return `Length is too long, you cannot have more than ${String(
        len
      )} characters.`;
    }
  };
}

export function minValue(min: number) {
  return function(value: ?string) {
    if (value && isNumeric(value) && Number(value) < min) {
      return `Length is too short, you need at least ${String(
        min
      )} characters.`;
    }
  };
}

export function required(value: string) {
  return value ? undefined : 'Required';
}

export function email(value: string) {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;
}

export function number(value: string) {
  return value && isNaN(Number(value)) ? 'Must be a number' : undefined;
}
