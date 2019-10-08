// @flow
import * as React from 'react';
import {type FieldRenderProps} from '../types.js';
import {FormControl} from 'baseui/form-control/index';
import {Textarea} from 'baseui/textarea/index';
import {adaptToFormControl} from '../form-control';
import {adaptToTextarea} from './adapters';

/**
 * textarea is incredibly similar to input, check out input/adapters for
 * more information
 */
export default function render(props: FieldRenderProps) {
  return (
    <FormControl {...adaptToFormControl(props)}>
      <Textarea {...adaptToTextarea(props)} />
    </FormControl>
  );
}

export {render as AdaptedTextarea, adaptToTextarea};
