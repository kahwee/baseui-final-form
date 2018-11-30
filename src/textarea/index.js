// @flow
import * as React from 'react';
import {type FieldRenderProps} from '../types.js.flow';
import {FormControl} from 'baseui/form-control';
import {Textarea} from 'baseui/textarea';
import assignProps from '../util/assign-props';

export default function render(props: FieldRenderProps) {
  const {formControlProps, inputProps, label} = assignProps(props);
  return (
    <FormControl {...formControlProps} label={label}>
      <Textarea {...inputProps} />
    </FormControl>
  );
}
