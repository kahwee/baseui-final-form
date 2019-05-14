// @noflow
import * as React from 'react';
import {Field, Form} from 'react-final-form';
import {fireEvent, render} from 'react-testing-library';
import BaseuiProvider from '../../with-baseui';
import NativeSelect from '../index';
import options from './__fixtures__/fruit-options.json';

describe('native-select', () => {
  it('should fail on missing options', () => {
    /* eslint-disable no-console */
    // $FlowFixMe
    console.error = jest.fn();
    const t = () => {
      render(
        <BaseuiProvider>
          <Form onSubmit={() => {}}>
            {({handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <Field name="hello" component={NativeSelect} />
              </form>
            )}
          </Form>
        </BaseuiProvider>
      );
    };
    expect(t).toThrow(Error);
    expect(console.error).toHaveBeenCalled();
    /* eslint-enable no-console */
  });

  it('should record a submission in final-form when changed in native select', () => {
    const mockSubmit = jest.fn();
    const {container} = render(
      <BaseuiProvider>
        <Form onSubmit={mockSubmit} initialValues={{fruit: 'peach'}}>
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="fruit"
                component={NativeSelect}
                caption="Please select a fruit"
                label="My fruits"
                options={options}
              />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    const selectNode = container.querySelector('select');
    const formNode = container.querySelector('form');
    const event1 = {target: {name: 'fruit', value: 'pineapple'}};
    fireEvent.change(selectNode, event1);
    expect(selectNode.value).toBe('pineapple');
    fireEvent.submit(formNode);
    expect(mockSubmit).toHaveBeenLastCalledWith(
      {fruit: 'pineapple'},
      expect.anything(),
      expect.any(Function)
    );
  });
});
