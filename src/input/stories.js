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
import withBaseui from '../with-baseui';
import {Field, Form} from 'react-final-form';

const minLength3 = minLength(3);

const FakeLink = styled('span', props => ({
  borderBottom: `1px dotted ${props.$theme.colors.primary500}`,
  color: props.$theme.colors.primary500,
}));

storiesOf('Input', module)
  .addDecorator(withBaseui)
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
  ));
