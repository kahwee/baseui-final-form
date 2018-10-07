import * as React from 'react';
import {Form, Field} from 'react-final-form';
import {storiesOf} from '@storybook/react';
import {withInfo} from '@storybook/addon-info';
import {Provider as StyletronProvider} from 'styletron-react';
import {Client as Styletron} from 'styletron-engine-atomic';
const engine = new Styletron();
import {LightTheme, ThemeProvider, styled} from 'baseui';
import {FormControl} from 'baseui/form-control';
import {StatefulInput} from 'baseui/input';
import Input from './input';

storiesOf('Badge', module)
  .addDecorator(withInfo)
  .addDecorator(story => (
    <StyletronProvider value={engine}>
      <ThemeProvider theme={LightTheme}>{story()}</ThemeProvider>
    </StyletronProvider>
  ))
  .add(
    'Basic',
    () => (
      <FormControl
        label="Input label"
        caption="Input caption"
        error="String type error"
      >
        <StatefulInput id="test" error />
      </FormControl>
    ),
    {
      info: `
      description or documentation about my component, supports markdown
    
    
    `,
    },
  )
  .add('Colorful', () => (
    <Form
      onSubmit={() => {}}
      validate={() => {}}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <h2>Simple Default Input</h2>
          <div>
            <label>First Name</label>
            <Field
              name="firstName"
              component="input"
              placeholder="First Name"
            />
          </div>

          <h2>An Arbitrary Reusable Input Component</h2>
          <div>
            <label>Interests</label>
            <Field name="interests" component={Input} caption="Hello" />
          </div>

          <h2>Render Function</h2>
          <Field
            name="bio"
            render={({input, meta}) => (
              <div>
                <label>Bio</label>
                <textarea {...input} />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          />

          <h2>Render Function as Children</h2>
          <Field name="phone">
            {({input, meta}) => (
              <div>
                <label>Phone</label>
                <input type="text" {...input} placeholder="Phone" />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>

          <button type="submit" disabled={pristine || invalid}>
            Submit
          </button>
        </form>
      )}
    />
  ));
