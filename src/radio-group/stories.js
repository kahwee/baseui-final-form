/* eslint-env node */
// @flow

import * as React from 'react';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';
import {Field, Form} from 'react-final-form';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import RadioGroup from './index';
import options from '../native-select/__tests__/__fixtures__/fruit-options.json';

storiesOf('RadioGroup', module)
  .add('Basic', () => (
    <Form
      onSubmit={action('submit')}
      initialValues={{fruit: 'apple'}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="fruit"
            component={RadioGroup}
            caption="Please select a fruit"
            label="My favorite fruit"
            options={options}
          />

          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ))
  .add('Overriding RadioGroup', () => (
    <Form
      onSubmit={action('submit')}
      initialValues={{fruit: 'apple'}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="fruit"
            component={RadioGroup}
            caption="Please select a fruit"
            label="My favorite fruit"
            options={options}
            overrides={{
              // eslint-disable-next-line react/display-name
              Label: ({$value}) => (
                <Block font="font400">Custom label for value: {$value}</Block>
              ),
              RadioMark: {
                style: ({$theme}) => ({borderColor: $theme.colors.positive}),
              },
            }}
          />

          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ));
