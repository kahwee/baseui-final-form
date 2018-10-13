/* eslint-env node */
// @flow

import * as React from 'react';
import {Form, Field} from 'react-final-form';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import withBaseui from '../with-baseui';
import {Button} from 'baseui/button';
import Checkbox from './index';

storiesOf('Checkbox', module)
  .addDecorator(withBaseui)
  .add('Basic', () => (
    <Form
      onSubmit={action('submit')}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="isGoing"
            component={Checkbox}
            caption="RSVP if you are going to our event"
            label="Yes, I'll join"
          />

          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ));
