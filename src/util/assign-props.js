//@flow
import * as React from 'react';
import type {FieldValidator} from 'final-form';
import FormControlLabel from '../support/form-control-label';
import type {OverrideT} from 'baseui/helpers/overrides';
import type {FieldRenderProps, Option} from '../types.js';

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
  error?: string,
  [string]: any,
};
type AssignedProps = {
  formControlProps: FormControlProps,
  inputProps: GenericInputProps,
  meta: any,
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
  ...inputProps
}: FieldRenderProps): AssignedProps {
  return {
    formControlProps: {
      labelFor: input.name,
      caption,
      help,
      error: meta && meta.error ? meta.error : false,
      label,
      overrides: {
        Label: {component: FormControlLabel, props: {help}},
      },
    },
    inputProps: {
      ...inputProps,
      ...input,
      id: input.name,
      error: meta.error,
    },
    meta,
    validate,
    label,
    caption,
    options,
    ...input,
  };
}
