// @noflow
import * as React from 'react';
import {Field, Form} from 'react-final-form';
import {fireEvent, render} from '@testing-library/react';
import BaseuiProvider from '../../with-baseui';
import Input from '../index';

describe('input', () => {
  it('should record a submission in final-form when changed in baseui/input', () => {
    const mockSubmit = jest.fn();
    const {container} = render(
      <BaseuiProvider>
        <Form onSubmit={mockSubmit}>
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="firstName"
                component={Input}
                caption="First name"
                label="First name"
                help="Basic help"
              />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    const inputNode = container.querySelector('input');
    const formNode = container.querySelector('form');
    const event1 = {target: {name: 'firstName', value: 'changed1'}};
    fireEvent.change(inputNode, event1);
    expect(inputNode.value).toBe('changed1');
    fireEvent.submit(formNode);
    expect(mockSubmit).toHaveBeenLastCalledWith(
      {firstName: 'changed1'},
      expect.anything(),
      expect.any(Function)
    );
  });
});
