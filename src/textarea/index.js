// @flow
import * as React from 'react';
import {type FieldRenderProps} from 'react-final-form';
import {FormControl} from 'baseui/form-control';
import {Textarea} from 'baseui/textarea';

export type Props = {
  caption: string | React.Node,
  label: string | React.Node,
} & FieldRenderProps;

export default function renderInput({input, meta, caption, label}: Props) {
  console.log(input, meta, caption);
  return (
    <FormControl label={label} caption={caption} error="String type error">
      <Textarea id="test" error {...input} />
    </FormControl>
  );
}
