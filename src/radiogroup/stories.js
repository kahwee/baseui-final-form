/* eslint-env node */
// @flow

import * as React from 'react';
import {Form, Field} from 'react-final-form';
import {storiesOf} from '@storybook/react';
import withBaseui from '../with-baseui';
import {Button} from 'baseui/button';
import RadioGroup from './index';

storiesOf('RadioGroup', module)
  .addDecorator(withBaseui)
  .add('Basic', () => (
    <Form
      onSubmit={() => {}}
      initialValues={{fruits: '2'}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="fruits"
            component={RadioGroup}
            caption="Please select a fruit"
            label="My fruits"
            options={[
              {value: '1', label: 'Pineapple'},
              {value: '2', label: 'Peach'},
              {value: '3', label: 'Apple', disabled: true},
            ]}
            type="select-multiple"
          />

          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ));
