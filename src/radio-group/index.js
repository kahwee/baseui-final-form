// @flow
import * as React from 'react';
import {type FieldRenderProps} from '../types.js.flow';
import {FormControl} from 'baseui/form-control';
import assignProps from '../util/assign-props';
import {RadioGroup, StyledRadio} from 'baseui/radio';

export default function render(props: FieldRenderProps) {
  const {formControlProps, inputProps, options, onChange, label} = assignProps(
    props
  );
  if (!Array.isArray(options)) {
    throw new Error('Missing options');
  }
  return (
    <FormControl {...formControlProps} label={label}>
      <RadioGroup
        {...inputProps}
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
