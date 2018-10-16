// @flow
import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import {type SingleValueFieldRenderProps} from '../types.js.flow';

export default function render({
  input,
  meta,
  caption,
  label,
}: SingleValueFieldRenderProps) {
  return (
    <FormControl label={label} caption={caption} error={meta.error}>
      <Input {...input} error={meta.error} />
    </FormControl>
  );
}
