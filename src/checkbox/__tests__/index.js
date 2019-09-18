// @noflow
import * as React from 'react';
import {AdaptedCheckbox} from '../index';
import {Field, Form} from 'react-final-form';
import {render} from '@testing-library/react';
import BaseuiProvider from '../../with-baseui';

describe('checkbox', () => {
  const defaultProps = {
    name: 'isGoing',
    label: "Yes, I'll join",
    caption: 'RSVP if you are going to our event',
    component: AdaptedCheckbox,
  };

  it('should render correctly with form-control', () => {
    const mockSubmit = jest.fn();
    const {getByText} = render(
      <BaseuiProvider>
        <Form onSubmit={mockSubmit}>
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Field {...defaultProps} />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    expect(getByText(defaultProps.caption)).toBeTruthy();
    expect(getByText(defaultProps.label)).toBeTruthy();
  });
});
