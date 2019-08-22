// @flow
import {type FieldRenderProps as ReactFinalFormFieldRenderProps} from 'react-final-form';
import type {FieldRenderPropsMeta} from '../types';

export type onChangeParamsT = {date: ?Date | Array<Date>};

type AdaptToDatepickerProps = {
  meta: FieldRenderPropsMeta,
  transformTo: (val: any) => ?Date | Array<Date>,
  transformFrom: (val: ?Date | Array<Date>) => any,
} & ReactFinalFormFieldRenderProps;
export function adaptToSingleDatepicker(props: AdaptToDatepickerProps) {
  const {
    meta,
    disabled,
    // $FlowFixMe
    transformTo = (val: any) => {
      return ((val: any): ?Date | Array<Date>);
    },
    // $FlowFixMe
    transformFrom = (val: any) => {
      return ((val: any): ?Date | Array<Date>);
    },
    input,
  } = props;
  return {
    range: false,
    id: input.name,
    disabled,
    value: transformTo(input.value),
    onChange: ({date}: onChangeParamsT) => {
      if (input.onChange) {
        input.onChange(transformFrom(date));
      }
    },
    error: meta.error && meta.touched,
  };
}

export function adaptToRangeDatepicker(props: AdaptToDatepickerProps) {
  const {
    meta,
    disabled,
    transformTo = val => val,
    transformFrom = val => val,
    input,
  } = props;
  console.log(input, 222);
  return {
    range: true,
    id: input.name,
    disabled,
    value: Array.isArray(input.value)
      ? input.value.map(d => transformTo(d))
      : null,
    onChange: ({date}: onChangeParamsT) => {
      if (input.onChange && Array.isArray(date) && date.length > 0) {
        const newDate = date.map(d => transformFrom(d));
        input.onChange(newDate);
      }
    },
    error: meta.error && meta.touched,
  };
}
