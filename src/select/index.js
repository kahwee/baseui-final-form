// @flow
import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {type MultipleValuesFieldRenderProps} from '../types.js.flow';
import {Select} from 'baseui/select';

type Props = {
  multi?: boolean,
} & MultipleValuesFieldRenderProps;
export default function render({
  input,
  inputProps,
  meta,
  caption,
  multi,
  label,
  options,
}: Props) {
  const {value, onChange, ...inputRest} = input;
  let selectedOptions;
  if (multi) {
    selectedOptions = options.filter(option => value.includes(option.id));
  } else {
    selectedOptions = options.filter(option => option.id === value);
  }
  return (
    <FormControl label={label} caption={caption} error={meta.error}>
      <Select
        {...inputRest}
        {...inputProps}
        multi={multi}
        value={selectedOptions}
        onChange={({value}) => {
          if (multi) {
            onChange(
              Array.isArray(value) ? value.map(option => option.id) : undefined
            );
          } else {
            onChange(
              Array.isArray(value) && value[0] ? value[0].id : undefined
            );
          }
        }}
        options={options}
      />
    </FormControl>
  );
}
