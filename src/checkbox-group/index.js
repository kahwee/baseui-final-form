// @flow
import * as React from 'react';
import {Checkbox} from 'baseui/checkbox';
import {type FieldRenderProps} from '../types.js';
import {FormControl} from 'baseui/form-control';
import assignProps from '../util/assign-props';

export default function render(props: FieldRenderProps) {
  const {formControlProps, inputProps, options, onChange, name} = assignProps(
    props
  );
  if (!Array.isArray(options)) {
    throw new Error('Missing options');
  }
  const value = ((inputProps.value: any): Array<string>);
  return (
    <FormControl {...formControlProps}>
      <div>
        {options.map((option, index) => {
          return (
            <Checkbox
              checked={value.includes(option.id)}
              name={`${name}.${option.id}`}
              {...option}
              key={index}
              onChange={ev => {
                let newValue;
                if (ev.target.checked) {
                  newValue = [...value, option.id];
                } else {
                  newValue = value.filter(val => val !== option.id);
                }
                onChange(newValue);
              }}
            >
              {option.label}
            </Checkbox>
          );
        })}
      </div>
    </FormControl>
  );
}
