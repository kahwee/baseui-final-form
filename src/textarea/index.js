// @flow
import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {type SingleValueFieldRenderProps} from '../types.js.flow';
import {Textarea} from 'baseui/textarea';

export default function render({
  input,
  meta,
  caption,
  label,
}: SingleValueFieldRenderProps) {
  return (
    <FormControl label={label} caption={caption} error={meta.error}>
      <Textarea {...input} error={meta.error} />
    </FormControl>
  );
}
