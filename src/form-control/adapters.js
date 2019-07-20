// @flow
import {type FieldRenderProps as ReactFinalFormFieldRenderProps} from 'react-final-form';
import FormControlLabel from './form-control-label';
import type {FieldRenderPropsMeta, OptionT} from '../types';
import type {FieldValidator} from 'final-form';

type AdaptToFormControlProps = {
  meta: FieldRenderPropsMeta,
  label: ?(React.Node | ((props: {}) => React.Node)),
  caption: ?(React.Node | ((props: {}) => React.Node)),
  validate?: FieldValidator,
  options?: OptionT[],
  help?: string,
  formControlProps?: *,
} & ReactFinalFormFieldRenderProps;

export function adaptToFormControl({
  meta,
  validate,
  label,
  help,
  caption,
  options,
  input,
  // In case user wants to add additional parameters, including overrides.
  formControlProps = {},
}: AdaptToFormControlProps) {
  return {
    ...formControlProps,
    labelFor: input.name,
    caption,
    help,
    error: meta && meta.error && meta.touched ? meta.error : false,
    label,
    overrides: {
      ...(formControlProps.overrides ? formControlProps.overrides : {}),
      Label: {
        component: FormControlLabel,
        props: {
          help,
        },
      },
    },
  };
}
