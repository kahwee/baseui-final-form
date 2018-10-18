// @flow
import * as React from 'react';
import {Checkbox} from 'baseui/checkbox';
import {FormControl} from 'baseui/form-control';
import {type MultipleValuesFieldRenderProps} from '../types.js.flow';

export default function render({
  input,
  meta,
  caption,
  label,
  options,
}: MultipleValuesFieldRenderProps) {
  const {onChange, name} = input;
  const value = ((input.value: any): Array<string>);
  return (
    <FormControl label={label} caption={caption} error={meta.error}>
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
