// @flow
import * as React from 'react';
import {Checkbox} from 'baseui/checkbox';
import {type FieldRenderProps} from '../types.js';
import {FormControl} from 'baseui/form-control';
import {adaptToFormControl} from '../form-control';
import assignProps from '../util/assign-props';

export default function render(props: FieldRenderProps) {
  const {inputProps, meta, label, onChange, value} = assignProps(props);
  inputProps.type = 'checkbox';
  return (
    <FormControl {...adaptToFormControl(props)} label={false}>
      <Checkbox
        {...inputProps}
        isError={!!meta.error}
        checked={!!value}
        onChange={ev => {
          onChange(ev.target.checked);
        }}
      >
        {label}
      </Checkbox>
    </FormControl>
  );
}
