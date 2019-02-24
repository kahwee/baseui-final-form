// @flow
import * as React from 'react';
import {type FieldRenderProps} from '../types.js.flow';
import {FormControl} from 'baseui/form-control';
import assignProps from '../util/assign-props';
import {Radio, RadioGroup} from 'baseui/radio';

export default function render(props: FieldRenderProps) {
  const {formControlProps, inputProps, options, onChange} = assignProps(props);
  if (!Array.isArray(options)) {
    throw new Error('Missing options');
  }
  return (
    <FormControl {...formControlProps}>
      <RadioGroup
        {...inputProps}
        onChange={(ev, item) => {
          onChange(ev.target.value);
        }}
      >
        {options.map((option, index) => {
          return (
            <Radio value={option.id} {...option} key={index}>
              {option.label}
            </Radio>
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
