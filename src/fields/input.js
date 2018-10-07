import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
export default function renderInput({input, meta, caption}) {
  console.log(input, meta, caption);
  return (
    <FormControl
      label="Input label"
      caption={caption}
      error="String type error"
    >
      <Input id="test" error {...input} />
    </FormControl>
  );
}
