// @flow
import * as React from 'react';
import {type SingleValueFieldRenderProps} from '../types.js.flow';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';

export default function renderInput({
  input,
  meta,
  caption,
  label,
}: SingleValueFieldRenderProps) {
  // console.log(input, meta, caption);
  return (
    <FormControl label={label} caption={caption} error={meta.error}>
      <Input id="test" error={meta.error} {...input} />
    </FormControl>
  );
}
