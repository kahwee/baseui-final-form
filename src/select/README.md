# Select

This uses Baseui's Select.

Check out [Baseui's Select examples](https://github.com/uber-web/baseui/blob/master/src/select/examples.js)

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
import {Select} from 'baseui-final-form';

const singleField = (
  <Field
    name="fruit"
    component={Select}
    caption="Please select a fruit"
    label="My fruits"
    options={options}
    help="Telling us your favorite fruit helps us understand you better"
  />
);
```

With overrides:

```js
import {Select} from 'baseui-final-form';
import {styled} from 'baseui';

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

const withOverriddenFields = (
  <Field
    name="fruits"
    component={Select}
    caption="Please select multiple fruits"
    label="My fruits"
    options={options}
    multi
    getOptionLabel={({option}) => <CustomOptionLabel option={option} />}
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
);
```
