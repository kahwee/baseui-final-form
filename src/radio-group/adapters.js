// @flow
import {type FieldRenderProps} from 'react-final-form';
import type {FieldRenderPropsMeta} from '../types';

type AdaptToMultiSelectProps = {
  meta: FieldRenderPropsMeta,
} & FieldRenderProps;
export function adaptToRadioGroup(props: {}) {
  const {meta, input} = ((props: any): AdaptToMultiSelectProps);
  return {
    id: input.name,
    value: input.value,
    onChange: (ev: SyntheticInputEvent<HTMLInputElement>) => {
      if (input.onChange) {
        input.onChange(ev.target.value);
      }
    },
    isError: meta.error && meta.touched,
  };
}
