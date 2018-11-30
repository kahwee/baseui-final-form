// @flow

import * as React from 'react';
import {Button} from 'baseui/button';
import Select from './index';
import {action} from '@storybook/addon-actions';
import options from '../native-select/__tests__/__fixtures__/fruit-options.json';
import {storiesOf} from '@storybook/react';
import {Field, Form} from 'react-final-form';

storiesOf('Select')
  .add('Single', () => (
    <Form
      onSubmit={action('submit')}
      initialValues={{fruit: 'pineapple'}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="fruit"
            component={Select}
            caption="Please select a fruit"
            label="My fruits"
            options={options}
          />
          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ))
  .add('Multiple', () => (
    <Form
      onSubmit={action('submit')}
      initialValues={{fruits: ['pineapple', 'apple']}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="fruits"
            component={Select}
            caption="Please select multiple fruits"
            label="My fruits"
            options={options}
            multi
          />
          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ));
