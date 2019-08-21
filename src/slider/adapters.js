// @flow
import {type FieldRenderProps} from 'react-final-form';
import type {FieldRenderPropsMeta} from '../types';

type AdaptToMultiSelectProps = {
  meta: FieldRenderPropsMeta,
} & FieldRenderProps;
export function adaptToSlider(props: {}) {
  const {meta, input, min, max} = ((props: any): AdaptToMultiSelectProps);
  const transformedValue = input.value || [min, max] || [];
  return {
    id: input.name,
    value: transformedValue,
    onChange: ({value}) => {
      input.onChange(value);
    },
    ...(typeof min === 'undefined' ? {} : {min}),
    ...(typeof max === 'undefined' ? {} : {max}),
    isError: !!meta.error,
  };
}
