/* eslint-env node */
// @flow

import * as React from 'react';
import {Button} from 'baseui/button';
import {Datepicker, formatDate} from 'baseui/datepicker';
import {Field, Form} from 'react-final-form';
import {FormControl} from 'baseui/form-control';
import {action} from '@storybook/addon-actions';
import {adaptToFormControl} from '../form-control';
import {adaptToRangeDatepicker, adaptToSingleDatepicker} from './adapters';
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';
import Readme from './README.md';

function formatDateAtIndex(dates: ?Date | ?Array<Date>, index: number) {
  if (!dates || !Array.isArray(dates)) return '';
  const date = dates[index];
  if (!date) return '';
  return formatDate(date, 'yyyy/MM/dd');
}

storiesOf('Datepicker', module)
  .addDecorator(withReadme(Readme))
  .add('Single', () => (
    <Form
      onSubmit={action('submit')}
      initialValues={{birthday: '2018-02-20'}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="birthday"
            transformTo={val => new Date(val)}
            transformFrom={val => val.toISOString()}
            render={props => <Datepicker {...adaptToSingleDatepicker(props)} />}
            onChange={action('birthday changed')}
          />
          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ))
  .add('Range', () => (
    <Form
      onSubmit={action('submit')}
      initialValues={{vacation: ['2018-02-20', '2018-03-24']}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="vacation"
            transformTo={val => new Date(val)}
            transformFrom={val => val.toISOString()}
            render={props => <Datepicker {...adaptToRangeDatepicker(props)} />}
            onChange={action('vacation changed')}
          />
          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ))
  .add('Composed range pickers (half-completed)', () => (
    <Form
      onSubmit={action('submit')}
      initialValues={{vacation: ['2018-02-20', '2018-03-24']}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="vacation"
            label="Start Date"
            caption="YYYY/MM/DD"
            transformTo={val => new Date(val)}
            transformFrom={val => val.toISOString()}
            render={props => (
              <FormControl {...adaptToFormControl(props)}>
                <Datepicker
                  {...adaptToRangeDatepicker(props)}
                  formatDisplayValue={date => formatDateAtIndex(date, 0)}
                  timeSelectStart
                />
              </FormControl>
            )}
            onChange={action('vacation changed')}
          />
          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ));
