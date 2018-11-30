/* eslint-env node */
// @flow

import * as React from 'react';
import {Button} from 'baseui/button';
import NativeSelect from './index';
import {action} from '@storybook/addon-actions';
import options from './__tests__/__fixtures__/fruit-options.json';
import {storiesOf} from '@storybook/react';
import {Field, Form} from 'react-final-form';

storiesOf('Native select').add('Basic', () => (
  <Form
    onSubmit={action('submit')}
    initialValues={{fruit: 'peach'}}
    render={({handleSubmit, pristine, invalid}) => (
      <form onSubmit={handleSubmit}>
        <Field
          name="fruit"
          component={NativeSelect}
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
));
