// @flow
import * as React from 'react';
import {type FieldRenderProps} from '../types.js.flow';
import {FormControl} from 'baseui/form-control';
import {Slider} from 'baseui/slider';
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
  const transformedValue = value || inputProps.range || [];
  return (
    <FormControl {...formControlProps}>
      <Slider
        {...inputProps}
        value={transformedValue}
        isError={!!meta.error}
        onChange={({value}) => {
          onChange(value);
        }}
      >
        {label}
      </Slider>
    </FormControl>
  );
}
