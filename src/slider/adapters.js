// @flow
import {type FieldRenderProps} from 'react-final-form';
import type {FieldRenderPropsMeta} from '../types';
import type {ParamsT} from 'baseui/slider/index';

type AdaptToSliderProps = {
  disabled?: boolean,
  min?: number,
  max?: number,
  meta: FieldRenderPropsMeta,
} & FieldRenderProps;
export function adaptToSlider(props: {}) {
  const {meta, input, min, max, disabled} = ((props: any): AdaptToSliderProps);
  const transformedValue = input.value || [min, max] || [];
  return {
    id: input.name,
    disabled,
    value: transformedValue,
    onChange: (onChangeParams: any) => {
      const {value} = ((onChangeParams: any): {...ParamsT});
      input.onChange(value);
    },
    ...(typeof min === 'undefined' ? {} : {min}),
    ...(typeof max === 'undefined' ? {} : {max}),
    isError: !!meta.error,
  };
}
