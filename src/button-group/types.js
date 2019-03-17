// @flow
import {type FieldRenderProps} from '../types.js.flow';

export type ButtonGroupProps = {
  mode: 'radio' | 'checkbox',
  $size?: 'compact' | 'default',
} & FieldRenderProps;
