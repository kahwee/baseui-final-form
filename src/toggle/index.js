// @flow
import * as React from 'react';
import {Checkbox} from 'baseui/checkbox';
import {type FieldRenderProps} from '../types.js';
import {FormControl} from 'baseui/form-control';
import {adaptToFormControl} from '../form-control';
import {adaptToToggle} from './adapters';

export default function render(props: FieldRenderProps) {
  return (
    <FormControl {...adaptToFormControl(props)} label={false}>
      <Checkbox {...adaptToToggle(props)} />
    </FormControl>
  );
}

export {render as AdaptedToggle, adaptToToggle};
