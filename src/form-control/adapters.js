// @flow
import * as React from 'react';
import {type FieldRenderProps} from 'react-final-form';
import {FormControlLabel} from './form-control-label';
import type {FieldRenderPropsMeta, OptionT} from '../types';
import type {FieldValidator} from 'final-form';

type AdaptToFormControlProps = {
  meta: FieldRenderPropsMeta,
  label: ?(React.Node | ((props: {}) => React.Node)),
  caption: ?(React.Node | ((props: {}) => React.Node)),
  validate?: FieldValidator,
  options?: OptionT[],
  help?: string,
  disabled?: boolean,
  formControlProps?: *,
} & FieldRenderProps;
export function adaptToFormControl(props: *) {
  const {
    meta,
    label,
    help,
    caption,
    disabled,
    input,
    // In case user wants to add additional parameters, including overrides.
    formControlProps = {},
  } = ((props: any): AdaptToFormControlProps);
  return {
    ...formControlProps,
    labelFor: input.name,
    caption,
    help,
    disabled,
    ...(meta.error && meta.touched ? {error: meta.error} : {error: ''}),
    positive: '',
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
