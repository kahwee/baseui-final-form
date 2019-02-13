# Slider

This uses [Baseui's Slider](https://baseui.design/components/slider/).

To use a single field:

```js
import {Slider} from 'baseui-final-form';

const singleField = (
  <Field name="age" component={Slider} min={18} max={120} label="Age" />
);
```

If you want ranged thumbs, make sure you set the values as an array with length 2.
