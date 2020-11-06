/* eslint-env node */
// @flow

import * as React from 'react';
import {Block} from 'baseui/block/index';
import {Button} from 'baseui/button';
import {Field, Form} from 'react-final-form';
import {action} from '@storybook/addon-actions';
import Toggle from './index';

export default {
  title: 'Toggle',
};

export const Basic = () => (
  <Form
    onSubmit={action('submit')}
    initialValues={{useSavedCreditCard: false}}
    render={({handleSubmit, pristine, invalid}) => (
      <form onSubmit={handleSubmit}>
        <Block width="300px">
          <Field
            name="useSavedCreditCard"
            component={Toggle}
            label="Use saved credit card"
          />

          <Button type="submit" disabled={invalid}>
            Submit
          </Button>
        </Block>
      </form>
    )}
  />
);
