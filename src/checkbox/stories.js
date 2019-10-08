/* eslint-env node */
// @flow

import * as React from 'react';
import {AdaptedCheckbox, adaptToCheckbox} from './index';
import {Button} from 'baseui/button/index';
import {Checkbox} from 'baseui/checkbox/index';
import {Field, Form} from 'react-final-form';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';

storiesOf('Checkbox', module).add('Basic', () => (
  <Form
    onSubmit={action('submit')}
    render={({handleSubmit, pristine, invalid}) => (
      <form onSubmit={handleSubmit}>
        <Field
          name="isGoing"
          component={AdaptedCheckbox}
          caption="RSVP if you are going to our event"
          label="Yes, I'll join"
        />

        <Field name="labellessCheckbox" component={AdaptedCheckbox} />

        <Field
          name="adaptedCheckbox"
          label="Testing"
          render={props => {
            return <Checkbox {...adaptToCheckbox(props)} />;
          }}
        />

        <Button type="submit" disabled={pristine || invalid}>
          Submit
        </Button>
      </form>
    )}
  />
));
