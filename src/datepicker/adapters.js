// @flow
import {type FieldRenderProps as ReactFinalFormFieldRenderProps} from 'react-final-form';
import dateFnsAdapter from 'baseui/datepicker/utils/date-fns-adapter';
import type {DatepickerPropsT} from 'baseui/datepicker';
import type {FieldRenderPropsMeta} from '../types';

export type onChangeParamsT = {date: ?Date | Array<Date>};

type AdaptToDatepickerProps = {
  disabled?: boolean,
  meta: FieldRenderPropsMeta,
  formatString: string,
  adapter: any,
} & ReactFinalFormFieldRenderProps;
export function adaptToSingleDatepicker(props: {}): DatepickerPropsT<> {
  const {adapter, meta, disabled, input, formatString} =
    ((props: any): AdaptToDatepickerProps);
  return {
    adapter: adapter || dateFnsAdapter,
    range: false,
    id: input.name,
    disabled,
    value: input.value,
    formatString,
    onChange: ({date}: onChangeParamsT) => {
      if (input.onChange) {
        input.onChange(date);
      }
    },
    error: meta.error && meta.touched,
  };
}

export function adaptToRangeDatepicker(props: {}): DatepickerPropsT<> {
  const {adapter, meta, disabled, input, formatString} =
    ((props: any): AdaptToDatepickerProps);
  return {
    adapter: adapter || dateFnsAdapter,
    range: true,
    id: input.name,
    disabled,
    formatString,
    value: Array.isArray(input.value) ? input.value : null,
    onChange: ({date}: onChangeParamsT) => {
      if (input.onChange && Array.isArray(date) && date.length > 0) {
        input.onChange(date);
      }
    },
    error: meta.error && meta.touched,
  };
}
