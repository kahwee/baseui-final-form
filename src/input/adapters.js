// @flow
import {type FieldRenderProps as ReactFinalFormFieldRenderProps} from 'react-final-form';
import type {FieldRenderPropsMeta} from '../types';

type AdaptToInputProps = {
  meta: FieldRenderPropsMeta,
  onChange: (SyntheticInputEvent<*> | any) => void,
  inputProps?: *,
} & ReactFinalFormFieldRenderProps;

export function adaptToInput({
  meta,
  onChange,
  input,
  // In case user wants to add additional parameters, including overrides.
  inputProps = {},
}: AdaptToInputProps) {
  return {
    ...inputProps,
    ...input,
    onChange: (args: *) => {
      if (input.onChange) {
        input.onChange(args);
      }
    },
    id: input.name,
    error: meta.error && meta.touched,
    overrides: {
      ...(inputProps.overrides ? inputProps.overrides : {}),
    },
  };
}
