// @noflow
import * as React from 'react';
import {Field, Form} from 'react-final-form';
import {cleanup, fireEvent, render} from '@testing-library/react';
import BaseuiProvider from '../../with-baseui';
import RadioGroup from '../index';
import options from '../../native-select/__tests__/__fixtures__/fruit-options.json';

describe('radiogroup', () => {
  const defaultProps = {
    name: 'fruit',
    label: 'My favorite fruit',
    options,
    component: RadioGroup,
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
                <Field name="hello" component={RadioGroup} />
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

  it('should be initialized as {}, then updated to peach, then be updated to apple', () => {
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
    expect(mockSubmit).toHaveBeenLastCalledWith(
      {},
      expect.anything(),
      expect.any(Function)
    );
    fireEvent.click(radioPeach);
    expect(radioPeach.checked).toBe(true);
    expect(radioApple.checked).toBe(false);
    fireEvent.submit(formNode);
    expect(mockSubmit).toHaveBeenLastCalledWith(
      {fruit: 'peach'},
      expect.anything(),
      expect.any(Function)
    );
    fireEvent.click(radioApple);
    expect(radioPeach.checked).toBe(false);
    expect(radioApple.checked).toBe(true);
    fireEvent.submit(formNode);
    expect(mockSubmit).toHaveBeenLastCalledWith(
      {fruit: 'apple'},
      expect.anything(),
      expect.any(Function)
    );
  });

  it('should be initialized as peach then be updated to apple', () => {
    const mockSubmit = jest.fn();
    const {container, getByLabelText} = render(
      <BaseuiProvider>
        <Form onSubmit={mockSubmit} initialValues={{fruit: 'peach'}}>
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
    expect(radioPeach.checked).toBe(false);
    expect(radioApple.checked).toBe(true);
    fireEvent.submit(formNode);
    expect(mockSubmit).toHaveBeenLastCalledWith(
      {fruit: 'apple'},
      expect.anything(),
      expect.any(Function)
    );
  });

  it('should be initialized as disabled kiwi and still be submitted with disabled value', () => {
    const mockSubmit = jest.fn();
    const {container, getByLabelText} = render(
      <BaseuiProvider>
        <Form onSubmit={mockSubmit} initialValues={{fruit: 'kiwi'}}>
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
      {fruit: 'kiwi'},
      expect.anything(),
      expect.any(Function)
    );
  });
});
