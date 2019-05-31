//@flow
import * as React from 'react';
import FormControlLabel from '../support/form-control-label';
import type {FieldRenderProps, Option} from '../types.js';
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
  meta: {
    // TODO: Make a diff of `FieldState` without all the functions
    active?: boolean,
    data?: Object,
    dirty?: boolean,
    dirtySinceLastSubmit?: boolean,
    error?: any,
    initial?: boolean,
    invalid?: boolean,
    meta?: boolean,
    pristine?: boolean,
    submitError?: any,
    submitFailed?: boolean,
    submitSucceeded?: boolean,
    submitting?: boolean,
    touched?: boolean,
    valid?: boolean,
    visited?: boolean,
  },
  validate?: FieldValidator,
  name: string,
  label: ?(React.Node | ((props: {}) => React.Node)),
  caption: ?(React.Node | ((props: {}) => React.Node)),
  onBlur: (?SyntheticFocusEvent<*>) => void,
  onChange: (SyntheticInputEvent<*> | any) => void,
  onFocus: (?SyntheticFocusEvent<*>) => void,
  value: any,
  checked?: boolean,
  options?: Option[],
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
