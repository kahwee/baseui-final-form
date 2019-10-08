// @flow
import * as React from 'react';
import {type FieldRenderProps} from '../types.js';
import {FormControl} from 'baseui/form-control/index';
import {adaptToFormControl} from '../form-control';
import assignProps from '../util/assign-props';

export default function render(props: FieldRenderProps) {
  const {inputProps, options} = assignProps(props);
  if (!Array.isArray(options)) {
    throw new Error('Missing options');
  }
  return (
    <FormControl {...adaptToFormControl(props)}>
      <select {...inputProps}>
        {options.map((option, index) => {
          return (
            <option {...option} value={option.id} key={index}>
              {option.label}
            </option>
          );
        })}
      </select>
    </FormControl>
  );
}

export {render as AdaptedNativeSelect};
