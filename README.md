# baseui-final-form

Adapter between `react-final-form` and `baseui`.

[![npm](https://img.shields.io/npm/v/baseui-final-form.svg)](https://www.npmjs.com/package/baseui-final-form)
[![CircleCI](https://circleci.com/gh/kahwee/baseui-final-form.svg?style=svg)](https://circleci.com/gh/kahwee/baseui-final-form)
[![codecov](https://codecov.io/gh/kahwee/baseui-final-form/branch/master/graph/badge.svg)](https://codecov.io/gh/kahwee/baseui-final-form)

## Prerequisites

- `baseui` >= 5.5.0 (peer dependency)
- `react` and `react-dom` >= 16.6.0 (peer dependency)
- `node` >= 8.12.0 (for development)
- `yarn` >= 1.10.1 (for development)

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
import RadioGroup from './index';
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

## Development

Clone from git

```
git clone git@github.com:kahwee/baseui-final-form.git
cd baseui-final-form
```

Setup dev packages with `yarn`.

```javascript
yarn
yarn storybook
```

Go to [http://localhost:6006](http://localhost:6006) to view storybook.

## Links

- [View in Storybook](https://baseui-final-form.netlify.com)

## License

MIT
