/* eslint-env node */
// @noflow

import * as React from 'react';
import {Button} from 'baseui/button';
import {Field, Form} from 'react-final-form';
import {action} from '@storybook/addon-actions';
import CreatableSelect from 'react-select/creatable';
import Select from './index';
import makeAnimated from 'react-select/animated';
import options from '../native-select/__tests__/__fixtures__/fruit-options.json';

export default {
  title: 'react-select',
};

export const Single = () => (
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
);

export const Multiple = () => (
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
);

export const Animated = () => (
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
);

export const _CreatableSelect = () => (
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
);

_CreatableSelect.story = {
  name: 'CreatableSelect',
};
