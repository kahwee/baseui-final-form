// @flow
import {type SingleValueFieldRenderProps} from '../types.js.flow';
import renderCheckbox from '../checkbox/index';

export default function render({
  inputProps,
  ...rest
}: SingleValueFieldRenderProps) {
  inputProps = inputProps || {};
  inputProps.checkmarkType = 'toggle';
  return renderCheckbox({
    ...rest,
    inputProps,
  });
}
