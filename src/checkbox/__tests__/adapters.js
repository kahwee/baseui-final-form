// @noflow
import * as React from 'react';
import {Checkbox} from 'baseui/checkbox';
import {Field, Form} from 'react-final-form';
import {adaptToCheckbox} from '../index';
import {fireEvent, render} from '@testing-library/react';
import BaseuiProvider from '../../with-baseui';

describe('checkbox/adapters', () => {
  const label = 'Testing';
  it('should be submitted correctly when toggled', () => {
    const mockSubmit = jest.fn();
    const {container, getByLabelText} = render(
      <BaseuiProvider>
        <Form onSubmit={mockSubmit}>
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="isGoing"
                label={label}
                render={props => {
                  return <Checkbox {...adaptToCheckbox(props)} />;
                }}
              />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    const inputNode = getByLabelText(label);
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
      const {getByLabelText} = render(
        <BaseuiProvider>
          <Form onSubmit={() => {}} initialValues={{isGoing: value}}>
            {({handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="isGoing"
                  label={label}
                  render={props => {
                    return <Checkbox {...adaptToCheckbox(props)} />;
                  }}
                />
              </form>
            )}
          </Form>
        </BaseuiProvider>
      );
      const inputNode = getByLabelText(label);
      expect(inputNode.checked).toBe(true);
    });
  });

  [false, null, undefined, 0].forEach(value => {
    it(`should be initialized as Boolean(false) when ${typeof value} ${String(
      value
    )}`, () => {
      const {getByLabelText} = render(
        <BaseuiProvider>
          <Form onSubmit={() => {}} initialValues={{isGoing: value}}>
            {({handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="isGoing"
                  label={label}
                  render={props => {
                    return <Checkbox {...adaptToCheckbox(props)} />;
                  }}
                />
              </form>
            )}
          </Form>
        </BaseuiProvider>
      );
      const inputNode = getByLabelText(label);
      expect(inputNode.checked).toBe(false);
    });
  });
});
