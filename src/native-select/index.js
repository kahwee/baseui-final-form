// @flow
import * as React from 'react';
import {type MultipleValuesFieldRenderProps} from '../types.js.flow';
import {FormControl} from 'baseui/form-control';

export default function renderInput({
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
            <option id={option.value} {...option} key={index}>
              {option.label}
            </option>
          );
        })}
      </select>
    </FormControl>
  );
}
