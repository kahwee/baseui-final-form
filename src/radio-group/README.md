# Radio group

This uses Baseui's RadioGroup and Radio.

Check out [Baseui's RadioGroup examples](https://baseweb.design/components/radio/)

Example of options:

```json
[
  {"id": "apple", "label": "Apple", "emoji": "🍎"},
  {"id": "avocado", "label": "Avocado", "emoji": "🥑"},
  {"id": "banana", "label": "Banana", "emoji": "🍌"},
  {"id": "kiwi", "label": "Kiwi", "disabled": true, "emoji": "🥝"},
  {"id": "peach", "label": "Peach", "emoji": "🍑"},
  {"id": "pineapple", "label": "Pineapple", "emoji": "🍍"},
  {"id": "watermelon", "label": "Watermelon", "emoji": "🍉"}
]
```

To use a single field:

```js
import RadioGroup from 'baseui-final-form/radio-group';

const singleField = (
  <Field
    name="fruit"
    component={RadioGroup}
    caption="Please select a fruit"
    label="My favorite fruit"
    options={options}
  />
);
```

This is future-proof for future BaseWeb where RadioGroup no longer has `overrides`.

```js
import {
  Radio as BaseuiRadio,
  RadioGroup as BaseuiRadioGroup,
} from 'baseui/radio/index';
import {styled} from 'baseui';
import {FormControl} from 'baseui/form-control/index';
import {adaptToRadioGroup} from 'baseui-final-form/radio-group';
import {adaptToFormControl} from 'baseui-final-form/form-control';

const withOverriddenFields = (
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
);
```
