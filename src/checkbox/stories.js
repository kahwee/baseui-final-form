/* eslint-env node */
// @flow

import * as React from 'react';
import {Button} from 'baseui/button';
import Checkbox from './index';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import {Field, Form} from 'react-final-form';

storiesOf('Checkbox', module).add('Basic', () => (
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
