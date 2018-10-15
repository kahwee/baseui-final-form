/* eslint-env node */
// @flow

import * as React from 'react';
import {Button} from 'baseui/button';
import Textarea from './index';
import {storiesOf} from '@storybook/react';
import withBaseui from '../with-baseui';
import {Field, Form} from 'react-final-form';

storiesOf('Textarea', module)
  .addDecorator(withBaseui)
  .add('Basic', () => (
    <Form
      validateOnBlur
      onSubmit={() => {}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="description"
            component={Textarea}
            caption="Description"
            label="Description"
          />

          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ));
