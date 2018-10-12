// @flow
import * as React from 'react';
import {render, fireEvent} from 'react-testing-library';
import {Form, Field} from 'react-final-form';
import Input from '../index';
import BaseuiProvider from '../../with-baseui';

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
              />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    const inputNode = container.querySelector('input');
    const formNode = container.querySelector('form');
    const event1 = {target: {name: 'firstName', value: 'changed1'}};
    const event2 = {target: {name: 'firstName', value: 'changed2'}};
    fireEvent.change(inputNode, event1);
    expect(inputNode.value).toBe('changed1');
    fireEvent.submit(formNode);
    expect(mockSubmit).toBeCalledWith(
      {firstName: 'changed1'},
      expect.anything()
    );
    fireEvent.change(inputNode, event2);
    expect(inputNode.value).toBe('changed2');
    fireEvent.submit(formNode);
    expect(mockSubmit).toBeCalledWith(
      {firstName: 'changed2'},
      expect.anything()
    );
  });
});
