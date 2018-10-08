// @flow
import * as React from 'react';
import {type MultipleValuesFieldRenderProps} from '../types.js.flow';
import {FormControl} from 'baseui/form-control';
import {Select} from 'baseui/select';

export default function render({
  input,
  meta,
  caption,
  label,
  options,
}: MultipleValuesFieldRenderProps) {
  return (
    <FormControl label={label} caption={caption} error={meta.error}>
      <Select {...input} options={options} />
    </FormControl>
  );
}
