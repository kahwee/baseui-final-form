/* eslint-env node */
// @flow

import * as React from 'react';
import {Form, Field} from 'react-final-form';
import {storiesOf} from '@storybook/react';
import withBaseui from './with-baseui';
import {Button} from 'baseui/button';
import RadioGroup from './radiogroup/index';
import Input from './input/index';

const Condition = ({when, is, children}) => (
  <Field name={when} subscription={{value: true}}>
    {({input: {value}}) => (value === is ? children : null)}
  </Field>
);

storiesOf('Playground', module)
  .addDecorator(withBaseui)
  .add('Basic', () => (
    // Target: City and Zipcode options (radio group)
    // Input: CityName
    // Input: ZipCode
    <Form
      initialValues={{target: 'city'}}
      onSubmit={() => {}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="target"
            component={RadioGroup}
            caption="Pick a target"
            label="Target"
            options={[
              {label: 'City', value: 'city'},
              {label: 'Zip Code', value: 'zipcode'},
            ]}
            type="select-multiple"
          />
          <Condition when="target" is="zipcode">
            <Field
              name="zipcode"
              component={Input}
              caption="Enter your zipcode"
              label="ZipCode"
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
