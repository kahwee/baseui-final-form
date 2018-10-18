// @flow
import * as React from 'react';
import BaseuiProvider from '../../with-baseui';
import CheckboxGroup from '../index';
import options from '../../native-select/__tests__/__fixtures__/fruit-options.json';
import {Field, Form} from 'react-final-form';
import {cleanup, fireEvent, render} from 'react-testing-library';

describe('CheckboxGroup', () => {
  const defaultProps = {
    name: 'fruits',
    label: 'My favorite fruits',
    options,
    component: CheckboxGroup,
  };

  afterEach(cleanup);

  it('should be initialized as {}, then do sanity click arounds', () => {
    const mockSubmit = jest.fn();
    const {container, getByLabelText} = render(
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
    const formNode = container.querySelector('form');
    const radioPeach = getByLabelText('Peach');
    const radioApple = getByLabelText('Apple');
    expect(radioPeach.checked).toBe(false);
    expect(radioApple.checked).toBe(false);
    fireEvent.submit(formNode);
    expect(mockSubmit).toBeCalledWith({}, expect.anything());
    fireEvent.click(radioPeach);
    expect(radioPeach.checked).toBe(true);
    expect(radioApple.checked).toBe(false);
    fireEvent.submit(formNode);
    expect(mockSubmit).toBeCalledWith({fruits: ['peach']}, expect.anything());
    fireEvent.click(radioApple);
    expect(radioPeach.checked).toBe(true);
    expect(radioApple.checked).toBe(true);
    fireEvent.submit(formNode);
    expect(mockSubmit).toBeCalledWith(
      {fruits: ['peach', 'apple']},
      expect.anything()
    );
    fireEvent.click(radioPeach);
    expect(radioPeach.checked).toBe(false);
    expect(radioApple.checked).toBe(true);
    fireEvent.submit(formNode);
    expect(mockSubmit).toBeCalledWith({fruits: ['apple']}, expect.anything());
  });

  it('should be initialized as peach then include apple', () => {
    const mockSubmit = jest.fn();
    const {container, getByLabelText} = render(
      <BaseuiProvider>
        <Form onSubmit={mockSubmit} initialValues={{fruits: ['peach']}}>
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Field {...defaultProps} />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    const formNode = container.querySelector('form');
    const radioPeach = getByLabelText('Peach');
    const radioApple = getByLabelText('Apple');
    expect(radioPeach.checked).toBe(true);
    expect(radioApple.checked).toBe(false);
    fireEvent.click(radioApple);
    expect(radioPeach.checked).toBe(true);
    expect(radioApple.checked).toBe(true);
    fireEvent.submit(formNode);
    expect(mockSubmit).toBeCalledWith(
      {fruits: ['peach', 'apple']},
      expect.anything()
    );
  });

  it('should be initialized as disabled kiwi and still be submitted with disabled value', () => {
    const mockSubmit = jest.fn();
    const {container, getByLabelText} = render(
      <BaseuiProvider>
        <Form onSubmit={mockSubmit} initialValues={{fruits: ['kiwi']}}>
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Field {...defaultProps} />
            </form>
          )}
        </Form>
      </BaseuiProvider>
    );
    const formNode = container.querySelector('form');
    // This is to check it is not supposed to select the first value or something
    expect(getByLabelText('Apple').checked).toBe(false);
    expect(getByLabelText('Kiwi').checked).toBe(true);
    fireEvent.submit(formNode);
    expect(mockSubmit).toBeCalledWith({fruits: ['kiwi']}, expect.anything());
  });
});
