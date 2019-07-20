// @flow
import * as React from 'react';
import {type FieldRenderProps} from '../types.js';
import {FormControl} from 'baseui/form-control';
import {Select} from 'baseui/select';
import {adaptToFormControl} from '../form-control/adapters';
import assignProps from '../util/assign-props';

type Props = {
  multi?: boolean,
} & FieldRenderProps;
export default function render(props: Props) {
  const multi = props.multi;
  const {inputProps, options, value, onChange} = assignProps(
    ((props: any): FieldRenderProps)
  );
  if (!Array.isArray(options)) {
    throw new Error('Missing options');
  }
  let selectedOptions;
  if (multi) {
    selectedOptions = options.filter(option => value.includes(option.id));
  } else {
    selectedOptions = options.filter(option => option.id === value);
  }
  return (
    <FormControl {...adaptToFormControl(props)}>
      <Select
        {...inputProps}
        multi={multi}
        value={selectedOptions}
        onChange={({value, option, type}) => {
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
