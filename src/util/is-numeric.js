// @flow
export default function isNumeric(n: string | number) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
