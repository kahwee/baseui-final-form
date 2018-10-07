// @flow
import * as React from 'react';
import {type FieldRenderProps} from 'react-final-form';
import {FormControl} from 'baseui/form-control';
import {Checkbox} from 'baseui/checkbox';

export type Props = {
  caption: string | React.Node,
  label: string | React.Node,
} & FieldRenderProps;

export default function renderInput({input, meta, caption, label}: Props) {
  return (
    <FormControl label={label} caption={caption} error={meta.errror}>
      <Checkbox id="test" error {...input} />
    </FormControl>
  );
}
