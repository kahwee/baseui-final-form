/* eslint-env node */
// @flow

import * as React from 'react';
import {Form, Field} from 'react-final-form';
import {storiesOf} from '@storybook/react';
import withBaseui from '../with-baseui';
import {Button} from 'baseui/button';
import Select from './index';
import options from '../native-select/__tests__/__fixtures__/fruit-options.json';

storiesOf('Select', module)
  .addDecorator(withBaseui)
  .add('Basic', () => (
    <Form
      onSubmit={() => {}}
      initialValues={{fruits: '2'}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
          <Field
            name="fruits"
            component={Select}
            caption="Please select a fruit"
            label="My fruits"
            options={options}
            type="select-multiple"
          />
        </form>
      )}
    />
  ));
