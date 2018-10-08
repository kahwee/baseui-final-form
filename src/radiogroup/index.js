// @flow
import * as React from 'react';
import {type FieldRenderProps} from 'react-final-form';
import {FormControl} from 'baseui/form-control';
import {StyledRadio, RadioGroup} from 'baseui/radio';

export type Option = {
  label: string,
  value: string,
  disabled?: boolean,
};
export type Props = {
  caption: string | React.Node,
  label: string | React.Node,
  options: Array<Option>,
} & FieldRenderProps;

export default function renderInput({
  input,
  meta,
  caption,
  label,
  options,
}: Props) {
  return (
    <FormControl label={label} caption={caption} error={meta.errror}>
      <RadioGroup {...input}>
        {options.map((option, index) => {
          return (
            <StyledRadio id={option.value} {...option} key={index}>
              {option.label}
            </StyledRadio>
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
