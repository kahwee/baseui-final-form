// @flow
import * as React from 'react';
import {Button} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group';
import type {ButtonGroupProps} from './types';
import {type FieldRenderProps} from '../types.js';
import {FormControl} from 'baseui/form-control';
import assignProps from '../util/assign-props';

export default function render({
  mode = 'radio',
  $size = 'default',
  ...props
}: ButtonGroupProps) {
  const {formControlProps, inputProps, options, onChange, name} = assignProps(
    ((props: any): FieldRenderProps)
  );
  if (!Array.isArray(options)) {
    throw new Error('Missing options');
  }
  const checkboxValues = mode === 'checkbox' ? inputProps.value || [] : [];
  const radioValue = mode === 'radio' ? inputProps.value : '';
  return (
    <FormControl {...formControlProps}>
      <ButtonGroup
        selected={
          mode === 'radio'
            ? options.indexOf(options.find(option => option.id === radioValue))
            : checkboxValues.map(val =>
                options.indexOf(options.find(option => option.id === val))
              )
        }
        mode={mode}
        onClick={(event, index) => {
          if (mode === 'radio') {
            onChange(options[index].id);
          } else if (mode === 'checkbox') {
            const clickedOption = options[index];
            if (checkboxValues.indexOf(clickedOption.id) === -1) {
              // If it doesn't exist, add it to values.
              onChange([...checkboxValues, clickedOption.id]);
            } else {
              // If it does, remove it to values.
              onChange(checkboxValues.filter(val => val !== clickedOption.id));
            }
          }
        }}
      >
        {options.map((option, index) => {
          return (
            <Button
              $size={$size}
              name={`${name}.${option.id}`}
              {...option}
              key={index}
            >
              {option.label}
            </Button>
          );
        })}
      </ButtonGroup>
    </FormControl>
  );
}
