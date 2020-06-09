// @flow
import * as React from 'react';
import {Select as BaseuiSelect} from 'baseui/select';
import {Button} from 'baseui/button';
import {Field, Form} from 'react-final-form';
import {FormControl} from 'baseui/form-control';
import {H6} from 'baseui/typography/index';
import {action} from '@storybook/addon-actions';
import {adaptToFormControl} from '../form-control';
import {required} from '../validate';
import {storiesOf} from '@storybook/react';
import {styled} from 'baseui';
import {withReadme} from 'storybook-readme';
import Select, {adaptToMultiSelect, adaptToSingleSelect} from './index';
import SelectReadme from './README.md';
import options from '../native-select/__tests__/__fixtures__/fruit-options.json';

const CustomValueWrapper = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
});

function CustomOptionLabel({
  option,
}: {
  // eslint-disable-next-line flowtype/no-weak-types
  option: any,
}) {
  return (
    <CustomValueWrapper>
      {option.id}
      {` (${option.emoji})`}
    </CustomValueWrapper>
  );
}

storiesOf('Select', module)
  .addDecorator(withReadme(SelectReadme))
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
            onChange={action('fruit changed')}
          />
          <Field
            name="anotherFruit"
            placeholder="Select something!"
            component={Select}
            label="Another fruits"
            options={options}
            onChange={action('anotherFruit changed')}
          />
          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ))
  .add('Single with adapt', () => (
    <Form
      onSubmit={action('submit')}
      initialValues={{fruit: 'pineapple'}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="fruit"
            render={(props) => (
              <FormControl {...adaptToFormControl(props)}>
                <BaseuiSelect {...adaptToSingleSelect(props)} />
              </FormControl>
            )}
            options={options}
            onChange={action('fruit changed')}
            validate={required}
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
            multi
          />
          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ))
  .add('Multiple with adapt', () => (
    <Form
      onSubmit={action('submit')}
      initialValues={{fruits: ['pineapple', 'apple']}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="fruits"
            validate={required}
            render={(props) => (
              <FormControl {...adaptToFormControl(props)}>
                <BaseuiSelect {...adaptToMultiSelect(props)} />
              </FormControl>
            )}
            options={options}
            onChange={action('fruit changed')}
          />
          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ))
  .add('Createable', () => (
    <Form
      onSubmit={action('submit')}
      initialValues={{
        fruits: ['pineapple', 'apple'],
        multiCreatableCustomValueKey: ['seven'],
      }}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="fruits"
            label="My fruits"
            render={(props) => (
              <FormControl {...adaptToFormControl(props)}>
                <BaseuiSelect creatable {...adaptToMultiSelect(props)} />
              </FormControl>
            )}
            options={options}
            onChange={action('fruit changed')}
          />
          <Field
            name="multiCreatable"
            label="Multi createable"
            validate={required}
            render={(props) => (
              <FormControl {...adaptToFormControl(props)}>
                <BaseuiSelect creatable {...adaptToMultiSelect(props)} />
              </FormControl>
            )}
            options={[]}
            onChange={action('Multi createable changed')}
          />
          <Field
            name="multiCreatableCustomValueKey"
            label="Multi createable with custom valueKey"
            validate={required}
            render={(props) => (
              <FormControl {...adaptToFormControl(props)}>
                <BaseuiSelect
                  creatable
                  {...adaptToMultiSelect(props, {
                    valueKey: 'hello',
                  })}
                />
              </FormControl>
            )}
            valueKey="hello"
            options={[
              {
                label: 'One',
                hello: 'one',
              },
              {
                label: 'Two',
                hello: 'two',
              },
              {
                label: 'Three',
                hello: 'three',
              },
            ]}
            onChange={action('Multi createable changed')}
          />
          <Field
            name="singleCreatable"
            label="Single creatable"
            validate={required}
            render={(props) => (
              <FormControl {...adaptToFormControl(props)}>
                <BaseuiSelect creatable {...adaptToSingleSelect(props)} />
              </FormControl>
            )}
            options={[]}
            onChange={action('Single creatable changed')}
          />
          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ))
  .add('With overrides and custom components', () => (
    <Form
      onSubmit={action('submit')}
      initialValues={{fruits: ['pineapple', 'apple']}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <H6>
            Notice that the dropdown list items now have a green hover effect:
          </H6>
          <Field
            name="fruits"
            render={(props) => (
              <FormControl {...adaptToFormControl(props)}>
                <BaseuiSelect
                  {...adaptToMultiSelect(props)}
                  getOptionLabel={({option}) => (
                    <CustomOptionLabel option={option} />
                  )}
                  overrides={{
                    DropdownListItem: {
                      style: ({$theme, $isHighlighted}) => ({
                        backgroundColor: $isHighlighted
                          ? $theme.colors.positive50
                          : 'transparent',
                        ':hover': {
                          backgroundColor: $theme.colors.positive50,
                        },
                      }),
                    },
                  }}
                />
              </FormControl>
            )}
            caption="Please select multiple fruits"
            label="My fruits"
            options={options}
          />
          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  ));
