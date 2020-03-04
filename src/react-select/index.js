// @noflow
import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {adaptToFormControl} from '../form-control';
import Select from 'react-select';
import assignProps from '../util/assign-props';
import type {FieldRenderProps, ReactSelectOption} from '../types.js';

type Props = {
  isMulti?: boolean,
  RootSelect?: React.StatelessFunctionalComponent<any>,
} & FieldRenderProps;
export default function render({
  // $FlowFixMe
  RootSelect = Select,
  isMulti,
  ...props
}: Props) {
  const {inputProps, options, value, onChange} = assignProps(
    ((props: any): FieldRenderProps)
  );
  if (!Array.isArray(options)) {
    throw new Error('Missing options');
  }
  // We are adapting to react-select's value/label pair
  const adaptedOptions: ReactSelectOption[] = options.map(({id, ...rest}) => ({
    ...rest,
    value: id,
  }));

  let selectedOptions;
  if (isMulti) {
    selectedOptions = value.map(singleValue => {
      const selectedOption = adaptedOptions.find(
        option => option.value === singleValue
      );
      return selectedOption
        ? selectedOption
        : {
            value: singleValue,
            label: singleValue,
            __isNew__: true,
          };
    });
  } else {
    selectedOptions = adaptedOptions.filter(option => option.value === value);
  }
  return (
    <FormControl
      {...adaptToFormControl({
        ...props,
        formControlProps: {
          overrides: {
            ControlContainer: {
              style: ({$theme}) => ({
                fontFamily: $theme.typography.font400.fontFamily,
              }),
            },
          },
        },
      })}
    >
      <RootSelect
        {...inputProps}
        isMulti={isMulti}
        value={selectedOptions}
        onChange={selectedOptions => {
          if (isMulti) {
            onChange(
              Array.isArray(selectedOptions)
                ? selectedOptions.map(option => option.value)
                : undefined
            );
          } else {
            onChange(selectedOptions ? selectedOptions.value : undefined);
          }
        }}
        options={adaptedOptions}
      />
    </FormControl>
  );
}

export {render as AdaptedReactSelect};
