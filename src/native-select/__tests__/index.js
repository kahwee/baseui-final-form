// @flow
import * as React from 'react';
import {render, fireEvent} from 'react-testing-library';
import {Form, Field} from 'react-final-form';
import NativeSelect from '../index';
import BaseuiProvider from '../../with-baseui';

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
                options={[
                  {id: 'pineapple', label: 'Pineapple'},
                  {id: 'peach', label: 'Peach'},
                  {id: 'apple', label: 'Apple', disabled: true},
                ]}
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
    expect(mockSubmit).toBeCalledWith({fruit: 'pineapple'}, expect.anything());
  });
});
