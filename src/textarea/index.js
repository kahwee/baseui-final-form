// @flow
import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {type SingleValueFieldRenderProps} from '../types.js.flow';
import {Textarea} from 'baseui/textarea';

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
      <Textarea {...inputProps} {...input} id={input.name} error={meta.error} />
    </FormControl>
  );
}
