// @flow
import {type FieldRenderProps} from '../types.js.flow';
import renderCheckbox from '../checkbox/index';

export default function render({checkmarkType, ...rest}: FieldRenderProps) {
  return renderCheckbox({
    checkmarkType: 'toggle',
    ...rest,
  });
}
