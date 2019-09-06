// @flow
import * as React from 'react';
import {AdaptedTextarea} from '../index';
import {Field, Form} from 'react-final-form';
import {fireEvent, render} from '@testing-library/react';
import BaseuiProvider from '../../with-baseui';

describe('textarea', () => {
  it('should record a submission in final-form when changed in baseui/textarea', () => {
    const mockSubmit = jest.fn();
    const DESCRIPTION = 'Hello how are you?';
    const {container} = render(
      <BaseuiProvider>
        <Form onSubmit={mockSubmit}>
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="description"
                component={AdaptedTextarea}
                caption="Description"
                label="Description"
              />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    const textareaNode = container.querySelector('textarea');
    const formNode = container.querySelector('form');
    const event = {target: {name: 'description', value: DESCRIPTION}};
    expect(textareaNode.value).toBe('');
    fireEvent.change(textareaNode, event);
    expect(textareaNode.value).toBe(DESCRIPTION);
    fireEvent.submit(formNode);
    expect(mockSubmit).toHaveBeenLastCalledWith(
      {description: DESCRIPTION},
      expect.anything(),
      expect.any(Function)
    );
  });
});
