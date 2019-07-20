//@flow
import * as React from 'react';
import FormControlLabel from '../form-control/form-control-label';
import type {
  FieldRenderProps,
  FieldRenderPropsMeta,
  OptionT,
} from '../types.js';
import type {FieldValidator} from 'final-form';
import type {OverrideT} from 'baseui/helpers/overrides';

type FormControlProps = {
  overrides: {
    Label?: OverrideT<*>,
    Caption?: OverrideT<*>,
    ControlContainer?: OverrideT<*>,
  },
  label: ?(React.Node | ((props: {}) => React.Node)),
  caption: ?(React.Node | ((props: {}) => React.Node)),
  error: boolean | React.Node | ((props: {}) => React.Node),
  help?: string,
};
type GenericInputProps = {
  id: string,
  error?: any,
  [string]: any,
};
type AssignedProps = {
  formControlProps: FormControlProps,
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
  options?: OptionT[],
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
    formControlProps: {
      labelFor: input.name,
      caption,
      help,
      error: meta && meta.error && meta.touched ? meta.error : false,
      label,
      overrides: {
        Label: {component: FormControlLabel, props: {help}},
      },
    },
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
