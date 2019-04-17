// @flow
import {type FieldRenderProps} from '../types.js';
import renderCheckbox from '../checkbox/index';

export default function render(props: FieldRenderProps) {
  return renderCheckbox({
    ...props,
    checkmarkType: 'toggle',
  });
}
