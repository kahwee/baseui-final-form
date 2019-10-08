// @flow
import * as React from 'react';
import {FormControl} from 'baseui/form-control/index';
import {Select} from 'baseui/select/index';
import {adaptToFormControl} from '../form-control';
import {adaptToMultiSelect, adaptToSingleSelect} from './adapters';

type Props = {
  multi: boolean,
};
export default function render(props: Props) {
  return (
    <FormControl {...adaptToFormControl(props)}>
      {props.multi ? (
        <Select {...adaptToMultiSelect(props)} />
      ) : (
        <Select {...adaptToSingleSelect(props)} />
      )}
    </FormControl>
  );
}
export {adaptToMultiSelect, adaptToSingleSelect, render as AdaptedSelect};
