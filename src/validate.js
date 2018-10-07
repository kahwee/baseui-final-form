// @flow
export function minLength(len) {
  return function(value) {
    if (value && value.length <= len) {
      return `Length is too short, you need at least ${len} characters.`;
    }
  };
}
