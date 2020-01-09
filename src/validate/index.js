// @flow
import isNumeric from '../util/is-numeric';

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
  return function(value: ?string | number) {
    if (value && isNumeric(value) && Number(value) < min) {
      return `Value needs to be bigger than ${String(min)}.`;
    }
  };
}

export function maxValue(max: number) {
  return function(value: ?string | number) {
    if (value && isNumeric(value) && Number(value) > max) {
      return `Value needs to be smaller than ${String(max)}.`;
    }
  };
}

export function required(value: ?string | ?number | ?boolean) {
  if (Array.isArray(value) && value.length === 0) {
    return 'Required';
  } else if (value === undefined || value === null || value === '') {
    return 'Required';
  }
  return;
}

export function uuid(value: string) {
  return value &&
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value
    )
    ? 'Invalid UUID format'
    : undefined;
}

export function email(value: string) {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;
}

export function numeric(value: ?string | number) {
  return value && !isNumeric(value) ? 'Must be a number' : undefined;
}
