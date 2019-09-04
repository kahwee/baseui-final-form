// @flow
import type {FieldRenderProps} from '../types.js';

export type ButtonGroupProps = {
  mode: 'radio' | 'checkbox',
  $size?: 'compact' | 'default',
} & FieldRenderProps;
