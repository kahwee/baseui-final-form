// @flow
import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {type MultipleValuesFieldRenderProps} from '../types.js.flow';

export default function render({
  input,
  inputProps,
  meta,
  caption,
  label,
  options,
}: MultipleValuesFieldRenderProps) {
  return (
    <FormControl
      label={label}
      labelFor={input.name}
      caption={caption}
      error={meta.error}
    >
      <select {...inputProps} {...input} id={input.name}>
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
