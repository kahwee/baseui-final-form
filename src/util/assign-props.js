//@flow
import * as React from 'react';
import type {FieldRenderProps, FieldRenderPropsMeta} from '../types.js';
import type {FieldValidator} from 'final-form';
import type {ValueT} from 'baseui/select';

type GenericInputProps = {
  id: string,
  error?: any,
  [string]: any,
};
type AssignedProps = {
  inputProps: GenericInputProps,
  meta: FieldRenderPropsMeta,
  validate?: FieldValidator,
  name: string,
  label: ?(React.Node | ((props: {}) => React.Node)),
  caption: ?(React.Node | ((props: {}) => React.Node)),
  onBlur: (?SyntheticFocusEvent<*>) => void,
  onChange: (SyntheticInputEvent<*> | any) => void,
  onFocus: (?SyntheticFocusEvent<*>) => void,
  value: any,
  checked?: boolean,
  options?: ValueT,
};
export default function assignProps({
  meta,
  validate,
  label,
  help,
  caption,
  options,
  input,
  onChange,
  ...inputProps
}: FieldRenderProps): AssignedProps {
  return {
    inputProps: {
      ...inputProps,
      ...input,
      onChange: (...args) => {
        if (onChange) {
          onChange(...args);
        }
        if (input.onChange) {
          input.onChange(...args);
        }
      },
      id: input.name,
      error: meta.error && meta.touched,
    },
    meta,
    validate,
    onChange,
    label,
    caption,
    options,
    ...input,
  };
}
