# baseui-final-form

Adapter between `react-final-form` and `baseui`.

[![npm](https://img.shields.io/npm/v/baseui-final-form.svg)](https://www.npmjs.com/package/baseui-final-form)
[![CircleCI](https://circleci.com/gh/kahwee/baseui-final-form.svg?style=svg)](https://circleci.com/gh/kahwee/baseui-final-form)
[![codecov](https://codecov.io/gh/kahwee/baseui-final-form/branch/master/graph/badge.svg)](https://codecov.io/gh/kahwee/baseui-final-form)

## Prerequisites

- `baseui` >= 9.71.0 (peer dependency)
- `react` and `react-dom` >= 16.12.0 (peer dependency)
- `node` >= 10.16.0 (for development)
- `yarn` >= 1.17.3 (for development)

## Usage

Assuming you already have [react](https://reactjs.org/), [baseui](https://github.com/uber-web/baseui) and [react-final-form](https://github.com/final-form/react-final-form):

```sh
yarn add baseui-final-form
```

If you don't:

```sh
yarn add react react-dom baseui
yarn add react-final-form final-form
```

Sample component:

```javascript
import * as React from 'react';
import {Button} from 'baseui/button';
import {AdaptedRadioGroup} from 'baseui-final-form/radio-group';
import {adaptToInput} from 'baseui-final-form/input';
import {adaptToFormControl} from 'baseui-final-form/form-control';
import {Field, Form} from 'react-final-form';
import {MaskedInput} from 'baseui/input';
import {FormControl} from 'baseui/form-control';

const MyComponent = () => {
  return (
    <Form
      onSubmit={() => {
        // do something
      }}
      initialValues={{fruit: 'apple'}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="fruit"
            component={AdaptedRadioGroup}
            caption="Please select a fruit"
            label="My favorite fruit"
            options={[
              {id: 'apple', label: 'Apple'},
              {id: 'avocado', label: 'Avocado'},
              {id: 'kiwi', label: 'Kiwi', disabled: true},
              {id: 'peach', label: 'Peach'},
              {id: 'pineapple', label: 'Pineapple'},
            ]}
            overrides={{
              RadioMark: {
                style: ({$theme}) => ({borderColor: $theme.colors.positive}),
              },
            }}
          />

          <Field
            name="phoneNumber"
            caption="This is MaskedInput from Base Web"
            render={props => {
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
  );
};
export default MyComponent;
```

### How this works?

This library wraps the corresponding `baseui`'s components under the hood:

| When you import from `baseui-final-form`                      | How `baseui-final-form` imports from `baseui`?          |
| ------------------------------------------------------------- | ------------------------------------------------------- |
| `import {AdaptedInput} from 'baseui-final-form/input';`       | `import {Input} from 'baseui/input';`                   |
| `import {AdaptedCheckbox} from 'baseui-final-form/checkbox';` | `import {Checkbox} from 'baseui/checkbox';`             |
| `import {CheckboxGroup} from 'baseui-final-form';`            | `import {Checkbox} from 'baseui/checkbox';`             |
| `import {NativeSelect} from 'baseui-final-form';`             |                                                         |
| `import {RadioGroup} from 'baseui-final-form';`               | `import {RadioGroup, StyledRadio} from 'baseui/radio';` |
| `import {AdaptedSelect} from 'baseui-final-form/select';`     | `import {Select} from 'baseui/select';`                 |
| `import {AdaptedSlider} from 'baseui-final-form/slider';`     | `import {Slider} from 'baseui/slider';`                 |
| `import {AdaptedTextarea} from 'baseui-final-form/textarea';` | `import {Textarea} from 'baseui/textarea';`             |
| `import {AdaptedToggle} from 'baseui-final-form/toggle';`     | `import {Checkbox} from 'baseui/checkbox';`             |

If you want to pass in additional props, such as `disabled`, to the underlying `baseui` component, can you do it this way:

```js
import {AdaptedInput} from 'baseui-final-form/input';

const form = () => {
  return (
    <Form
      onSubmit={}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="ssn"
            component={AdaptedInput}
            disabled
          />
        </form>
      )}
    />
  );
};
```

This includes the `overrides` prop.

### Overriding components of baseui

If you want to override BaseWeb components, you can use the new `adapt*` functions supplied by `baseui-final-form`:

```javascript
import {adaptToFormControl} from 'baseui-final-form/form-control';
import {adaptToRadioGroup} from 'baseui-final-form/radio-group';
import {FormControl} from 'baseui/form-control';
import {
  Radio as BaseuiRadio,
  RadioGroup as BaseuiRadioGroup,
} from 'baseui/radio';

const MyComponent = () => {
  return (
    <Form
      onSubmit={() => {}}
      initialValues={{fruit: 'apple'}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="fruit"
            component={RadioGroup}
            label="My favorite fruit"
            options={[
              {id: 'apple', label: 'Apple'},
              {id: 'avocado', label: 'Avocado'},
              {id: 'kiwi', label: 'Kiwi', disabled: true},
              {id: 'peach', label: 'Peach'},
              {id: 'pineapple', label: 'Pineapple'},
            ]}
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
        </form>
      )}
    />
  );
};
```

## Development

Clone from git

```sh
git clone git@github.com:kahwee/baseui-final-form.git
cd baseui-final-form
```

Setup dev packages with `yarn`.

```sh
yarn
yarn storybook
```

Go to [http://localhost:6006](http://localhost:6006) to view storybook.

## Links

- [View in Storybook](https://baseui-final-form.netlify.com)

## License

MIT
