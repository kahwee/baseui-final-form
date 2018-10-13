// @flow
import * as React from 'react';
import {type SingleValueFieldRenderProps} from '../types.js.flow';
import {FormControl} from 'baseui/form-control';
import {Checkbox} from 'baseui/checkbox';

export default function render({
  input,
  meta,
  caption,
  label,
}: SingleValueFieldRenderProps) {
  const {value, onChange, ...restInput} = input;
  return (
    <FormControl caption={caption} error={meta.error}>
      <Checkbox
        {...restInput}
        isError={!!meta.error}
        checked={!!value}
        type="checkbox"
        onChange={ev => {
          onChange(ev.target.checked);
        }}
      >
        {label}
      </Checkbox>
    </FormControl>
  );
}
