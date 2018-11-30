/* eslint-env node */
// @flow

import * as React from 'react';
import {Button} from 'baseui/button';
import CreatableSelect from 'react-select/lib/Creatable';
import Select from './index';
import {action} from '@storybook/addon-actions';
import makeAnimated from 'react-select/lib/animated';
import options from '../native-select/__tests__/__fixtures__/fruit-options.json';
import {storiesOf} from '@storybook/react';
import {Field, Form} from 'react-final-form';

storiesOf('react-select', module)
  .add('Single', () => (
    <Form
      onSubmit={action('submit')}
      initialValues={{fruit: 'pineapple'}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="fruit"
            component={Select}
            caption="Please select a fruit"
            label="My fruits"
            options={options}
            help="Telling us your favorite fruit helps us understand you better"
          />
          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ))
  .add('Multiple', () => (
    <Form
      onSubmit={action('submit')}
      initialValues={{fruits: ['pineapple', 'apple']}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="fruits"
            component={Select}
            caption="Please select multiple fruits"
            label="My fruits"
            options={options}
            help="hello"
            isMulti
          />
          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ))
  .add('Animated', () => (
    <Form
      onSubmit={action('submit')}
      initialValues={{fruits: ['pineapple', 'apple']}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="fruits"
            component={Select}
            caption="Please select multiple fruits"
            label="My fruits"
            options={options}
            isMulti
            components={makeAnimated()}
          />
          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ))
  .add('CreatableSelect', () => (
    <Form
      onSubmit={action('submit')}
      initialValues={{fruits: ['pineapple', 'apple']}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            RootSelect={CreatableSelect}
            name="fruits"
            component={Select}
            caption="Please select multiple fruits"
            label="My fruits"
            options={options}
            isMulti
            components={makeAnimated()}
          />
          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ));
