// @flow
import * as React from 'react';
import {type FieldRenderProps} from '../types.js';
import {FormControl} from 'baseui/form-control';
import {Slider} from 'baseui/slider';
import {adaptToFormControl} from '../form-control';
import assignProps from '../util/assign-props';

export default function render(props: FieldRenderProps) {
  const {inputProps, meta, label, onChange, value} = assignProps(props);
  const transformedValue = value || [inputProps.min, inputProps.max] || [];
  return (
    <FormControl {...adaptToFormControl(props)}>
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

export {render as AdaptedSlider};
