/* eslint-env node */
// @flow

import * as React from 'react';
import {Button} from 'baseui/button';
import Toggle from './index';
import {storiesOf} from '@storybook/react';
import withBaseui from '../with-baseui';
import {Field, Form} from 'react-final-form';

storiesOf('Toggle', module)
  .addDecorator(withBaseui)
  .add('Basic', () => (
    <Form
      onSubmit={() => {}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="enabled"
            component={Toggle}
            caption="enabled"
            label="enabled"
            type="checkbox"
          />

          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ));
