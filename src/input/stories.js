/* eslint-env node */
// @flow

import * as React from 'react';
import {Button} from 'baseui/button';
import Input from './index';
import {StatefulTooltip} from 'baseui/tooltip';
import {action} from '@storybook/addon-actions';
import {minLength} from '../validate';
import {storiesOf} from '@storybook/react';
import {styled} from 'baseui';
import {Field, Form} from 'react-final-form';

const minLength3 = minLength(3);

const FakeLink = styled('span', props => ({
  borderBottom: `1px dotted ${props.$theme.colors.primary500}`,
  color: props.$theme.colors.primary500,
}));

type AddressProps = {
  name: string,
  label: string,
};
export const Address = ({name, label}: AddressProps) => (
  <React.Fragment>
    <Field
      name={`${name}.street1`}
      component={Input}
      label={`${label} Street 1`}
    />
    <Field
      name={`${name}.street2`}
      component={Input}
      label={`${label} Street 2`}
    />
    <Field name={`${name}.city`} component={Input} label={`${label} city`} />
    <Field
      name={`${name}.zipCode`}
      component={Input}
      label={`${label} zip code`}
    />
  </React.Fragment>
);

storiesOf('Input', module)
  .add('Basic', () => (
    <Form
      validateOnBlur
      onSubmit={action('submit')}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="firstName"
            component={Input}
            caption={
              <React.Fragment>
                You can use tooltips in many places, including inline text{' '}
                <StatefulTooltip content="Tooltips display short messages.">
                  <FakeLink>such as this</FakeLink>
                </StatefulTooltip>
                .
              </React.Fragment>
            }
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
            name="firstName"
            component={Input}
            caption="Your given name"
            label="First name"
            inputProps={{
              size: 'compact',
              endEnhancer: '.00',
              placeholder: 'Input with an endEnhancer',
            }}
            validate={minLength3}
          />

          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ))
  .add('Address field group', () => (
    <Form
      validateOnBlur
      onSubmit={action('submit')}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Address name="billingAddress" label="Billing" />
          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ));
