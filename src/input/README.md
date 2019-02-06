# Input

This uses [baseui/input](https://baseui.netlify.com/components/input/).

To override the baseui Input component's internal Input, you can do this:

```js
const form = () => {
  return (
    <Form
      validateOnBlur
      onSubmit={action('submit')}
      render={({handleSubmit, pristine, invalid}) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="firstName"
            component={Input}
            // Add overrides
            overrides={{Input: {props: {autoComplete: 'off'}}}}
            label="First name"
            validate={minLength3}
          />
          <Button type="submit" disabled={pristine || invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  );
};
```

The `baseui/input` Component has a overrides prop that lets you modify the `InputContainer` and `Input`, in this case you might want to add `autoComplete` and set it to `"off"` to disable auto completion in browsers.
