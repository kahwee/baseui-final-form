// @flow
export default function isNumeric(n: mixed) {
  if (Array.isArray(n)) {
    return false;
  }
  return !isNaN(parseFloat(n)) && isFinite(n);
}
