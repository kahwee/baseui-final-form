/* eslint-env node */
// @flow

import * as React from 'react';
import {Button} from 'baseui/button';
import {Field, Form} from 'react-final-form';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';
import Readme from './README.md';
import Slider from './index';

storiesOf('Slider', module)
  .addDecorator(withReadme(Readme))
  .add('Single point', () => (
    <Form
      onSubmit={action('submit')}
      initialValues={{age: [38]}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field name="age" component={Slider} min={18} max={120} label="Age" />

          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ))
  .add('Range thumbs', () => (
    <Form
      onSubmit={action('submit')}
      initialValues={{sqft: [450, 800]}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="sqft"
            component={Slider}
            min={0}
            max={1000}
            caption="Choose the area of your apartment in sq ft"
            label="Apartment size"
          />

          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ));
