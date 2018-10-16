/* eslint-env node */
// @flow

import * as React from 'react';
import {Button} from 'baseui/button';
import RadioGroup from './index';
import {action} from '@storybook/addon-actions';
import options from '../native-select/__tests__/__fixtures__/fruit-options.json';
import {storiesOf} from '@storybook/react';
import {Field, Form} from 'react-final-form';

storiesOf('RadioGroup', module).add('Basic', () => (
  <Form
    onSubmit={action('submit')}
    initialValues={{fruit: 'apple'}}
    render={({handleSubmit, pristine, invalid}) => (
      <form onSubmit={handleSubmit}>
        <Field
          name="fruit"
          component={RadioGroup}
          caption="Please select a fruit"
          label="My favorite fruit"
          options={options}
        />

        <Button type="submit" disabled={pristine || invalid}>
          Submit
        </Button>
      </form>
    )}
  />
));
