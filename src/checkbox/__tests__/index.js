// @noflow
import * as React from 'react';
import {Field, Form} from 'react-final-form';
import {fireEvent, render} from 'react-testing-library';
import BaseuiProvider from '../../with-baseui';
import Checkbox from '../index';

describe('checkbox', () => {
  const defaultProps = {
    name: 'isGoing',
    label: "Yes, I'll join",
    caption: 'RSVP if you are going to our event',
    component: Checkbox,
  };

  it('should be submitted correctly when toggled', () => {
    const mockSubmit = jest.fn();
    const {container} = render(
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
    const inputNode = container.querySelector('input');
    const labelNode = inputNode.parentNode;
    const formNode = container.querySelector('form');
    fireEvent.click(labelNode);
    expect(inputNode.checked).toBe(true);
    fireEvent.submit(formNode);
    expect(mockSubmit).toHaveBeenLastCalledWith(
      {isGoing: true},
      expect.anything(),
      expect.anything()
    );
    fireEvent.click(labelNode);
    expect(inputNode.checked).toBe(false);
    fireEvent.submit(formNode);
    expect(mockSubmit).toHaveBeenLastCalledWith(
      {isGoing: false},
      expect.anything(),
      expect.anything()
    );
  });

  [true, 'blahblah', 1, 2000].forEach(value => {
    it(`should be initialized as Boolean(true) when ${typeof value} ${String(
      value
    )}`, () => {
      const {container} = render(
        <BaseuiProvider>
          <Form onSubmit={() => {}} initialValues={{isGoing: value}}>
            {({handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <Field {...defaultProps} />
              </form>
            )}
          </Form>
        </BaseuiProvider>
      );
      const inputNode = container.querySelector('input');
      expect(inputNode.checked).toBe(true);
    });
  });

  [false, null, undefined, 0].forEach(value => {
    it(`should be initialized as Boolean(false) when ${typeof value} ${String(
      value
    )}`, () => {
      const {container} = render(
        <BaseuiProvider>
          <Form onSubmit={() => {}} initialValues={{isGoing: value}}>
            {({handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <Field {...defaultProps} />
              </form>
            )}
          </Form>
        </BaseuiProvider>
      );
      const inputNode = container.querySelector('input');
      expect(inputNode.checked).toBe(false);
    });
  });
});
