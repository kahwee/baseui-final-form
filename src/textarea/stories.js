/* eslint-env node */
// @flow

import * as React from 'react';
import {Button} from 'baseui/button';
import Textarea from './index';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import {Field, Form} from 'react-final-form';

storiesOf('Textarea').add('Basic', () => (
  <Form
    validateOnBlur
    onSubmit={action('submit')}
    render={({handleSubmit, pristine, invalid}) => (
      <form onSubmit={handleSubmit}>
        <Field
          name="description"
          component={Textarea}
          caption="Give a brief description"
          label="Description"
        />

        <Button type="submit" disabled={pristine || invalid}>
          Submit
        </Button>
      </form>
    )}
  />
));
