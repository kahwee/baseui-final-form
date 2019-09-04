// @flow
import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {Radio, RadioGroup} from 'baseui/radio';
import {adaptToFormControl} from '../form-control';
import {adaptToRadioGroup} from './adapters';
import type {OptionT} from './types.js';

type Props = {
  options: Array<OptionT>,
};
export default function render(props: Props) {
  return (
    <FormControl {...adaptToFormControl(props)}>
      <RadioGroup {...adaptToRadioGroup(props)}>
        {props.options.map((option, index) => {
          return (
            <Radio value={option.id} {...option} key={index}>
              {option.label}
            </Radio>
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}

export {adaptToRadioGroup, render as AdaptedRadioGroup};
