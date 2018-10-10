// @flow
export default function isNumeric(n: string | number) {
  if (Array.isArray(n)) {
    return false;
  }
  return !isNaN(parseFloat(n)) && isFinite(n);
}
