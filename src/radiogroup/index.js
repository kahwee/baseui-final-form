// @flow
import * as React from 'react';
import {type MultipleValuesFieldRenderProps} from '../types.js.flow';
import {FormControl} from 'baseui/form-control';
import {StyledRadio, RadioGroup} from 'baseui/radio';

export default function render({
  input,
  meta,
  caption,
  label,
  options,
}: MultipleValuesFieldRenderProps) {
  const {onChange, value, ...restInput} = input;
  return (
    <FormControl label={label} caption={caption} error={meta.error}>
      <RadioGroup
        {...restInput}
        value={value}
        onChange={(ev, item) => {
          onChange(ev.target.value);
        }}
      >
        {options.map((option, index) => {
          return (
            <StyledRadio value={option.id} {...option} key={index}>
              {option.label}
            </StyledRadio>
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
