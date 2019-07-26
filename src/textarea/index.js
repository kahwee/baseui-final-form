// @flow
import * as React from 'react';
import {type FieldRenderProps} from '../types.js';
import {FormControl} from 'baseui/form-control';
import {Textarea} from 'baseui/textarea';
import {adaptToFormControl} from '../form-control';
import {adaptToInput} from '../input/adapters';

/**
 * textarea is incredibly similar to input, check out input/adapters for
 * more information
 */
export default function render(props: FieldRenderProps) {
  return (
    <FormControl {...adaptToFormControl(props)}>
      <Textarea {...adaptToInput(props)} />
    </FormControl>
  );
}
