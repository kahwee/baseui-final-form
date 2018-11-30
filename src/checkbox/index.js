// @flow
import * as React from 'react';
import {Checkbox} from 'baseui/checkbox';
import {type FieldRenderProps} from '../types.js.flow';
import {FormControl} from 'baseui/form-control';
import assignProps from '../util/assign-props';

export default function render(props: FieldRenderProps) {
  const {
    formControlProps,
    inputProps,
    meta,
    label,
    onChange,
    value,
  } = assignProps(props);
  inputProps.type = 'checkbox';
  return (
    <FormControl {...formControlProps} label={false}>
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
