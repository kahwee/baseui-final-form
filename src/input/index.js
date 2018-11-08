// @flow
import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import {type SingleValueFieldRenderProps} from '../types.js.flow';

type Props = {
  type: string,
} & SingleValueFieldRenderProps;
export default function render({
  input,
  inputProps,
  type,
  meta,
  caption,
  label,
}: Props) {
  return (
    <FormControl
      label={label}
      labelFor={input.name}
      caption={caption}
      error={meta.error}
    >
      <Input
        {...inputProps}
        {...input}
        type={type}
        id={input.name}
        error={meta.error}
      />
    </FormControl>
  );
}
