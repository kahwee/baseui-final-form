// @flow
import * as React from 'react';
import {type FieldRenderProps} from '../types.js';
import {FormControl} from 'baseui/form-control';
import {Textarea} from 'baseui/textarea';
import {adaptToFormControl} from '../form-control/adaptors';
import assignProps from '../util/assign-props';

export default function render(props: FieldRenderProps) {
  const {inputProps} = assignProps(props);
  return (
    <FormControl {...adaptToFormControl(props)}>
      <Textarea {...inputProps} />
    </FormControl>
  );
}
