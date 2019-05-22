// @noflow
import * as React from 'react';
import {Field, Form} from 'react-final-form';
import {cleanup, fireEvent, render} from 'react-testing-library';
import BaseuiProvider from '../../with-baseui';
import CheckboxGroup from '../index';
import options from '../../native-select/__tests__/__fixtures__/fruit-options.json';

describe('CheckboxGroup', () => {
  const defaultProps = {
    name: 'fruits',
    label: 'My favorite fruits',
    options,
    component: CheckboxGroup,
  };

  afterEach(cleanup);

  it('should fail on missing options', () => {
    /* eslint-disable no-console */
    // $FlowFixMe
    console.error = jest.fn();
    const t = () => {
      render(
        <BaseuiProvider>
          <Form onSubmit={() => {}}>
            {({handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <Field name="hello" component={CheckboxGroup} />
              </form>
            )}
          </Form>
        </BaseuiProvider>
      );
    };
    expect(t).toThrow(Error);
    expect(console.error).toHaveBeenCalled();
    /* eslint-enable no-console */
  });

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
    const cboxPeach = getByLabelText('Peach');
    const cboxApple = getByLabelText('Apple');
    expect(cboxPeach.checked).toBe(false);
    expect(cboxApple.checked).toBe(false);
    fireEvent.submit(formNode);
    expect(mockSubmit).toHaveBeenLastCalledWith(
      {},
      expect.anything(),
      expect.any(Function)
    );
    fireEvent.click(cboxPeach);
    expect(cboxPeach.checked).toBe(true);
    expect(cboxApple.checked).toBe(false);
    fireEvent.submit(formNode);
    expect(mockSubmit).toHaveBeenLastCalledWith(
      {fruits: ['peach']},
      expect.anything(),
      expect.any(Function)
    );
    fireEvent.click(cboxApple);
    expect(cboxPeach.checked).toBe(true);
    expect(cboxApple.checked).toBe(true);
    fireEvent.submit(formNode);
    expect(mockSubmit).toHaveBeenLastCalledWith(
      {fruits: ['peach', 'apple']},
      expect.anything(),
      expect.any(Function)
    );
    fireEvent.click(cboxPeach);
    expect(cboxPeach.checked).toBe(false);
    expect(cboxApple.checked).toBe(true);
    fireEvent.submit(formNode);
    expect(mockSubmit).toHaveBeenLastCalledWith(
      {fruits: ['apple']},
      expect.anything(),
      expect.any(Function)
    );
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
    const cboxPeach = getByLabelText('Peach');
    const cboxApple = getByLabelText('Apple');
    expect(cboxPeach.checked).toBe(true);
    expect(cboxApple.checked).toBe(false);
    fireEvent.click(cboxApple);
    expect(cboxPeach.checked).toBe(true);
    expect(cboxApple.checked).toBe(true);
    fireEvent.submit(formNode);
    expect(mockSubmit).toHaveBeenLastCalledWith(
      {fruits: ['peach', 'apple']},
      expect.anything(),
      expect.any(Function)
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
    expect(mockSubmit).toHaveBeenLastCalledWith(
      {fruits: ['kiwi']},
      expect.anything(),
      expect.any(Function)
    );
  });
});
