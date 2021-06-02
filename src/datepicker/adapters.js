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
  console.log(input.value, 2222);
  return {
    adapter: adapter || dateFnsAdapter,
    range: false,
    id: input.name,
    disabled,
    value: input.value,
    formatString,
    onChange: (props: onChangeParamsT) => {
      if (input.onChange) {
        console.log(props, 222);
        // This is how we detect the TimePicker
        if (props instanceof Date) {
          const hours = props.getHours();
          const minutes = props.getMinutes();
          const seconds = props.getSeconds();
          const newDate = new Date(
            input.value instanceof Date ? input.value : new Date()
          );
          console.log(newDate, 9999);
          newDate.setHours(hours);
          newDate.setMinutes(minutes);
          newDate.setSeconds(seconds);
          input.onChange(newDate);
        } else if (props.date instanceof Date) {
          // This is how we detect the DatePicker
          const date = props.date.getDate();
          const fullYear = props.date.getFullYear();
          const month = props.date.getMonth();
          const newDate = new Date(
            input.value instanceof Date ? input.value : new Date()
          );
          newDate.setDate(date);
          newDate.setFullYear(fullYear);
          newDate.setMonth(month);
          input.onChange(newDate);
        }
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
