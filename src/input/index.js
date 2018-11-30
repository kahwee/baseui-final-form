// @flow
import * as React from 'react';
import {type FieldRenderProps} from '../types.js.flow';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import assignProps from '../util/assign-props';

type Props = {
  type: string,
} & FieldRenderProps;
export default function render(props: Props) {
  const {formControlProps, inputProps, label} = assignProps(props);
  return (
    <FormControl {...formControlProps} label={label}>
      <Input {...inputProps} />
    </FormControl>
  );
}
