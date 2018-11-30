// @noflow
import * as React from 'react';
import BaseuiProvider from '../../with-baseui';
import NativeSelect from '../index';
import options from './__fixtures__/fruit-options.json';
import {Field, Form} from 'react-final-form';
import {fireEvent, render} from 'react-testing-library';

describe('native-select', () => {
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
