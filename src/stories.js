/* eslint-env node */
// @flow

import * as React from 'react';
import {Button} from 'baseui/button';
import Input from './input/index';
import RadioGroup from './radio-group/index';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import {Field, Form} from 'react-final-form';

const Condition = ({when, is, children}) => (
  <Field name={when} subscription={{value: true}}>
    {({input: {value}}) => (value === is ? children : null)}
  </Field>
);

storiesOf('Playground').add('Basic', () => (
  // Target: City and Zipcode options (radio group)
  // Input: CityName
  // Input: ZipCode
  <Form
    initialValues={{target: 'city'}}
    onSubmit={action('submit')}
    subscription={{submitting: true, pristine: true}}
    render={({handleSubmit, pristine, invalid}) => (
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: '8px',
          }}
        >
          <div style={{position: 'relative'}}>
            <Field name="firstName" label="First name" component={Input} />
          </div>
          <div style={{position: 'relative'}}>
            <Field name="lastName" label="Last name" component={Input} />
          </div>
        </div>
        <Field
          name="target"
          component={RadioGroup}
          caption="Pick a target"
          label="Target"
          options={[
            {label: 'City', value: 'city'},
            {label: 'Zip Code', value: 'zipCode'},
          ]}
        />
        <Condition when="target" is="zipCode">
          <Field
            name="zipCode"
            component={Input}
            caption="Enter your zip code"
            label="Zip code"
          />
        </Condition>
        <Condition when="target" is="city">
          <Field
            name="city"
            component={Input}
            caption="Enter your city"
            label="City"
          />
        </Condition>
        <Button type="submit" disabled={pristine || invalid}>
          Submit
        </Button>
      </form>
    )}
  />
));
