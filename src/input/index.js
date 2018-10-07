// @flow
import * as React from 'react';
import {type FieldRenderProps} from 'react-final-form';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';

export type Props = {
  caption: string | React.Node,
  label: string | React.Node,
} & FieldRenderProps;

export default function renderInput({input, meta, caption}: Props) {
  // console.log(input, meta, caption);
  return (
    <FormControl
      label="Input label"
      caption={caption}
      error="String type error"
    >
      <Input id="test" error {...input} />
    </FormControl>
  );
}
