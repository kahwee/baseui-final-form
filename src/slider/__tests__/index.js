// @noflow
import * as React from 'react';
import BaseuiProvider from '../../with-baseui';
import Slider from '../index';
import {Field, Form} from 'react-final-form';
import {fireEvent, render} from 'react-testing-library';

describe('slider', () => {
  const defaultProps = {
    name: 'age',
    label: 'Age',
    range: [18, 120],
    component: Slider,
  };

  it('should be submitted with default values when initialized', () => {
    const mockSubmit = jest.fn();
    const {container} = render(
      <BaseuiProvider>
        <Form onSubmit={mockSubmit} initialValues={{age: [19]}}>
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Field {...defaultProps} />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    const formNode = container.querySelector('form');
    fireEvent.submit(formNode);
    expect(mockSubmit).toHaveBeenLastCalledWith(
      {age: [19]},
      expect.anything(),
      expect.anything()
    );
  });
});
