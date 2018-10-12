/* eslint-env node */
// @flow

import * as React from 'react';
import {Form, Field} from 'react-final-form';
import {storiesOf} from '@storybook/react';
import withBaseui from '../with-baseui';
import {Button} from 'baseui/button';
import NativeSelect from './index';

storiesOf('Native select', module)
  .addDecorator(withBaseui)
  .add('Basic', () => (
    <Form
      onSubmit={() => {}}
      initialValues={{fruit: 'peach'}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="fruit"
            component={NativeSelect}
            caption="Please select a fruit"
            label="My fruits"
            options={[
              {id: 'pineapple', label: 'Pineapple'},
              {id: 'peach', label: 'Peach'},
              {id: 'apple', label: 'Apple', disabled: true},
            ]}
          />

          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ));
