// @flow
import {type FieldRenderProps} from 'react-final-form';
import type {FieldRenderPropsMeta} from '../types';
import type {OnChangeParamsT, OptionT} from 'baseui/select';

type AdaptToSingleSelectProps = {
  meta: FieldRenderPropsMeta,
  onChange: (SyntheticInputEvent<*> | any) => void,
  options: Array<OptionT>,
} & FieldRenderProps;
export function adaptToSingleSelect(props: *) {
  const {meta, options, input} = ((props: any): AdaptToSingleSelectProps);
  if (!options || !Array.isArray(options)) {
    throw new Error('Missing options');
  }
  // $FlowFixMe
  let selectedOption = options.filter<{}>(option => option.id === input.value);
  return {
    id: input.name,
    options,
    multi: false,
    onChange: ({value, option, type}: OnChangeParamsT) => {
      if (input.onChange) {
        input.onChange(
          Array.isArray(value) && value[0] ? value[0].id : undefined
        );
      }
    },
    onBlur: (ev: any) => {
      if (input.onBlur) {
        input.onBlur(((ev: any): SyntheticFocusEvent<*>));
      }
    },
    onFocus: (ev: any) => {
      if (input.onFocus) {
        input.onFocus(((ev: any): SyntheticFocusEvent<*>));
      }
    },
    value: selectedOption,
    error: meta.error && meta.touched,
  };
}

type AdaptToMultiSelectProps = {
  meta: FieldRenderPropsMeta,
  options: Array<OptionT>,
} & FieldRenderProps;
export function adaptToMultiSelect(props: *) {
  const {meta, options, input} = ((props: any): AdaptToMultiSelectProps);
  if (!options || !Array.isArray(options)) {
    throw new Error('Missing options');
  }
  // $FlowFixMe
  let selectedOption = options.filter<{}>(option =>
    input.value.includes(option.id)
  );
  return {
    id: input.name,
    options,
    multi: true,
    onChange: ({value, option, type}: OnChangeParamsT) => {
      if (input.onChange) {
        input.onChange(
          Array.isArray(value) ? value.map(option => option.id) : undefined
        );
      }
    },
    onBlur: (ev: any) => {
      if (input.onBlur) {
        input.onBlur(((ev: any): SyntheticFocusEvent<*>));
      }
    },
    onFocus: (ev: any) => {
      if (input.onFocus) {
        input.onFocus(((ev: any): SyntheticFocusEvent<*>));
      }
    },
    value: selectedOption,
    error: meta.error && meta.touched,
  };
}
