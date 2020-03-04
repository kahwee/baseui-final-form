// @flow
import * as React from 'react';
import {
  Radio as BaseuiRadio,
  RadioGroup as BaseuiRadioGroup,
} from 'baseui/radio';
import {Block} from 'baseui/block/index';
import {Button} from 'baseui/button';
import {Field, Form} from 'react-final-form';
import {FormControl} from 'baseui/form-control';
import {action} from '@storybook/addon-actions';
import {adaptToFormControl} from '../form-control';
import {storiesOf} from '@storybook/react';
import RadioGroup, {adaptToRadioGroup} from './index';
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
            caption="Please select a fruit (except watermelon which trigger validation error)"
            label="My favorite fruit"
            options={options}
            validate={val => {
              if (val === 'watermelon') {
                return 'You cannot choose watermelon';
              }
            }}
            render={props => (
              <FormControl {...adaptToFormControl(props)}>
                <BaseuiRadioGroup {...adaptToRadioGroup(props)}>
                  {options.map(option => (
                    <BaseuiRadio
                      value={option.id}
                      key={option.id}
                      overrides={{
                        // eslint-disable-next-line react/display-name
                        Label: ({$value}) => (
                          <Block font="font400">
                            Custom label for value: {$value}
                          </Block>
                        ),
                        RadioMarkOuter: {
                          style: ({$theme}) => ({
                            backgroundColor: $theme.colors.positive,
                          }),
                        },
                      }}
                    >
                      {option.label}
                    </BaseuiRadio>
                  ))}
                </BaseuiRadioGroup>
              </FormControl>
            )}
          />

          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ));
