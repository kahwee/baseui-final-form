// @flow
import * as React from 'react';
import {Checkbox} from 'baseui/checkbox/index';
import {type FieldRenderProps} from '../types.js';
import {FormControl} from 'baseui/form-control/index';
import {adaptToCheckbox} from './adapters';
import {adaptToFormControl} from '../form-control';

export default function render(props: FieldRenderProps) {
  return (
    <FormControl {...adaptToFormControl(props)} label={false}>
      <Checkbox {...adaptToCheckbox(props)} />
    </FormControl>
  );
}
export {render as AdaptedCheckbox, adaptToCheckbox};
