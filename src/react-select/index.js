// @flow
import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import Select from 'react-select';
import {type isMultiValuesFieldRenderProps} from '../types.js.flow';

type Props = {
  isMulti?: boolean,
} & isMultiValuesFieldRenderProps;
export default function render({
  RootSelect = Select,
  input,
  inputProps,
  meta,
  caption,
  isMulti,
  label,
  options,
}: Props) {
  const {value, onChange, ...inputRest} = input;
  // We are adapting to react-select's value/label pair
  const adaptedOptions = options.map(({id, ...rest}) => ({
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
      label={label}
      caption={caption}
      error={meta.error}
      overrides={{
        ControlContainer: {
          style: ({$theme}) => ({
            fontFamily: $theme.typography.font400.fontFamily,
          }),
        },
      }}
    >
      <RootSelect
        {...inputRest}
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
