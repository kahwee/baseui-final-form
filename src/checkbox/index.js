// @flow
import * as React from 'react';
import {type SingleValueFieldRenderProps} from '../types.js.flow';
import {FormControl} from 'baseui/form-control';
import {Checkbox} from 'baseui/checkbox';

export default function renderInput({
  input,
  meta,
  caption,
  label,
}: SingleValueFieldRenderProps) {
  const {value, onChange, ...restInput} = input;
  return (
    <FormControl label={label} caption={caption} error={meta.error}>
      <Checkbox
        id="test"
        error
        {...restInput}
        checked={value}
        onChange={ev => {
          onChange(ev.target.checked);
        }}
      />
    </FormControl>
  );
}
