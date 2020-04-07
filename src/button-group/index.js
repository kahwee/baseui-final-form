// @flow
import * as React from 'react';
import {Button} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group/index';
import {type FieldRenderProps} from '../types.js';
import {FormControl} from 'baseui/form-control';
import {adaptToFormControl} from '../form-control';
import assignProps from '../util/assign-props';
import type {ButtonGroupProps} from './types';

export default function render(props: ButtonGroupProps) {
  const mode = props.mode ? props.mode : 'radio';
  const $size = props.$size ? props.$size : 'default';
  const {inputProps, options, onChange, name} = assignProps(
    ((props: any): FieldRenderProps)
  );
  if (!Array.isArray(options)) {
    throw new Error('Missing options');
  }
  const checkboxValues = mode === 'checkbox' ? inputProps.value || [] : [];
  const radioValue = mode === 'radio' ? inputProps.value : '';
  return (
    <FormControl {...adaptToFormControl(props)}>
      <ButtonGroup
        selected={
          mode === 'radio'
            ? options.indexOf(
                options.find((option) => option.id === radioValue)
              )
            : checkboxValues.map((val) =>
                options.indexOf(options.find((option) => option.id === val))
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
              onChange(
                checkboxValues.filter((val) => val !== clickedOption.id)
              );
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

export {render as AdaptedButtonGroup};
