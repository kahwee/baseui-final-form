// @flow
import * as React from 'react';
import {type FieldRenderProps} from '../types.js';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import {adaptToFormControl} from '../form-control/adapters';
import {adaptToInput} from './adapters';

type Props = {
  type: string,
} & FieldRenderProps;
export default function render(props: Props) {
  return (
    <FormControl {...adaptToFormControl(props)}>
      <Input {...adaptToInput(props)} />
    </FormControl>
  );
}
