// @flow
import * as React from 'react';
import {type SingleValueFieldRenderProps} from '../types.js.flow';
import {FormControl} from 'baseui/form-control';
import {Textarea} from 'baseui/textarea';

export default function render({
  input,
  meta,
  caption,
  label,
}: SingleValueFieldRenderProps) {
  return (
    <FormControl label={label} caption={caption} error={meta.error}>
      <Textarea id="test" {...input} error={meta.error} />
    </FormControl>
  );
}
