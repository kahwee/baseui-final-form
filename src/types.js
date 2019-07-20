// @flow
import * as React from 'react';
import {type FieldRenderProps as ReactFinalFormFieldRenderProps} from 'react-final-form';
import type {FieldValidator} from 'final-form';

export type OptionT = {
  label: string,
  id: string,
  disabled?: boolean,
};

export type ReactSelectOption = {
  label: string,
  value: string,
  disabled?: boolean,
};

export type FieldRenderPropsMeta = {
  active?: boolean,
  data?: Object,
  dirty?: boolean,
  dirtySinceLastSubmit?: boolean,
  error?: any,
  initial?: any,
  invalid?: boolean,
  length?: number,
  modified?: boolean,
  pristine?: boolean,
  submitError?: any,
  submitFailed?: boolean,
  submitSucceeded?: boolean,
  submitting?: boolean,
  touched?: boolean,
  valid?: boolean,
  visited?: boolean,
};

export type FieldRenderProps = {
  meta: FieldRenderPropsMeta,
  caption: ?(React.Node | ((props: {}) => React.Node)),
  onChange: (SyntheticInputEvent<*> | any) => void,
  label: ?(React.Node | ((props: {}) => React.Node)),
  disabled?: boolean,
  help?: string,
  options?: OptionT[],
  validate?: FieldValidator,
} & ReactFinalFormFieldRenderProps;
