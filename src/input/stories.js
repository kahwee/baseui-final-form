/* eslint-env node */
// @flow

import * as React from 'react';
import {Form, Field} from 'react-final-form';
import {storiesOf} from '@storybook/react';
import withBaseui from '../with-baseui';
import {Button} from 'baseui/button';
import Input from './index';

storiesOf('Input', module)
  .addDecorator(withBaseui)
  .add('Basic', () => (
    <Form
      onSubmit={() => {}}
      validate={() => {}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="interests"
            component={Input}
            caption="Hello"
            label="hello world!"
          />

          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ));
