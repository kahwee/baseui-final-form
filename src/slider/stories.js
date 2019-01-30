/* eslint-env node */
// @flow

import * as React from 'react';
import {Button} from 'baseui/button';
import Readme from './README.md';
import Slider from './index';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';
import {Field, Form} from 'react-final-form';

storiesOf('Slider', module)
  .addDecorator(withReadme(Readme))
  .add('Single point', () => (
    <Form
      onSubmit={action('submit')}
      initialValues={{age: [38]}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field name="age" component={Slider} range={[18, 120]} label="Age" />

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
            range={[0, 1000]}
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
