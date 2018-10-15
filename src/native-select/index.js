// @flow
import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {type MultipleValuesFieldRenderProps} from '../types.js.flow';

export default function render({
  input,
  meta,
  caption,
  label,
  options,
}: MultipleValuesFieldRenderProps) {
  return (
    <FormControl label={label} caption={caption} error={meta.error}>
      <select {...input}>
        {options.map((option, index) => {
          return (
            <option {...option} value={option.id} key={index}>
              {option.label}
            </option>
          );
        })}
      </select>
    </FormControl>
  );
}
