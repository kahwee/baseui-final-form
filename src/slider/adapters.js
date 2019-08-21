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
    min,
    max,
    isError: !!meta.error,
  };
}
