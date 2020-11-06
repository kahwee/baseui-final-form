/* eslint-env node */
// @flow

import * as React from 'react';
import {AdaptedInput, adaptToInput} from './index';
import {Button} from 'baseui/button';
import {Field, Form} from 'react-final-form';
import {FormControl} from 'baseui/form-control';
import {MaskedInput} from 'baseui/input';
import {StatefulTooltip} from 'baseui/tooltip';
import {action} from '@storybook/addon-actions';
import {adaptToFormControl} from '../form-control';
import {minLength, required} from '../validate';
import {storiesOf} from '@storybook/react';
import {styled} from 'baseui';

const minLength3 = minLength(3);

const FakeLink = styled<{}>('span', (props) => ({
  borderBottom: `1px dotted ${props.$theme.colors.primary500}`,
  color: props.$theme.colors.primary500,
}));

type AddressProps = {
  name: string,
  label: string,
};
export const Address = ({name, label}: AddressProps) => (
  <>
    <Field
      name={`${name}.street1`}
      component={AdaptedInput}
      label={`${label} Street 1`}
      onChange={action('street1 changed')}
    />
    <Field
      name={`${name}.street2`}
      component={AdaptedInput}
      label={`${label} Street 2`}
    />
    <Field
      name={`${name}.city`}
      component={AdaptedInput}
      label={`${label} city`}
    />
    <Field
      name={`${name}.zipCode`}
      component={AdaptedInput}
      label={`${label} zip code`}
      help="Giving us your zip code helps us customize content for your better"
    />
  </>
);

storiesOf('AdaptedInput', module)
  .add('Basic', () => (
    <Form
      onSubmit={action('submit')}
      initialValues={{initializedAsZero: 0}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="firstName"
            component={AdaptedInput}
            help="How can I help?"
            caption={
              <>
                You can use tooltips in many places, including inline text{' '}
                <StatefulTooltip content="Tooltips display short messages.">
                  <FakeLink>such as this</FakeLink>
                </StatefulTooltip>
                .
              </>
            }
            label="First name"
          />

          <Field
            name="initializedAsZero"
            component={AdaptedInput}
            label="Initialized as 0"
            parse={(value) => {
              const parsedValue = Number.parseFloat(value);
              if (!Number.isNaN(parsedValue)) {
                return parsedValue;
              }
              return null;
            }}
          />

          <Field
            name="ssn"
            component={AdaptedInput}
            caption="Example of disabled field"
            disabled
            label="Social security number"
          />

          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ))
  .add('MaskedInput', () => (
    <Form
      onSubmit={action('submit')}
      initialValues={{phoneNumber: 1234567890}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="phoneNumber"
            caption="This is MaskedInput from Base Web"
            render={(props) => {
              return (
                <FormControl {...adaptToFormControl(props)}>
                  <MaskedInput
                    {...adaptToInput(props)}
                    placeholder="Phone number"
                    mask="(999) 999-9999"
                  />
                </FormControl>
              );
            }}
          />

          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ))
  .add('Passing props into the input', () => (
    <Form
      validateOnBlur
      onSubmit={action('submit')}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="firstName"
            component={AdaptedInput}
            overrides={{AdaptedInput: {props: {autoComplete: 'off'}}}}
            label="First name"
            validate={minLength3}
          />
          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ))
  .add('With enhancers', () => (
    <Form
      validateOnBlur
      onSubmit={action('submit')}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="cost"
            component={AdaptedInput}
            caption="Price, please round this to nearest dollar"
            label="Cost of goods"
            size="compact"
            endEnhancer=".00"
            startEnhancer="$"
          />

          <Field
            name="url"
            component={AdaptedInput}
            caption="Enter without http://"
            label="Your favorite website"
            size="compact"
            startEnhancer="https://"
            placeholder="www.google.com"
            validate={minLength3}
          />

          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ))
  .add('Types of inputs', () => (
    <Form
      validateOnBlur
      initialValues={{birthday: '2017-06-01T08:30'}}
      onSubmit={action('submit')}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="cost"
            type="range"
            component={AdaptedInput}
            label="Cost of goods"
            size="compact"
            min={0}
            max={1000}
            step={1}
            caption="Using type=range"
          />

          <Field
            name="file"
            type="file"
            component={AdaptedInput}
            label="File upload"
            caption="Using type=file"
          />

          <Field
            name="birthday"
            type="datetime-local"
            component={AdaptedInput}
            label="Birthday"
            caption="Using type=datetime-local"
          />

          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ))
  .add('With validation of required', () => (
    <Form
      validateOnBlur
      onSubmit={action('submit')}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="firstName"
            component={AdaptedInput}
            label="First name"
            validate={required}
          />
          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ));
