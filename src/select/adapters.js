// @flow
import {type FieldRenderProps} from 'react-final-form';
import {uniqueConcat} from './unique-concat';
import type {FieldRenderPropsMeta} from '../types';
import type {OnChangeParamsT, OptionT, ValueT} from 'baseui/select/index';

type AdaptToSingleSelectProps = {
  meta: FieldRenderPropsMeta,
  disabled?: boolean,
  onChange: (SyntheticInputEvent<*> | any) => void,
  options: Array<OptionT>,
  softDefaultValue?: OptionT,
} & FieldRenderProps;
export const adaptToSingleSelect = (
  props: *
): {
  value: ValueT,
  options: ValueT,
} => {
  const idKey = 'id';
  const {
    meta,
    options,
    input,
    disabled,
    softDefaultValue, //softDefaultValue will not override initial values
    ...restProps
  } = ((props: any): AdaptToSingleSelectProps);
  if (!options || !Array.isArray(options)) {
    throw new Error(
      `Invalid options in "${input.name}", expects options to be Array<OptionT>.`
    );
  }
  let newOptions = uniqueConcat<OptionT>(
    options,
    input.value
      ? [
          {
            [idKey]: input.value,
            label: input.value,
          },
        ]
      : [],
    idKey
  );
  // $FlowFixMe
  let selectedOption = newOptions.filter<{}>(
    option => input.value === option.id
  );
  const defaultOption =
    softDefaultValue &&
    newOptions.find(option => softDefaultValue === option.id);
  return {
    ...restProps,
    id: input.name,
    options: newOptions,
    disabled,
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
    value:
      meta.pristine && !input.value && defaultOption
        ? defaultOption
        : selectedOption,
    error: meta.error && meta.touched,
  };
};

type AdaptToMultiSelectProps = {
  meta: FieldRenderPropsMeta,
  options: Array<OptionT>,
  disabled?: boolean,
} & FieldRenderProps;
export const adaptToMultiSelect = (
  props: *
): {
  value: ValueT,
  options: ValueT,
} => {
  const idKey = 'id';
  let {
    meta,
    options,
    input,
    disabled,
    ...restProps
  } = ((props: any): AdaptToMultiSelectProps);
  if (!options || !Array.isArray(options)) {
    throw new Error(
      `Invalid options in "${input.name}", expects options to be Array<OptionT>.`
    );
  }
  const values = Array.isArray(input.value) ? input.value : [];
  let newOptions = uniqueConcat<OptionT>(
    options,
    values.map(option => {
      return {
        [idKey]: option,
        label: option,
      };
    }),
    idKey
  );

  // $FlowFixMe
  let selectedOption = newOptions.filter<{}>(option =>
    values.includes(option.id)
  );
  return {
    ...restProps,
    id: input.name,
    options: newOptions,
    disabled,
    multi: true,
    onChange: ({value, option, type}: OnChangeParamsT) => {
      if (input.onChange) {
        input.onChange(
          Array.isArray(value) ? value.map(option => option.id) : undefined
        );
        newOptions.concat(value);
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
};
