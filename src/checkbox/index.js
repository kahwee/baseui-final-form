// @flow
import * as React from 'react';
import {Checkbox} from 'baseui/checkbox';
import {FormControl} from 'baseui/form-control';
import {type SingleValueFieldRenderProps} from '../types.js.flow';

export default function render({
  input,
  meta,
  inputProps,
  caption,
  label,
}: SingleValueFieldRenderProps) {
  const {value, onChange, ...restInput} = input;
  if (inputProps) {
    inputProps.type = inputProps.type || 'checkbox';
  }
  return (
    <FormControl caption={caption} error={meta.error}>
      <Checkbox
        {...restInput}
        {...inputProps}
        isError={!!meta.error}
        checked={!!value}
        onChange={ev => {
          onChange(ev.target.checked);
        }}
      >
        {label}
      </Checkbox>
    </FormControl>
  );
}
