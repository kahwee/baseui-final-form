// @flow
import * as React from 'react';
import {type FieldRenderProps as ReactFinalFormFieldRenderProps} from 'react-final-form';
import type {FieldValidator} from 'final-form';

export type Option = {
  label: string,
  id: string,
  disabled?: boolean,
};

export type ReactSelectOption = {
  label: string,
  value: string,
  disabled?: boolean,
};

export type FieldRenderProps = {
  caption: ?(React.Node | ((props: {}) => React.Node)),
  onChange: (SyntheticInputEvent<*> | any) => void,
  label: ?(React.Node | ((props: {}) => React.Node)),
  disabled?: boolean,
  help?: string,
  options?: Option[],
  validate?: FieldValidator,
} & ReactFinalFormFieldRenderProps;
