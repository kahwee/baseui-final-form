# baseui-final-form

Adapter between `react-final-form` and `baseui`.

[![npm](https://img.shields.io/npm/v/baseui-final-form.svg)](https://www.npmjs.com/package/baseui-final-form)
[![CircleCI](https://circleci.com/gh/kahwee/baseui-final-form.svg?style=svg)](https://circleci.com/gh/kahwee/baseui-final-form)
[![codecov](https://codecov.io/gh/kahwee/baseui-final-form/branch/master/graph/badge.svg)](https://codecov.io/gh/kahwee/baseui-final-form)

## Prerequisites

- `baseui` >= 6.4.0 (peer dependency)
- `react` and `react-dom` >= 16.7.0 (peer dependency)
- `node` >= 10.15.0 (for development)
- `yarn` >= 1.13.0 (for development)

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
import {RadioGroup} from 'baseui-final-form';
import {Field, Form} from 'react-final-form';

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
            component={RadioGroup}
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

| When you import from `baseui-final-form`           | How `baseui-final-form` imports from `baseui`?          |
| -------------------------------------------------- | ------------------------------------------------------- |
| `import {Input} from 'baseui-final-form';`         | `import {Input} from 'baseui/input';`                   |
| `import {Checkbox} from 'baseui-final-form';`      | `import {Checkbox} from 'baseui/checkbox';`             |
| `import {CheckboxGroup} from 'baseui-final-form';` | `import {Checkbox} from 'baseui/checkbox';`             |
| `import {NativeSelect} from 'baseui-final-form';`  |                                                         |
| `import {RadioGroup} from 'baseui-final-form';`    | `import {RadioGroup, StyledRadio} from 'baseui/radio';` |
| `import {Select} from 'baseui-final-form';`        | `import {Select} from 'baseui/select';`                 |
| `import {Slider} from 'baseui-final-form';`        | `import {Slider} from 'baseui/slider';`                 |
| `import {Textarea} from 'baseui-final-form';`      | `import {Textarea} from 'baseui/textarea';`             |
| `import {Toggle} from 'baseui-final-form';`        | `import {Checkbox} from 'baseui/checkbox';`             |

If you want to pass in additional props, such as `disabled`, to the underlying `baseui` component, can you do it this way:

```js
const form = () => {
  return (
    <Form
      onSubmit={}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="ssn"
            component={Input}
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

You can override the component wrapped by `baseui-final-form` using the `overrides` prop.

```javascript
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
            overrides={{
              RadioMark: {
                style: ({$theme}) => ({borderColor: $theme.colors.positive}),
              },
            }}
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
