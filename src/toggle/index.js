// @flow
import {type FieldRenderProps} from '../types.js.flow';
import renderCheckbox from '../checkbox/index';

export default function render(props: FieldRenderProps) {
  return renderCheckbox({
    ...props,
    checkmarkType: 'toggle',
  });
}
