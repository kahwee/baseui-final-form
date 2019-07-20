// @flow
import * as React from 'react';
import {type FieldRenderProps} from '../types.js';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import {adaptToFormControl} from '../form-control/adaptors';
import assignProps from '../util/assign-props';

type Props = {
  type: string,
} & FieldRenderProps;
export default function render(props: Props) {
  const {inputProps} = assignProps(props);
  return (
    <FormControl {...adaptToFormControl(props)}>
      <Input {...inputProps} />
    </FormControl>
  );
}
