// @flow
import {type FieldRenderProps as ReactFinalFormFieldRenderProps} from 'react-final-form';
import type {FieldRenderPropsMeta} from '../types';
import type {PropsT} from 'baseui/checkbox';

type AdaptToCheckboxProps = {
  meta: FieldRenderPropsMeta,
  disabled?: boolean,
  label?: string,
  onChange: (SyntheticInputEvent<*> | any) => void,
} & ReactFinalFormFieldRenderProps;
export function adaptToCheckbox(props: ReactFinalFormFieldRenderProps): PropsT {
  const {
    meta,
    label,
    onChange,
    input,
    ...restProps
  } = ((props: any): AdaptToCheckboxProps);
  return {
    ...input,
    ...restProps,
    isError: !!meta.error,
    checked: !!input.value,
    children: label,
    onChange: ev => {
      input.onChange(ev.target.checked);
    },
  };
}
