// @flow
import * as React from 'react';
import {type FieldRenderProps} from '../types.js';
import {FormControl} from 'baseui/form-control';
import {Slider} from 'baseui/slider';
import {adaptToFormControl} from '../form-control';
import {adaptToSlider} from './adapters';

export default function render(props: FieldRenderProps) {
  const {label} = props;
  return (
    <FormControl {...adaptToFormControl(props)}>
      <Slider {...adaptToSlider(props)}>{label}</Slider>
    </FormControl>
  );
}

export {adaptToSlider, render as AdaptedSlider};
