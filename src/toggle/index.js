// @flow
import * as React from 'react';
import {Checkbox} from 'baseui/checkbox';
import {FormControl} from 'baseui/form-control';
import {type SingleValueFieldRenderProps} from '../types.js.flow';

export default function renderInput({
  input,
  meta,
  caption,
  label,
}: SingleValueFieldRenderProps) {
  return (
    <FormControl label={label} caption={caption} error={meta.error}>
      <Checkbox id="test" error {...input} checkmarkType="toggle" />
    </FormControl>
  );
}
