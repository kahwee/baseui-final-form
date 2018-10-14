/* eslint-env node */
// @flow

import * as React from 'react';
import {Form, Field} from 'react-final-form';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import {Button} from 'baseui/button';
import withBaseui from '../with-baseui';
import RadioGroup from './index';
import options from '../native-select/__tests__/__fixtures__/fruit-options.json';

storiesOf('RadioGroup', module)
  .addDecorator(withBaseui)
  .add('Basic', () => (
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
