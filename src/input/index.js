// @flow
import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import {type SingleValueFieldRenderProps} from '../types.js.flow';

export default function render({
  input,
  inputProps,
  meta,
  caption,
  label,
}: SingleValueFieldRenderProps) {
  return (
    <FormControl
      label={label}
      labelFor={input.name}
      caption={caption}
      error={meta.error}
    >
      <Input {...inputProps} {...input} id={input.name} error={meta.error} />
    </FormControl>
  );
}
