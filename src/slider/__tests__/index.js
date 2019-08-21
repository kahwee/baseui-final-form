// @noflow
import * as React from 'react';
import {AdaptedSlider} from '../index';
import {Field, Form} from 'react-final-form';
import {fireEvent, render} from '@testing-library/react';
import BaseuiProvider from '../../with-baseui';

describe.skip('slider', () => {
  const defaultProps = {
    name: 'age',
    label: 'Age',
    min: 18,
    max: 120,
    component: AdaptedSlider,
  };

  it('should be submitted with default values of 2 when initialized', () => {
    const mockSubmit = jest.fn();
    const {container} = render(
      <BaseuiProvider>
        <Form onSubmit={mockSubmit} initialValues={{age: [19, 40]}}>
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
      {age: [19, 40]},
      expect.anything(),
      expect.anything()
    );
  });
});
